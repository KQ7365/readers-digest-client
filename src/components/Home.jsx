/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import "./Home.css";
import { useNavigate } from "react-router-dom";
import { postNewBook } from "../services/postNewBook";

function Home({ books, fetchBooks, showAll }) {
  const navigate = useNavigate();
  const [categories, changeCategories] = useState([{}]);
  const [chosenCategories, updateChosen] = useState(new Set());
  const [newBook, setNewBook] = useState({
    title: "",
    isbn_number: 0,
    author: "",
    cover_image_url: "",
  });

  useEffect(() => {
    fetchBooks(showAll);
  }, [showAll]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const itemCopy = { ...newBook };
    itemCopy[event.target.name] = event.target.value;
    setNewBook(itemCopy);
  };

  const handleCategoryChosen = (category) => {
    const copy = new Set(chosenCategories);
    copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id);
    updateChosen(copy);
  };

  const handleNewBookSave = (event) => {
    event.preventDefault();

    const newBookItem = {
      title: newBook.title,
      isbn_number: newBook.isbn_number,
      author: newBook.author,
      cover_image_url: newBook.cover_image_url,
    };

    postNewBook(newBookItem, chosenCategories)
      .then(() => {
        fetchBooks(showAll);
      })
      .then(() => {
        setNewBook({
          title: "",
          isbn_number: 0,
          author: "",
          cover_image_url: "",
        });
      });
  };

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("book_token")).token
        }`,
      },
    });
    const categories = await response.json();
    changeCategories(categories);
  };

  return (
    <div className="flex-direction: column bg-slate-400">
      <h1 className="display: text-center">All Books</h1>

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
      <div>
        <h1 className="flex items-center justify-center">Add a Book</h1>
        <form>
          <fieldset className="flex items-center justify-center">
            <label htmlFor="title">Title:</label>
            <input
              value={newBook.title}
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter Title"
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="flex items-center justify-center">
            <label htmlFor="title">ISBN:</label>
            <input
              value={newBook.isbn_number}
              name="isbn_number"
              type="text"
              className="form-control"
              placeholder="Enter ISBN Number"
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="flex items-center justify-center">
            <label htmlFor="title">Author:</label>
            <input
              value={newBook.author}
              name="author"
              type="text"
              className="form-control"
              placeholder="Enter Author"
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="flex items-center justify-center">
            <label htmlFor="title">Cover image:</label>
            <input
              value={newBook.cover_image_url}
              name="cover_image_url"
              type="text"
              className="form-control"
              placeholder="Enter Image URL"
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className="flex items-center justify-center">
            <label htmlFor="type">Categories:</label>
            {categories.map((c) => (
              <div key={`category-${c.id}`}>
                <input
                  type="checkbox"
                  checked={chosenCategories.has(c.id)}
                  onChange={() => handleCategoryChosen(c)}
                />
                {c.name}
              </div>
            ))}
          </fieldset>
          <div className="flex items-center justify-center">
            <button className="border" onClick={handleNewBookSave}>
              Add New Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
