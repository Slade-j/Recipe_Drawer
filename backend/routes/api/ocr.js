const express = require('express');
const asyncHandler = require('express-async-handler');
const ocrSpace = require('ocr-space-api-wrapper');
const fetch = require('node-fetch');

const router = express.Router();

// ocr.open api call for local file via ocr-space-aqi-wrapper
// includes options object with api key and path to local file.
router.get('/', asyncHandler(async (req, res) => {
	console.log("HIT !!!!!!!!!!!!!!!!!!!!!!!!!")
  try {
    const response = await ocrSpace('/home/jason/appAcademy/capstone/recipe_drawer/backend/assets/gingerbread.jpg', {apiKey: '153e53ecc188957', isTable: true })
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
