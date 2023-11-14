/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home({ books, fetchBooks, showAll }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchBooks(showAll);
  }, [showAll]);

  return (
    <>
      <h1>All Books</h1>
      <div className="card">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCount((count) => count + 1)}
        >
          If you are bored of books, go ahead and click your life away: count is{" "}
          <b>{count}</b>
        </button>
      </div>
      <div className="flex items-center justify-center">
        {books.map((book) => (
          <div key={book.id}>
            <img
              className="w-64 h-75 object-cover bg-origin-padding m-3"
              src={book.cover_image_url}
              alt="Image of book"
              onClick={() => {
                navigate(`/book/${book.id}`);
              }}
            />
            {book.categories.flatMap((category) => (
              <li key={category.id}>
                CATEGORY: {""}
                {category.name}
              </li>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
