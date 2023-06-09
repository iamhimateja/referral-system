# Rails + React Project

This project is a Rails + React application developed as part of an assignment assigned by Directshifts company.

This is a Rails project integrated with React. It provides authentication using Devise and allows users to send referral emails and view the referred email addresses.

## Prerequisites

- Ruby 3.0.1
- Rails 7.0.1
- MySQL database
- Node.js (for installing dependencies and running the React app)

## Setup

1. Clone the repository to your local machine.

2. Install the required dependencies by running the following command in the project root directory:

   ```
   bin/setup
   ```

   This will run `bundle install` to install the Ruby gems, set up the database, and install the Node.js dependencies with `yarn install`.

## Running the Application

To start the development server and run both the Rails and React servers simultaneously, use the following command:

```
bin/dev
```

This command will start the Rails server on `http://localhost:3000` and the React server on `http://localhost:3001`. You can access the application in your web browser at `http://localhost:3000`.

## Authentication

The project uses Devise for authentication. Users can sign up and log in using the Material UI forms provided.

### API Authentication

The application also supports API authentication with Devise. You can use the following endpoints for signing up and logging in:

- Sign up: `POST /api/register`
- Log in: `POST /api/login`

Make sure to include the appropriate parameters in the request body.

## Referral

Users can send referral emails to any email address. The email will contain a link that redirects to the sign-up page.

To send a referral email, navigate to the home page of the application, open the add new referral modal and enter the recipient's email address. Click on the "Send" button to send the email.

P.S. You can try to send a referral email to your own email address to test the functionality.

The user's home page will display a list of all the email addresses that were referred.
