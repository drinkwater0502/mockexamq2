/*
 * Project: Mock Final exam question 2
 * File Name: main.js
 * Description: Runs promises from IOhandler.js
 *
 * Created Date: Nov 24th, 2021
 * Author: Simon Jung
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
.then(action => console.log(action))
.catch(err => console.log(err))
IOhandler.readDir(pathUnzipped)
.then(action => console.log(action))
.catch(err => console.log(err))

IOhandler.grayScale(pathUnzipped, pathProcessed)
