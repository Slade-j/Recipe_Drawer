// backend/routes/api/ocr.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const ocrSpace = require('ocr-space-api-wrapper');
const fetch = require('node-fetch');
const {
  s3,
  multiplePublicFileUpload,
  multipleMulterUpload,
  singleMulterUpload,
  singlePublicFileUpload } = require('../../awsS3.js');

const router = express.Router();
const key = process.env.API_KEY

// ocr.open api call for local file via ocr-space-aqi-wrapper
// includes options object with api key and path to local file.
// aws included here in-order to get a working URL to pass to ocr.open wrapper
// if another ocr api is used in futre iterations it will be ideal to seperate
// aws from this post
router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {
  console.log("HITHITHIT")
  const { mimetype } = await req.file;
  try {
    // placing image in s3 bucket, getting url in return
    const url = await singlePublicFileUpload(req.file);
    // must set filetype because of default content-type comming back from aws
    const response = await ocrSpace(
      `${url}`, {apiKey: key, url: 'url', filetype: mimetype }
    )
    return res.json({ response, url });
   } catch (error) {
    console.error(error)
   }

}))

module.exports = router;


// const ingredients = await fetch("https://zestful.p.rapidapi.com/parseIngredients", {
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/json",
// 		"x-rapidapi-key": "cdeced046dmsh16961699e767a15p1fc7e4jsne0fec1aafb7a",
// 		"x-rapidapi-host": "zestful.p.rapidapi.com"
// 	},
// 	"body": {
// 		"ingredients": text[0]["ParsedText"]
// 	}
// })
