const getBaseUrl = () => {
  return `${process.env.PROTOCOL}://${process.env.HOST}`;
};

const getFullImageUrl = (imagePath) => {
  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath;
  }
  return getBaseUrl() + imagePath;
};

module.exports = {
  getBaseUrl,
  getFullImageUrl,
};
