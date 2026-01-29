# Budget Tracker

A fast and efficient Progressive Web Application (PWA) for tracking expenses and deposits. Works seamlessly online and offline with automatic synchronization when your connection is restored.

## Table of contents

- Project overview
- Getting started
- Run locally
- Project structure
- Features
- Tech stack
- Usage
- Deployment
- Contributing
- License

## Project overview

Budget Tracker is a progressive web app designed for personal finance management. It allows users to add deposits and expenses anytime, anywhere—even without an internet connection. All transactions are synced automatically to the cloud when connectivity is restored, ensuring your financial data is always up-to-date.

## Demo

![Budget Tracker Demo](./assets/19-pwa-homework-demo-01.png)

## Getting started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account (or local MongoDB instance)
- A code editor (VS Code recommended)
- Modern web browser supporting Service Workers

### Install / Run

```bash
# Install dependencies
npm install

# Create a .env file with your MongoDB URI
# MONGODB_URI=your_mongodb_connection_string

# Start the server
npm start

# Visit http://localhost:3000 in your browser
```

## Project structure

```
/assets
    /icons
/models
    transaction.js
/public
    index.html
    manifest.json
    sw.js
    /css
        styles.css
    /js
        idb.js
        index.js
/routes
    api.js
server.js
package.json
```

## Features

- ✅ Add deposits and expenses with or without internet connection
- ✅ Offline-first functionality using IndexedDB
- ✅ Service worker for reliable caching and PWA capabilities
- ✅ Real-time balance updates
- ✅ Mobile-responsive design
- ✅ Installable as a native app
- ✅ Automatic sync when connectivity is restored

## Tech stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Offline Storage**: IndexedDB & Service Workers
- **Deployment**: Heroku with MongoDB Atlas

## Usage

1. Enter a transaction amount and description
2. Click "Add Expense" or "Add Deposit"
3. Your transaction is added instantly (even offline)
4. When online, transactions automatically sync to the database
5. Install as a mobile app from your browser menu

## Deployment

Deployed to Heroku with MongoDB Atlas. View the live application [here](https://pwa-budget-tracker-7aebcec5c474.herokuapp.com/).

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "Add feature"`
4. Push and open a pull request

## License

© 2026 Wade Wired, LLC

## Contact

Project created as part of the UCF bootcamp module projects.
