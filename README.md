# Create Me - Social Media Content Generator

A modern web application for generating and scheduling social media content using AI.

## Tech Stack

- **Frontend**: Next.js (TypeScript) with TailwindCSS for styling
- **Authentication**: Firebase Auth
- **Backend**: Next.js API Routes for handling business logic and API endpoints
- **Database**: Firebase Firestore (NoSQL)
- **File Storage**: Supabase Storage for storing user-uploaded assets
- **AI Integration**: OpenAI GPT-4 API
- **Social Media API Integration**: Meta Graph API, LinkedIn API, Twitter (X) API
- **Scheduling**: Supabase Edge Functions for cron jobs
- **Deployment**: Vercel

## Features

- User authentication with email and Google sign-in
- User onboarding to collect business information
- Dashboard to view and manage social media posts
- AI-powered content generation for multiple platforms
- Post scheduling and publishing
- Settings management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/create-me.git
   cd create-me
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
create-me/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── auth/       # Authentication components
│   │   ├── dashboard/  # Dashboard components
│   │   ├── onboarding/ # Onboarding components
│   │   ├── posts/      # Post-related components
│   │   └── ui/         # Reusable UI components
│   ├── context/        # React context providers
│   ├── lib/            # Library code and API clients
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── .env.local          # Environment variables (create this file)
└── README.md           # Project documentation
```

## Deployment

This project is configured for deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your application.

## Notes

- This project uses dummy data and mock implementations for demonstration purposes.
- Replace the placeholder API keys and configuration with your actual credentials before deploying to production.
- The social media API integrations are mocked and would need to be implemented with real API calls in a production environment.

## License

This project is licensed under the MIT License.# create-me
