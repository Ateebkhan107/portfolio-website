# Ateeb Mazhar - Portfolio Backend

This is the backend API for Ateeb Mazhar's portfolio website, handling contact form submissions and email functionality.

## Features

- Contact form email processing
- Email validation
- Professional email templates
- CORS enabled for frontend integration
- Static file serving for the portfolio

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory with the following variables:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=3000
```

### 3. Gmail App Password Setup
To use Gmail for sending emails, you need to:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in your `.env` file

### 4. Run the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST /api/contact
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## File Structure

```
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── index.html         # Portfolio frontend
├── style.css          # Portfolio styles
├── script.js          # Frontend JavaScript
└── .env              # Environment variables (create this)
```

## Deployment

### Local Development
1. Install dependencies: `npm install`
2. Set up environment variables
3. Run: `npm run dev`

### Production Deployment
1. Set up environment variables on your hosting platform
2. Run: `npm start`

## Security Notes

- Never commit your `.env` file to version control
- Use environment variables for sensitive data
- Consider rate limiting for production use
- Validate all input data (already implemented)

## Troubleshooting

### Email Not Sending
1. Check your Gmail app password is correct
2. Ensure 2FA is enabled on your Gmail account
3. Check the server logs for error messages

### CORS Issues
The server is configured with CORS enabled. If you're still having issues, check that your frontend is making requests to the correct URL.

## License

MIT License 