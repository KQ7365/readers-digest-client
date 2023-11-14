import { Route, Routes } from "react-router-dom";
import { RegisterAccount } from "../components/RegisterAccount";
import { Authorized } from "../components/Authorized";
import Home from "../components/Home";
import { Login } from "../components/Login";
import { useState } from "react";
import { BookDetails } from "../components/BookDetails";

export const ApplicationViews = () => {
  const [bookState, setBookState] = useState([]);

  const fetchBooksFromAPI = async (showAll) => {
    let url = "http://localhost:8000/books";

    if (showAll !== true) {
      url = "http://localhost:8000/books?owner=current";
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("book_token")).token
        }`,
      },
    });
    const books = await response.json();
    setBookState(books);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAccount />} />
      <Route element={<Authorized />}>
        <Route
          path="/"
          element={
            <Home
              books={bookState}
              fetchBooks={fetchBooksFromAPI}
              showAll={true}
            />
          }
        />
      </Route>
      <Route path="book">
        <Route path=":bookId" element={<BookDetails />} />
      </Route>
    </Routes>
  );
};
