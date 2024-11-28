# Book Review Application

## Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/IT22128140/Book-Review.git
    ```

2. **Install dependencies:**  

    open frontend and backend folder terminals run the following command:
    ```sh
    npm i
    ```


3. **Set up environment variables:**  

    Create a `.env` file in the backend root directory and add the following:
    ```
    MONGODB_URL = mongodb+srv://dewpuramaneth:oZZcLSoQaj2SxDZ7@book-review.t5ope.mongodb.net/?retryWrites=true&w=majority&appName=Book-Review
    PORT = 3000
    ```

4. **Run the application:**  

    In the backend and frontend terminals run the following command:
    ```sh
    npm run dev
    ```

## Features Implemented

- CRUD operations for book reviews
- filtering options based on rating and sorting by date added
- Basic rating calculation
- Responsive design for mobile and desktop

## Additional Notes

- Ensure you have Node.js and npm installed on your machine.
- The application is built using React, Node.js, Express, and MongoDB.