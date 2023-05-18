const fs = require("fs");

// Gets the extension of the file
// sets the new name
// and rename the file and its path
const newPath = (file) => {
  const ext = file.mimetype.split("/")[1];
  const newName = file.filename + "." + ext;
  fs.rename(
    "./public/uploads/" + file.filename,
    "./public/uploads/" + newName,
    (err) => {
      if (err) throw err;
    }
  );
  return file.path + "." + ext;
};

// Deletes old article's image
const deleteImg = (result) => {
  fs.unlink(result[0].image_art, (error) => {
    if (error) throw error;
  });
};

module.exports = { newPath, deleteImg };