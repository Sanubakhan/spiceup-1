const Imagekit = require("imagekit");

const imagekit = new Imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});
async function uploadFile(file, fileName) {
  const result = await imagekit.upload({
    file: file,          // required
    fileName: fileName,  // required
  });

  return result; // contains url, fileId, etc.
}

module.exports = {
  uploadFile,
};
