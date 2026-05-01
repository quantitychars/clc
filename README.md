# 🎓 Campus Companion 

## Project Overview
"Campus Companion" is a Next.js web application designed to help overwhelmed first-year university students balance their academic schedule, navigate campus, and find society events that match their interests. 

## 🏃‍♂️ Our Agile Workflow & Sprints
This project was managed using an Agile methodology, led by our Scrum Master, executing across three 1-week sprints:

*   **Sprint 1 (Planning & Architecture):** We defined our target user (freshers) and established strict GDPR data minimisation rules (collecting only Fictional Name, Email, and Course ID—no student numbers). We mapped out the UI flow for our 4 core features: Dashboard/Timetable, Helpdesk, Campus Map, and Event Recommender.
*   **Sprint 2 (AI-Assisted Build):** We utilized "vibe coding" with Lovable and Next.js to rapidly build our UI components. We applied a full functional map and populated a fictional JSON database containing weekly schedules for 6 different university courses. 
*   **Sprint 3 (ML, Accessibility & Deployment):** We integrated our classical ML feature (k-Nearest Neighbours event recommender), added a WCAG AA-compliant High Contrast theme toggle, conducted user testing, and finalized our Git-to-Netlify CI/CD pipeline.

## 🛠️ Tech Stack
*   **Framework:** Next.js (App Router) / React
*   **Styling:** Tailwind CSS (TU Dublin Color Palette)
*   **Development Tool:** Lovable (AI-assisted UI generation)
*   **Deployment:** Netlify (Automated CI/CD via GitHub main branch)
*   **Database:** Fictional JSON seed data (Courses, Timetables, Students)

## 🧠 Machine Learning Feature
We implemented a classical Machine Learning algorithm (k-Nearest Neighbours) for our Event Recommender. Rather than a simple if/else filter, the algorithm compares a user's course and interests against a fictional database of student profiles to recommend highly relevant society events.

## ⚙️ How to Run Locally
1. Clone the repository: `git clone[your-repo-url]`
2. Navigate to the project directory: `cd [project-folder]`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open[http://localhost:3000](http://localhost:3000) in your browser.

*(Note: No external API keys are required as the app uses local fictional JSON seed data to comply with GDPR data minimisation).*
