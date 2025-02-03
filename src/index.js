/*  Works
const vision = require("@google-cloud/vision");
const path = require("path");

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, "../service-account-key.json"), 
});

async function detectMoodFromSelfie(imagePath) {
  try {
    const [result] = await client.faceDetection(imagePath);
    const faces = result.faceAnnotations;

    if (!faces || faces.length === 0) {
      console.log("No faces detected in the image.");
      return "neutral"; 
    }

//    console.log(faces);
    const face = faces[0];
    const moods = {
      joy: face.joyLikelihood,
      sorrow: face.sorrowLikelihood,
      anger: face.angerLikelihood,
      surprise: face.surpriseLikelihood,
    };

    const likelihoodValues = {
      VERY_UNLIKELY: 1,
      UNLIKELY: 2,
      POSSIBLE: 3,
      LIKELY: 4,
      VERY_LIKELY: 5,
    };

    let mostProminentMood = "neutral";
    let highestLikelihood = 0;

    for (const [mood, likelihood] of Object.entries(moods)) {
      const value = likelihoodValues[likelihood] || 0;
      if (value > highestLikelihood) {
        highestLikelihood = value;
        mostProminentMood = mood;
      }
    }

    console.log(`Detected mood: ${mostProminentMood}`);
    return mostProminentMood;
  } catch (err) {
    console.error("Error analyzing image:", err);
    throw err;
  }
}

module.exports = detectMoodFromSelfie;*/ 

const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs");

const credentialsPath = path.join(__dirname, "../service-account-key.json");

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
  const decodedKey = Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, "base64").toString("utf8");
  fs.writeFileSync(credentialsPath, decodedKey);
}

const client = new vision.ImageAnnotatorClient({
  keyFilename: credentialsPath,
});

async function detectMoodFromSelfie(imagePath) {
  try {
    const [result] = await client.faceDetection(imagePath);
    const faces = result.faceAnnotations;

    if (!faces || faces.length === 0) {
      console.log("No faces detected in the image.");
      return "neutral"; 
    }

    const face = faces[0];
    const moods = {
      joy: face.joyLikelihood,
      sorrow: face.sorrowLikelihood,
      anger: face.angerLikelihood,
      surprise: face.surpriseLikelihood,
    };

    const likelihoodValues = {
      VERY_UNLIKELY: 1,
      UNLIKELY: 2,
      POSSIBLE: 3,
      LIKELY: 4,
      VERY_LIKELY: 5,
    };

    let mostProminentMood = "neutral";
    let highestLikelihood = 0;

    for (const [mood, likelihood] of Object.entries(moods)) {
      const value = likelihoodValues[likelihood] || 0;
      if (value > highestLikelihood) {
        highestLikelihood = value;
        mostProminentMood = mood;
      }
    }

    console.log(`Detected mood: ${mostProminentMood}`);
    return mostProminentMood;
  } catch (err) {
    console.error("Error analyzing image:", err);
    throw err;
  }
}

module.exports = detectMoodFromSelfie;