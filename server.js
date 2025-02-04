/* const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const detectMoodFromSelfie = require("./src/index.js");
const cors = require("cors");

const app = express();

app.use(cors("*"));

app.post("/analyze", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "uploads");
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    if (!files.selfie || files.selfie.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = files.selfie[0];
    const uploadedFilePath = uploadedFile.filepath;
    const fileName = uploadedFile.originalFilename;

    let newPath = path.join(__dirname, "uploads", fileName);

    fs.rename(uploadedFilePath, newPath, async (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({ error: "Error saving file" });
      }

      try {
        const mood = await detectMoodFromSelfie(newPath);

        const treatSuggestions = {
          joy: {
            name: "Cinnamon Crunch",
            mood: "Joy",
            description:
              "A burst of warm, festive joy in every bite to match your joy!",
            image: "./assets/cinnamon_crunch.png",
          },
          sorrow: {
            name: "Festive Gingerbread",
            mood: "Sadness",
            description: "A comforting, spiced treat to lift your spirits.",
            image: "./assets/festive_gingerbread.png",
          },
          anger: {
            name: "Butterscotch & Crushed Almonds",
            mood: "Anger",
            description:
              "Smooth butterscotch and a crunch of almonds to calm your mind.",
            image: "./assets/butterscotch_almonds.png",
          },
          surprise: {
            name: "Whisper Snowballs",
            mood: "Surprise",
            description:
              "Playful, snowy delights that surprise your taste buds!",
            image: "./assets/snowballs.png",
          },
          neutral: {
            name: "No faces detected",
            mood: "Oops! We couldn’t determine your festive flavor but here's some delicious chocolate anyway",
            description:
              "A balanced, blissful combination of coconut and hazelnut.",
            image: "./assets/coconut_hazelnut.png",
          },
        };

        const suggestion = treatSuggestions[mood];

        res.status(200).send(suggestion); //.json
      } catch (error) {
        console.error("Error analyzing selfie:", error);
        res.status(500).json({ error: "Error analyzing selfie" });
      }
    });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
*/

const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const detectMoodFromSelfie = require("./src/index.js");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors("*"));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Serve the frontend (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Analyze API endpoint
app.post("/analyze", (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "uploads");
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    if (!files.selfie || files.selfie.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = files.selfie[0];
    const uploadedFilePath = uploadedFile.filepath;
    const fileName = uploadedFile.originalFilename;

    let newPath = path.join(__dirname, "uploads", fileName);

    fs.rename(uploadedFilePath, newPath, async (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({ error: "Error saving file" });
      }

      try {
        const mood = await detectMoodFromSelfie(newPath);

        const treatSuggestions = {
          joy: {
            name: "Cinnamon Crunch",
            mood: "Joy",
            description: "A burst of warm, festive joy in every bite to match your joy!",
            image: "./assets/cinnamon_crunch.png",
          },
          sorrow: {
            name: "Festive Gingerbread",
            mood: "Sadness",
            description: "A comforting, spiced treat to lift your spirits.",
            image: "./assets/festive_gingerbread.png",
          },
          anger: {
            name: "Butterscotch & Crushed Almonds",
            mood: "Anger",
            description: "Smooth butterscotch and a crunch of almonds to calm your mind.",
            image: "./assets/butterscotch_almonds.png",
          },
          surprise: {
            name: "Whisper Snowballs",
            mood: "Surprise",
            description: "Playful, snowy delights that surprise your taste buds!",
            image: "./assets/snowballs.png",
          },
          neutral: {
            name: "No faces detected",
            mood: "Oops! We couldn’t determine your festive flavor but here's some delicious chocolate anyway",
            description: "A balanced, blissful combination of coconut and hazelnut.",
            image: "./assets/coconut_hazelnut.png",
          },
        };

        const suggestion = treatSuggestions[mood];

        res.status(200).send(suggestion);
      } catch (error) {
        console.error("Error analyzing selfie:", error);
        res.status(500).json({ error: "Error analyzing selfie" });
      }
    });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));