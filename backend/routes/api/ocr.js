const express = require('express');
const asyncHandler = require('express-async-handler');
const ocrSpace = require('ocr-space-api-wrapper');
const fetch = require('node-fetch');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// ocr.open api call for local file via ocr-space-aqi-wrapper
// includes options object with api key and path to local file.
router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
	// console.log(data.get('image'), "DATA IN BACK !!!!!!!!!!!!!!!!!!")
  console.log(req.body, 'req body!!!!!!!!!!!!!!!!!!!')
  try {
    const response = await ocrSpace(
      `${image}`,
      {apiKey: '153e53ecc188957', isTable: true, file: 'file'}
      )
    // const text = response["ParsedResults"]

		// const textOverlay = text[0]["TextOverlay"]

		// const lines = textOverlay["Lines"].map(line => line["LineText"])

		// const lineArray = text[0]["ParsedText"].split("\r\n")

//     const ingredients = await fetch("https://zestful.p.rapidapi.com/parseIngredients", {
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/json",
// 		"x-rapidapi-key": "cdeced046dmsh16961699e767a15p1fc7e4jsne0fec1aafb7a",
// 		"x-rapidapi-host": "zestful.p.rapidapi.com"
// 	},
// 	"body": {
// 		"ingredients": lineArray
// 	}
// })

    // return res.json(ingredients)

		return res.json(response)
  } catch(error) {
    console.log(error);
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
