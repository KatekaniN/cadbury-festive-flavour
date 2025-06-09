# Google Vision Mood Analyzer & Treat Suggester

This application analyzes your mood from a selfie using the Google Cloud Vision API and suggests a delicious treat to match!

## How it Works

1.  **Upload Your Selfie:** Use the web interface to upload an image of yourself.
2.  **Mood Analysis:** The backend server receives the image and sends it to the Google Cloud Vision API for facial emotion analysis.
3.  **Treat Suggestion:** Based on the most prominent mood detected (Joy, Sorrow, Anger, or Surprise), the application suggests a specific treat.
4.  **Enjoy!** Get your personalized treat recommendation. If no face is detected or the mood is unclear, a default treat is suggested.

## Features

*   **Selfie-Based Mood Detection:** Utilizes Google Cloud Vision API to analyze facial expressions.
*   **Personalized Treat Suggestions:** Recommends treats based on detected moods:
    *   **Joy:** Cinnamon Crunch
    *   **Sorrow:** Festive Gingerbread
    *   **Anger:** Butterscotch & Crushed Almonds
    *   **Surprise:** Whisper Snowballs
*   **Default Treat:** Offers a Coconut Hazelnut treat if no face is detected or mood is ambiguous.
*   **Simple Web Interface:** Easy-to-use interface for uploading selfies.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Frontend:** HTML, CSS, JavaScript (served via Express)
*   **API:** Google Cloud Vision API for facial emotion detection
*   **File Handling:** Formidable for parsing multipart/form-data
*   **Development:** Nodemon for live server reloading

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd google-vision
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Google Cloud Credentials:**
    This project requires credentials to use the Google Cloud Vision API. You have two options:

    *   **Service Account Key File:**
        1.  Create or download your Google Cloud service account key JSON file.
        2.  Place it in the root of the project directory and name it `service-account-key.json`. The application is configured to look for this file.
    *   **Environment Variable:**
        1.  Encode your service account key JSON file content as a Base64 string.
        2.  Set the `GOOGLE_APPLICATION_CREDENTIALS_BASE64` environment variable to this Base64 string. The application will decode this variable and create the necessary credentials file.

4.  **Enable Google Cloud Vision API:**
    Ensure that the Google Cloud Vision API is enabled for your Google Cloud project associated with the credentials.

## Running the Application

*   **Development Mode (with auto-reloading):**
    ```bash
    npm run dev start
    ```
*   **Production Mode:**
    ```bash
    npm start
    ```
The server will start, and by default, the application will be accessible at `http://localhost:3000`.

## API Endpoint

### `/analyze`

*   **Method:** `POST`
*   **Description:** Analyzes an uploaded selfie to detect mood and suggest a treat.
*   **Request Type:** `multipart/form-data`
*   **Form Data Field:**
    *   `selfie`: The image file to be analyzed.
*   **Response:**
    *   **Success (200 OK):** A JSON object containing the treat suggestion:
        ```json
        {
          "name": "Cinnamon Crunch", // Or other treat name
          "mood": "Joy", // Detected mood
          "description": "A burst of warm, festive joy in every bite to match your joy!",
          "image": "./assets/cinnamon_crunch.png" // Path to treat image
        }
        ```
    *   **Error (400 Bad Request):** If no file is uploaded.
        ```json
        { "error": "No file uploaded" }
        ```
    *   **Error (500 Internal Server Error):** If there's an issue with file processing or mood analysis.
        ```json
        { "error": "Error message describing the issue" }
        ```

## File Structure

```
google-vision/
├── .gitignore
├── README.md
├── assets/                 # Images and fonts for the application
│   ├── Bestie.otf
│   ├── HennyPenny-Regular.ttf
│   ├── ... (other images and fonts)
├── package-lock.json
├── package.json            # Project metadata and dependencies
├── public/                 # Frontend static files
│   ├── index.html          # Main HTML page for the application
│   └── style.css           # Styles for the application
├── server.js               # Express server setup and API endpoint logic
├── service-account-key.json # (Optional) Google Cloud credentials file
└── src/
    └── index.js            # Core logic for mood detection using Google Vision API
```
