# ConvoHub GenZ Chat Application

A real-time chat application targeted for Gen Z, enabling users to discuss trending topics and hot news. Built with modern technologies to provide a seamless chatting experience.

## Features

- 🗨️ **Real-time Chat**: Messages update instantly without refreshing the page.
- 📈 **Trending Topics**: Displays the most trending topics to spark conversations.
- 👥 **Active Users**: Shows the count of users currently online.
- 🔒 **Secure Authentication**: Powered by NextAuth.js for user authentication.
- 🔔 **Real-time Updates**: Integrated with Supabase for real-time message syncing.

---

## Tech Stack

- **Frontend**: Next.js 13, Tailwind CSS
- **Backend**: Supabase (Database + Realtime)
- **Authentication**: NextAuth.js
- **WebSocket**: Socket.io for active user tracking
- **Database**: PostgreSQL (via Supabase)

---

## Screenshots

### Front
<img width="1440" alt="front" src="https://github.com/user-attachments/assets/24621715-bf06-4e62-a537-5f1b3fe43669" />

### Google Login
<img width="1440" alt="google_login" src="https://github.com/user-attachments/assets/1a9a3a5b-18ad-4d11-b45b-a5d5df7b0a0c" />

### User Dashboard
<img width="1440" alt="arav_front" src="https://github.com/user-attachments/assets/50a86ba6-b10c-4aae-851e-3bd2ebaeec2a" />
<img width="1440" alt="shreyansh_front" src="https://github.com/user-attachments/assets/5a999ab4-6812-4a4b-9ef6-ef78f4387ba1" />

###  PostgreSQL (via Supabase)
<img width="1440" alt="supabase" src="https://github.com/user-attachments/assets/9a3c50a7-f758-43a6-9204-b93e56f0fac6" />

### Server 
<img width="1309" alt="server" src="https://github.com/user-attachments/assets/5d9f3d4c-4926-4ddc-8016-61c3cc9267fc" />

### Prerequisites

- Node.js and npm installed
- Supabase account
- A PostgreSQL table named `messages`

  ### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Shreyansh301/convohub-web-front.git
2. Install dependencies:
   ```bash
   npm install
3. Set up Supabase:
   
- Create a Supabase project.
- Enable Realtime for the messages table.
- Add a table named messages with the following schema:
  ```bash
  CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
  );
4. Create a .env.local file in the root of the project and add the following environment variables:
   ```bash
    NEXTAUTH_SECRET=your-nextauth-secret
    NEXTAUTH_URL=http://localhost:3000
    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-
5. Start the development server:
   ```bash
   npm run dev
6. Access the web app at http://localhost:3000.

### Usage
- Sign in to access the dashboard.
- Chat in real-time with other active users.
- View trending topics and user counts.


### Contributions are welcome! Please fork the repo and submit a pull request.

