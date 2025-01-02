<div align="center">

#  Google Books Platform

<!-- Centered Core Technologies Badges -->


![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>


## 🌟 Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Token).
- **Book Categories**: Browse popular books categorized into genres like Fantasy, Sci-Fi, and more.
- **Search Functionality**: Search for books by title, author, or keyword.
- **Favorites**: Add and manage your favorite books.
- **Book Details**: View detailed information about each book including title, author, description, and cover image.
- **Google Books API Integration**: Fetch book data from Google Books API.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive interface.



## 📈 Architecture

The Google Books Platform follows a **Client-Server Architecture** with a clear separation between the frontend and backend. Here’s an overview:

### **Backend (API with Express.js)**
- **Controllers**: Handle HTTP requests and define API endpoints.
- **Services**: Contain business logic for fetching books, managing users, etc.
- **Models**: Define data structures such as `User`, `Book`, and `Favorite`.
- **Authentication & Authorization**: Secure API access using JWT for token-based authentication.

### **Frontend (React)**
- **Components**: Reusable UI elements such as BookCard, SearchBar, etc.
- **Pages**: Represent different views/routes like Home, Book Details, etc.
- **State Management**: Handle state using React hooks and context for global state.
- **API Calls**: Fetch data from the backend or directly from the Google Books API.

### **Database**
- **MongoDB**: Store user data, favorite books, and other information.
- **JWT**: Securely authenticate and manage user sessions.

## 🔧 Setup & Installation

Follow these steps to set up the project locally.

### **Clone the Repository**

```bash
git clone https://github.com/your-username/google-books-platform.git
cd google-books-platform
```

### **Backend Setup (Express.js)**

1. **Navigate to the Backend Directory**

    ```bash
    cd backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file with the following structure:

    ```plaintext
    JWT_SECRET=your-secret-key
    GOOGLE_API_KEY=your-google-books-api-key
    MONGODB_URI=your-mongodb-uri
    ```

4. **Start the Backend Server**

    ```bash
    npm run dev
    ```

    The API should now be running at `http://localhost:5000`.

### **Frontend Setup**

1. **Navigate to the Frontend Directory**

    ```bash
    cd frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Frontend Application**

    ```bash
    npm start
    ```

    The frontend should now be accessible at `http://localhost:3000`.

## 🧑‍💻 Usage

1. **Register & Login**: 
    - Register and log in to access features like searching, viewing book details, and managing favorites.

2. **Browse Books**: 
    - The homepage displays popular books and allows you to filter by category (e.g., Fantasy, Sci-Fi).
    - Use the search bar to find specific books.

3. **Add to Favorites**: 
    - Hover over any book card to add it to your favorites.
    - View your favorite books in your profile.

4. **View Book Details**: 
    - Click on any book to see detailed information such as description, authors, and cover image.

## 📸 Screenshots

### **Homepage**

![Web capture_2-1-2025_224523_localhost](https://github.com/user-attachments/assets/82fc7b65-e1fc-4541-9c9b-5adc0f002712)


### **Book Details Page**


![Web capture_2-1-2025_225822_localhost](https://github.com/user-attachments/assets/c4fe22a2-2c92-43f5-9361-6706b3847591)



### ** Registration Page**

![Web capture_2-1-2025_22450_localhost](https://github.com/user-attachments/assets/e3c4df8b-8e0e-4905-a00e-97ca271e2ca4)


### **Login Page**

![Web capture_2-1-2025_224446_localhost](https://github.com/user-attachments/assets/eeb1198d-2035-4233-9469-443e626f2ca9)

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository, create a new branch, and submit a pull request.

1. **Fork the Project**
2. **Create a Feature Branch**

    ```bash
    git checkout -b feature/AmazingFeature
    ```

3. **Commit your Changes**

    ```bash
    git commit -m 'Add some AmazingFeature'
    ```

4. **Push to the Branch**

    ```bash
    git push origin feature/AmazingFeature
    ```

5. **Open a Pull Request**

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📫 Contact

- **Email**: [dilandilruksha0@gmail.com](mailto:dilandilruksha0@gmail.com)
