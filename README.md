# JPlag Web Runner

A full-stack web application that allows users to run JPlag plagiarism detection through a web interface.

Users can upload a JAR file and student submissions, configure advanced options, execute JPlag on the server, and download reports.

--------------------------------------------------

FEATURES

- Upload JPlag .jar file
- Upload submissions folder
- Run plagiarism detection
- Download result reports (ZIP)
- View history of previous runs
- Advanced configuration options
- Clean UI with sidebar

--------------------------------------------------

HOW IT WORKS

1. User uploads:
   - JAR file
   - Submissions folder

2. Frontend sends request:
   POST /api/run

3. Backend:
   - Stores files
   - Runs command:
     java -jar jplag.jar -M RUN -r <result_path> <submissions_path>

4. Returns ZIP report

--------------------------------------------------

TECH STACK

Frontend:
- React (Vite)
- Tailwind CSS

Backend:
- Node.js
- Express.js
- child_process

Deployment:
- Vercel (Frontend)
- Render (Backend)

--------------------------------------------------

PROJECT STRUCTURE

JPLAG-web/

backend/
  controllers/
  routes/
  services/
  storage/
  index.js

frontend/
  src/
  components/
  pages/

README.md

--------------------------------------------------

BACKEND SETUP

cd backend
npm install
node index.js

Runs on:
http://localhost:5000

--------------------------------------------------

FRONTEND SETUP

cd frontend
npm install
npm run dev

Runs on:
http://localhost:5173

--------------------------------------------------

API ENDPOINTS

Run JPlag:
POST /api/run

Form Data:
- jar
- submissions
- config

Response:
{
  "success": true,
  "zip": "run-123456.zip"
}

--------------------------------------------------

Get History:
GET /api/history

Returns:
- runId
- language
- timestamp
- zip file

--------------------------------------------------

HISTORY PAGE

- Displays previous runs
- Fetches from /api/history
- Allows downloading reports

--------------------------------------------------

ADVANCED SETTINGS

- Language selection
- Minimum tokens
- Similarity threshold
- Normalize option
- Show comparisons
- Clustering options

--------------------------------------------------

COMMAND EXECUTION

Backend runs:

const { spawn } = require("child_process")
spawn("java", args)

Equivalent to:

java -jar jplag.jar ...

Runs on backend server (Render)

--------------------------------------------------

FILE STORAGE

Uploads:
backend/storage/uploads/

Results:
backend/storage/results/

--------------------------------------------------

IMPORTANT NOTES

- Java must be installed
- JAR must exist on server
- Avoid cloud upload for large JAR
- Render free tier may sleep

--------------------------------------------------

COMMON ISSUES

Backend not reachable:
- Check Render logs

Module error:
npm install axios

HTTP2 error:
- Backend crash

Large file upload:
- Avoid Cloudinary

--------------------------------------------------

DEPLOYMENT

Backend (Render):
- Root: backend
- Build: npm install
- Start: node index.js

Frontend (Vercel):
- Root: frontend
- Framework: Vite

--------------------------------------------------

FUTURE IMPROVEMENTS

- Reuse last uploaded JAR
- Progress tracking
- Authentication
- Multi-user support

--------------------------------------------------

AUTHOR

Parikshit R

--------------------------------------------------

LICENSE

Educational use