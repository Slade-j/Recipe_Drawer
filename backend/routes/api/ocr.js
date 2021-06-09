// backend/routes/api/ocr.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const ocrSpace = require('ocr-space-api-wrapper');
const microsofComputerVision = require("microsoft-computer-vision")
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
// router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {

//   const { mimetype } = await req.file;

//   try {
//     // placing image in s3 bucket, getting url in return
//     const url = await singlePublicFileUpload(req.file);
//     // must set filetype because of default content-type comming back from aws

//     const response = await ocrSpace(
//       `${url}`, {apiKey: key, url: 'url', filetype: mimetype }
//     )

//     return res.json({ response, url });
//    } catch (error) {
//     console.error(error)
//    }

// }))




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

router.post('/', singleMulterUpload('image'), asyncHandler(async (req, res) => {

  const { mimetype } = await req.file;

  try {
    // placing image in s3 bucket, getting url in return
    const url = await singlePublicFileUpload(req.file);
    // must set filetype because of default content-type comming back from aws

    const response = await microsofComputerVision.orcImage({
      "Ocp-Apim-Subscription-Key": ,
      "request-origin":"westus",
      "content-type": "application/json",
      "url": `${url}`,
      "language": "en",
      "detect-orientation": true
  })

    let returnLines = response.regions.map(object => object.lines)
    let lineArray = []
    returnLines.forEach(line => {
      let eachLine = []
      line.forEach(object => {
        object.words.forEach(textObj => {
          eachLine = [...eachLine, textObj.text]
        })
        lineArray.push(eachLine)
      })
    })

    console.log(lineArray)
    // return res.json({ response, url });
   } catch (error) {
    console.error(error)
   }

}))

// microsofComputerVision.orcImage({
//     "Ocp-Apim-Subscription-Key": "<your-subscription-key>",
//     "request-origin":"<Choose-one-from-Supported-Regions>",
//     "content-type": "application/json",
//     "url": "http://cdn.quotesgram.com/img/81/49/660235022-Random-Funny-Quotes-.jpg",
//     "language": "en",
//     "detect-orientation": true
// }).then((result)=>{

//   console.log(JSON.stringify(result))        // {
                              //     "language": "en",
                              //     "textAngle": 0,
                              //     "orientation": "Up",
                              //     "regions": [
                              //         {
                              //             "boundingBox": "7,55,605,387",
                              //             "lines": [
                              //                 {
                              //                     "boundingBox": "7,55,603,65",
                              //                     "words": [
                              //                         {
                              //                             "boundingBox": "7,59,291,61",
                              //                             "text": "HOME:"
                              //                         },
                              //                         {
                              //                             "boundingBox": "326,55,284,65",
                              //                             "text": "Where"
                              //                         }
                              //                     ]
                              //                 },
                              //                 ...
                              //             ]
                              //         }
                              //     ]
                              // }
// }).catch((err)=>{
//   throw err
// })

module.exports = router;
