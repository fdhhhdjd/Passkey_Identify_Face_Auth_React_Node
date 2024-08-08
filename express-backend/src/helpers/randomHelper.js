class RandomHelper {
  static generateAvatar(fullname) {
    const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&size=350&color=fff&length=3&name=${encodeURIComponent(
      fullname
    )}`;
    return avatarUrl;
  }
}
module.exports = RandomHelper;
