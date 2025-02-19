const fetch = require('node-fetch'); // Ensure fetch is available

// Function to upload an image and return the image URL
const uploadImage = async (base64Image) => {
  try {
    const currentTime = Date.now();
    const prefixFilename = `${currentTime}`;

    console.log(process.env.IMAGE_STORAGE_UPLOAD_URL);
    console.log(process.env.PROJECT_NAME);
    console.log(base64Image);
    const response = await fetch(process.env.IMAGE_STORAGE_UPLOAD_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64Image: base64Image,
        prefixfilename: prefixFilename,
        projectName: process.env.PROJECT_NAME,
      }),
    });

    if (response) {
      console.log(response);
    }
    const arrayoftype = ["png", "webp", "jpg", "jpeg", "gif", "bmp", "tiff", "heif", "ico","avif"];
    
    const imageType = arrayoftype.find((type) => base64Image.includes(type) && type !== "svg+xml");
    return `${process.env.IMAGE_STORAGE_GET_IMAGE_URL}/${prefixFilename}.${imageType}`;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};


const checkImageType = async (base64Image) => {
  const arrayoftype = ["png", "webp", "jpg", "jpeg", "gif", "bmp", "tiff", "heif", "ico","avif"];
  const imageType = arrayoftype.find((type) => base64Image.includes(type) && type !== "svg+xml");
  return imageType ? true : false;
};


const deleteImage = async (imageUrl) => {
  const response = await fetch(process.env.IMAGE_STORAGE_DELETE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageUrl: imageUrl,
      projectName: process.env.PROJECT_NAME,
    }),
  });
  return response;
};


module.exports = { uploadImage, checkImageType, deleteImage };









