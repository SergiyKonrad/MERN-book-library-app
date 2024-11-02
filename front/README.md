# MERN Book Library App 📚

A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack, designed to manage a book library, enabling users to browse, add, delete, and view details of books in the collection.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Future Enhancements](#future-enhancements)
- [Acknowledgments](#acknowledgments)

---

## Overview

The **MERN Book Library App** allows users to:

- View a collection of books
- Fetch a random book or a delayed random book via API
- Add new books through a form
- Mark books as favorites
- Possibility to integrate books from external libraries, such as Open Library

This project demonstrates the use of RESTful APIs, MongoDB for data persistence, and React for a responsive frontend interface.

## Features

- **Real-Time Updates**: Seamless updates between frontend and backend using RESTful APIs.
- **Add New Books**: Add books manually or import book details from Open Library.
- **Random Book Fetch**: Fetches a random book from the collection.
- **Display All Books**: View a list of all books in the MongoDB collection.
- **Possibility to API Integration**: Pull in book data from Open Library using work IDs.

## Technologies Used

- **Frontend**: React, Redux for state management, Axios for API requests, CSS for styling
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM
- **Database**: MongoDB
- **External Libraries**: Open Library API (for external book data)

### Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mern-book-library-app.git
   cd mern-book-library-app
   ```
2. **Install Backend Dependencies**

```bash
cd back-api
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../front
npm install
```

4. **Setup MongoDB Connection**

Create a `.env` file in the `back-api` directory with your MongoDB connection URI:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/booklibraryrecommended
```

Replace <username>, <password>, and <cluster> with your MongoDB credentials and cluster information.

### Run the Application

**Backend:**

```bash
cd back-api
npm start
```

**Frontend:**

```bash
cd ../front
npm start

```

### Access the App:

- Visit [http://localhost:3000](http://localhost:3000) for the frontend.
- The backend runs on [http://localhost:5000](http://localhost:5000).

## Usage

- **Fetch All Books**  
  Open the app at [http://localhost:3000](http://localhost:3000) to view all available books.

- **Add a New Book**  
  Use the "Add Book" form on the frontend to manually add a new book.

- **Fetch Random Book**  
  Use the "Random Book" button on the frontend to fetch a randomly selected book.

- **Possibility to Import from Open Library**  
  POST a new book by entering the Open Library Work ID to `http://localhost:5000/add-book/:workId`.

## API Endpoints

| Endpoint               | Method | Description                        |
| ---------------------- | ------ | ---------------------------------- |
| `/books`               | GET    | Fetch all books                    |
| `/random-book`         | GET    | Fetch a random book                |
| `/random-book-delayed` | GET    | Fetch a delayed random book        |
| `/add-book/:workId`    | POST   | Add a book from Open Library by ID |

## Acknowledgments

- **Open Library API**: For providing access to a vast collection of book data for seamless integration.
- **MERN Stack**: For a robust framework enabling full-stack development with MongoDB, Express, React, and Node.js, ensuring efficient backend and frontend interactions.

This README provides a clear overview and structure for potential collaborators or users. Customize details as needed to fit your specific project setup and requirements.

## Contributions

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
