// Import the Google Cloud Vision client library
/*const vision = require("@google-cloud/vision");
const path = require("path");
// Create a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "service-account-key.json", 
});

// Function to analyze an image and detect mood
async function detectMoodFromSelfie(imagePath) {
  try {
    // Perform face detection
    const [result] = await client.faceDetection(imagePath);
    const faces = result.faceAnnotations;

    if (!faces.length) {
      console.log("No faces detected in the image.");
      return "No faces detected";
    }

    // Get mood likelihoods from the first detected face
    const face = faces[0];
    const moods = {
      joy: face.joyLikelihood,
      sorrow: face.sorrowLikelihood,
      anger: face.angerLikelihood,
      surprise: face.surpriseLikelihood,
    };

    // Map Google's likelihood levels to numeric values for better comparison
    const likelihoodValues = {
      VERY_UNLIKELY: 1,
      UNLIKELY: 2,
      POSSIBLE: 3,
      LIKELY: 4,
      VERY_LIKELY: 5,
    };

    // Find the most prominent mood
    let mostProminentMood = "neutral";
    let highestLikelihood = 0;

    for (const [mood, likelihood] of Object.entries(moods)) {
      const value = likelihoodValues[likelihood];
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

// Analyze a selfie and suggest a treat
(async () => {
  const imagePath = path.join(__dirname, "../public/image2.jpg");
  const mood = await detectMoodFromSelfie(imagePath);

  // Suggest festive treats based on detected mood
   const treatSuggestions = {
    joy: {
      name: "Cinnamon Crunch",
      description:
        "A burst of warm, festive joy in every bite to match your joy!",
      image: path.join(__dirname, "../public/cinnamon_crunch.jpg"),
    },
    sorrow: {
      name: "Festive Gingerbread",
      description: "A comforting, spiced treat to lift your spirits.",
      image: path.join(__dirname, "../public/festive_gingerbread.jpg"),
    },
    anger: {
      name: "Butterscotch & Crushed Almonds",
      description:
        "Smooth butterscotch and a crunch of almonds to calm your mind.",
      image: path.join(__dirname, "../public/butterscotch_almonds.jpeg"),
    },
    surprise: {
      name: "Whisper Snowballs",
      description: "Playful, snowy delights that surprise your taste buds!",
      image:  path.join(__dirname, "../public/snowballs.jpeg"),
    },
    neutral: {
      name: "Coconut and Hazelnut Bliss",
      description: "A balanced, blissful combination of coconut and hazelnut.",
      image:  path.join(__dirname, "../coconut_hazelnut.jpeg"),
    },
  };

  const suggestion = treatSuggestions[mood] || {
    name: "No treat suggestion available.",
    description:
      "Oops! We couldn’t determine your festive flavor but here's some chocolate anyway",
    image: "../public/default.png",
  };

  // Simulate a magical reveal
  console.log(`Your festive flavor based on your mood is: ${suggestion.name}!`);
  console.log(`${suggestion.description}`);
  console.log(`Image: ${suggestion.image}`);
})();
*/

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

module.exports = detectMoodFromSelfie;