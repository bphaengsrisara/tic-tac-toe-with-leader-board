# Tic-Tac-Toe with Leaderboard

This project is a Next.js application that features a Tic-Tac-Toe game with a leaderboard tracking wins and streaks for authenticated users. Built with Prisma for database management and NextAuth for authentication, it offers a modern, server-rendered experience.

## Features

- **Authentication**: Google sign-in via NextAuth
- **Tic-Tac-Toe Game**: Human vs. bot mode with score tracking
- **Leaderboard**: Persistent score tracking with PostgreSQL
- **State Management**: Zustand for UI state
- **Data Fetching**: TanStack Query for efficient server requests

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction), [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#api-routes), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [shadcn](https://ui.shadcn.com/docs)
- **Authentication**: [NextAuth](https://authjs.dev/getting-started) with [Google OAuth](https://authjs.dev/getting-started/providers/google)
- **Development**: [Yarn](https://yarnpkg.com/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Docker](https://www.docker.com/) (optional)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20+ recommended)
- [Yarn](https://yarnpkg.com/) for package management
- [Docker](https://www.docker.com/) for containerization (optional)

### Environment Variables

Create a `.env` file with the following environment variables:

```plaintext
# NextAuth configuration
AUTH_TRUST_HOST=your_auth_trust_host
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url

# Google OAuth configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# PostgreSQL configuration
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DB=your_db_name
DB_PORT=your_db_port
DB_HOST=your_db_host

# ! don't change this line
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
```

### Setup without docker

1. **Clone the Repository**  
   Clone the repository to your local machine and navigate into the project directory:

   ```bash
   git clone https://github.com/bphaengsrisara/tic-tac-toe-with-leader-board.git
   cd tic-tac-toe-with-leader-board
   ```

2. **Install Dependencies**  
   Use Yarn to install the required packages:

   ```bash
   yarn
   ```

3. **Run Database Migrations**  
   Set up the database schema by running the following command:

   ```bash
   yarn db:setup
   ```

4. **Start the Development Server**  
   Launch the application in development mode:

   ```bash
   yarn dev
   ```

   You can now access the application at http://localhost:3000.

### Run with docker

1. **Clone the Repository**  
   Clone the repository to your local machine and navigate into the project directory:

   ```bash
   git clone https://github.com/bphaengsrisara/tic-tac-toe-with-leader-board.git
   cd tic-tac-toe-with-leader-board
   ```

2. **Using Docker**  
   If you prefer to run the application using Docker, you can start it with:

   ```bash
   docker compose up -d
   ```

   You can now access the application at http://localhost:3000.

## Contact

For any inquiries, please contact Bovonrajt Phaengsrisara at bovonrajt.p@gmail.com.
