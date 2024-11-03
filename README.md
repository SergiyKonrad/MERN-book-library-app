# MERN Book Library App 📚

A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack, designed to manage a book library, enabling users to browse, add, delete, and view details of books in the collection.

## Overview

The **MERN Book Library App** allows users to:

- View a collection of books
- Fetch a random book or a delayed random book via API
- Add new books through a form
- Mark books as favorites
- Possibility to integrate books from external libraries, such as Open Library

This project demonstrates the use of RESTful APIs, MongoDB for data persistence, and React for a responsive frontend interface.

## Project Structure

This repository contains both the backend (`api/`) and frontend (`front/`) codebases within a single main repository. This setup allows for a clear separation of concerns while keeping the entire project in one place for easier management.

### Code Structure

- **`api/`** - Contains the backend API built with Node.js and Express, responsible for server-side logic, database interactions, and API endpoints.
- **`front/`** - Contains the frontend application built with React, handling the user interface and client-side interactions.

Each part of the codebase is managed independently, but both are organized within this single repository for a cohesive project structure and simpler deployment.

## Features

- **Real-Time Updates**: Seamless updates between frontend and backend using RESTful APIs.
- **Add New Books**: Add books manually or import book details from Open Library.
- **Add Recommended Book**:  
  _This feature runs only on the frontend and adds a predefined recommended book to your collection._
- **Add Random Book via API**:  
  _This feature uses the backend to fetch a random book from the MongoDB database._
- **Random Book Fetch**: Fetches a random book from the collection.
- **Possibility to API Integration**: Pull in book data from Open Library using work IDs.

## Technologies Used

- **Frontend**: React, Redux for state management, Axios for API requests, CSS for styling
- **Backend**: Node.js, Express.js, MongoDB, Mongoose ODM
- **Database**: MongoDB
- **External Libraries**: Open Library API (for external book data)

## Setup & Installation

1. **_Clone the repository_**:
   ```bash
   https://github.com/SergiyKonrad/MERN-book-library-app.git
   ```
   ```
   cd mern-book-library-app
   ```
2. **_Install Backend Dependencies_**

```bash
cd api
```

```
   npm install
```

4. **_Install Frontend Dependencies_**

```bash
cd ../front
```

```
   npm install
```

4. **_Setup MongoDB Connection_**

Create a `.env` file in the `back-api` directory with your MongoDB connection URI:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/booklibraryrecommended
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB credentials and cluster information.

### Run the Application

**_Backend:_**

```bash
cd api
```

```
npm start
```

**_Frontend:_**

```bash
cd ../front
```

```
npm start
```

## Access the App:

- Visit [http://localhost:3000](http://localhost:3000) for the frontend.
- The backend runs on [http://localhost:5000/books](http://localhost:5000/books) to fetch all books.
- Additional endpoints include:
  - `/random-book`: Fetch a random book.
  - `/random-book-delayed`: Fetch a delayed random book.
  - `/add-book/:workId`: Add a book from Open Library by work ID.

### API Endpoints

| Endpoint               | Method | Description                        |
| ---------------------- | ------ | ---------------------------------- |
| `/books`               | GET    | Fetch all books                    |
| `/random-book`         | GET    | Fetch a random book                |
| `/random-book-delayed` | GET    | Fetch a delayed random book        |
| `/add-book/:workId`    | POST   | Add a book from Open Library by ID |

- **Possibility to Import from Open Library**  
  POST a new book by entering the Open Library Work ID to `http://localhost:5000/add-book/:workId`.

## Acknowledgments

- **Open Library API**: For providing access to a vast collection of book data for seamless integration.
- **MERN Stack**: For a robust framework enabling full-stack development with MongoDB, Express, React, and Node.js, ensuring efficient backend and frontend interactions.

## Contributions

This README provides a clear overview and structure for potential collaborators or users. Customize details as needed to fit your specific project setup and requirements.

Feel free to open an issue or submit a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
