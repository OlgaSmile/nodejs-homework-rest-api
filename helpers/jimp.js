const jimp =require("jimp");

async function changeImg(path) {
  // Read the image.
  const image = await jimp.read(path);

  // Resize the image to width 150 and auto height.
  await image.resize(250, 250);

  // Save and overwrite the image
  await image.writeAsync(path);
}

module.exports = changeImg;