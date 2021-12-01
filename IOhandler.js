/*
 * Project: Mock Final Exam question 2
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 24, 2021
 * Author: Simon Jung
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise ((resolve, reject) => {
    if (fs.existsSync(pathOut)) {
      reject('Directory exists')
    } else {
      fs.createReadStream(pathIn).pipe(unzipper.Extract({ path: pathOut }))
      resolve("Extraction operation complete")
    }
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  return new Promise ((resolve, reject) => {
    if (fs.existsSync(dir) == false) {
      reject('Directory does not exist')
    } else {
      pngArray = [];
      dirtyAssArray = fs.readdirSync(dir);
      for (i=0; i < dirtyAssArray.length; i++) {
        if (path.extname(dirtyAssArray[i]) == '.png') {
          pngArray.push(dirtyAssArray[i])
        }
      }
      resolve(pngArray)
    }
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  readDir(pathIn)
  .then(content => {
    console.log(content)
    content.forEach((item) => {
      console.log(item)
      fs.createReadStream(pathIn + "\\" + item)
      
      .pipe(
        new PNG({
          
        }))
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
            let avg = (this.data[idx] + this.data[idx+1] + this.data[idx+2]) / 3
     
            // invert color
            this.data[idx] = avg;
            this.data[idx + 1] = avg;
            this.data[idx + 2] = avg;
     
            // and reduce opacity
          }
        }
        this.pack().pipe(fs.createWriteStream(pathOut + "\\" + item));
      });
    })
    })
  .catch("Doesn't work")
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
