<p align="center"><a href="https://profile-forme.com/" target="_blank"><img src="https://res.cloudinary.com/ecommerce2021/image/upload/v1659065987/avatar/logo_begsn1.png" width="300"></a></p>

<p align="center">
<a href="https://www.linkedin.com/in/tai-nguyen-tien-787545213/"><img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="Linkedin"></a>
<a href="https://profile-forme.surge.sh"><img src="https://img.icons8.com/color/48/000000/internet--v1.png" alt="Profile"></a>
<a href="tel:0798805741"><img src="https://img.icons8.com/color/48/000000/apple-phone.png" alt="Phone"></a>
<a href = "mailto:nguyentientai10@gmail.com"><img src="https://img.icons8.com/fluency/48/000000/send-mass-email.png" alt="License"></a>
</p>

# Project: Passkey Auth React Node

[![Passkey demo](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://res.cloudinary.com/taidev/video/upload/v1723006811/passkey_hnqp7y.mp4)

Click the image above to watch the video.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed (version >= 20.0.0 or later)
- Hanko Passkey API key and tenant ID from [Hanko Cloud](https://cloud.hanko.io/)

> **Note:**
> You'll need to create a Passkey Project on Hanko Cloud with the App URL `http://localhost:5173`. See our docs to learn how to setup a [passkey project](https://docs.hanko.io/passkey-api/setup-passkey-project).

## Getting started

1. Clone the repository

```bash
git clone <repo>
```

2. Set up environment variables

Create a `.env` file in the `express-backend` directory and add the following environment variables:

```sh
PASSKEYS_API_SECRET_KEY=your-hanko-passkey-api-key
PASSKEYS_TENANT_ID=your-hanko-passkey-tenant-id
```

Replace `your-hanko-passkey-api-key` and `your-hanko-passkey-tenant-id` with your actual Hanko Passkey API key and tenant ID.

## Frontend

1. Navigate to the frontend directory:

```bash
cd react-frontend
```

1. Install the dependencies using your preferred package manager (e.g., `npm`, `pnpm`, `yarn`, or `bun`). For this project, we've used `npm`:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

## Backend

1. Navigate to the backend directory:

```bash
cd express-backend
```

2. Install the backend dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run dev
```

## Usage

1. Start the application:
   
   * Ensure that both the frontend and backend servers are running.

   * Access the application by navigating to `http://localhost:5173` in your web browser.
  
2. Log in with a pre-configured user: Navigate to login page, login with one of the pre-configured users.

```json
    {
        "id": "b3fbbdbd-6bb5-4558-9055-3b54a9469629",
        "email": "nguyentientai9@gmail.com",
        "password": "******",
    },
    {
        "id": "22c81b3d-1e7d-4a72-a6b0-ad946e0c0965",
        "email": "ronadol@example.com",
        "password": "very_secure_password",
    },
    {
        "id": "55c81b3d-1e7d-4a72-a6b0-ad946e0c0965",
        "email": "messi@g.com",
        "password": "123",
    }
```

3. Register a passkey:
   
   * After logging in, register a passkey for the logged-in user.

4. Log out:
   * After the passkey registration is successful, log out of the application.

5. Login with with a passkey

   * On the login page, choose sign in with a passkey option to authenticate using a passkey.


## Team Word: Liên hệ công việc https://profile-forme.com

## 1. Nguyen Tien Tai

## Tài Khoản Donate li Cf để có động lực code cho anh em tham khảo 😄.

![giphy](https://3.bp.blogspot.com/-SzGvXn2sTmw/V6k-90GH3ZI/AAAAAAAAIsk/Q678Pil-0kITLPa3fD--JkNdnJVKi_BygCLcB/s1600/cf10-fbc08%2B%25281%2529.gif)

## Mk: NGUYEN TIEN TAI

## STK: 1651002972052

## Chi Nhánh: NGAN HANG TMCP AN BINH (ABBANK).

## SUPPORT CONTACT: [https://profile-forme.com](https://profile-forme.com)

## Thank You <3.


