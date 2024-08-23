import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/common/button";
import * as faceapi from "@vladmandic/face-api";
import logo from "@/assets/logo.png";

const MODEL_PATH = "../src/data/models";
const VIDEO_DIMENSIONS = { width: 720, height: 560 };
const LOGIN_URL = `${process.env.URL_API}/api/identify-face/login`;

const IdentifyFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [email] = useState("nguyentientaitai9@gmail.com");
  const [isLoading, setIsLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [start, setStart] = useState(false);
  const [isFaceCaptured, setIsFaceCaptured] = useState(false);
  const navigate = useNavigate();

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        runFaceDetection();
      })
      .catch((err) => console.error("Error accessing the camera", err));
  };

  const stopVideo = () => {
    setStart(false);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    clearInterval(intervalRef.current);
  };

  const runFaceDetection = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    faceapi.matchDimensions(canvasRef.current, VIDEO_DIMENSIONS);

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();

      const context = canvasRef?.current?.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, VIDEO_DIMENSIONS.width, VIDEO_DIMENSIONS.height);

      const resizedDetections = faceapi.resizeResults(
        detections,
        VIDEO_DIMENSIONS
      );

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      handleFaceProximity(detections);
    }, 100);
  };

  const handleFaceProximity = (detections) => {
    if (!detections.length)
      return setSuggestion("No face detected. Adjust your position.");

    setIsLoading(false);
    const { box } = detections[0].detection;
    const faceProximity =
      (box.width * box.height) /
      (VIDEO_DIMENSIONS.width * VIDEO_DIMENSIONS.height);

    if (faceProximity < 0.05) {
      setSuggestion("Your face is too far. Please move closer.");
    } else {
      setSuggestion("Face detected. Please keep still.");
      clearInterval(intervalRef.current);
      if (!isFaceCaptured) {
        setIsFaceCaptured(true);
        captureFaceForLogin();
      }
    }
  };

  const captureFaceForLogin = async () => {
    try {
      const detections = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        await loginUser(JSON.stringify(Array.from(detections.descriptor)));
      } else {
        setSuggestion("No face detected. Please try again.");
        startVideo(); // Bắt đầu lại video nếu không phát hiện khuôn mặt
      }
    } catch (error) {
      console.error("Error capturing face", error);
      setSuggestion("Error capturing face. Please try again.");
      startVideo(); // Bắt đầu lại video nếu có lỗi khi lấy khuôn mặt
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (faceData) => {
    try {
      const response = await axios.post(LOGIN_URL, { email, faceData });

      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("userId", response.data.metadata.id);
        localStorage.setItem("userEmail", response.data.metadata.email);
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Login failed. Please try again.");
    } finally {
      stopVideo();
      resetStates();
    }
  };

  const resetStates = () => {
    setStart(false);
    setIsLoading(true);
    setSuggestion("");
    setIsFaceCaptured(false);
  };

  const signInWithFaceRecognition = () => {
    setStart(true);
    startVideo();
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_PATH);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_PATH);
      } catch (error) {
        console.error("Error loading models", error);
      }
    };

    loadModels();

    return () => {
      clearInterval(intervalRef.current); // Dọn dẹp interval khi component unmount
    };
  }, []);

  return (
    <React.Fragment>
      {start && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative w-[720px] h-[560px] bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-lg shadow-2xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              width={VIDEO_DIMENSIONS.width}
              height={VIDEO_DIMENSIONS.height}
              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
            <canvas
              ref={canvasRef}
              width={VIDEO_DIMENSIONS.width}
              height={VIDEO_DIMENSIONS.height}
              className="absolute top-0 left-0 w-full h-full"
            />
            <img
              src={logo}
              alt="Logo"
              className="absolute bottom-4 right-4 w-[60px] h-[60px] opacity-80 transition-opacity duration-500 hover:opacity-100"
            />

            {!isLoading && (
              <button
                onClick={stopVideo}
                className="absolute top-2 right-2 text-black text-2xl bg-transparent hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center"
              >
                &times;
              </button>
            )}

            <p
              className={`absolute ${
                isLoading ? "bottom-4" : "top-4"
              } left-4 text-white text-lg bg-gradient-to-r from-gray-900 to-black bg-opacity-60 px-4 py-2 rounded-lg shadow-lg animate-fade-in`}
            >
              {suggestion || "Waiting for face detection..."}
            </p>

            {isLoading && (
              <div className="absolute bottom-4 right-4 flex items-center justify-center">
                <div className="loader border-t-transparent border-white border-4 border-solid w-10 h-10 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <Button
        className="mt-4 w-full bg-gray-500 text-white hover:bg-gray-600"
        onClick={signInWithFaceRecognition}
      >
        Sign in with Face Recognition
      </Button>
    </React.Fragment>
  );
};

export default IdentifyFace;
