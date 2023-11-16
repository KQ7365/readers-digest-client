import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/getBookById";
import { postNewBookReview } from "../services/postNewBookReview";

export const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({ book_review: [] });
  const [newReview, setNewReview] = useState({
    book: bookId,
    rating: 0,
    comment: "",
    date: "",
  });

  useEffect(() => {
    getBookById(bookId).then((bookObj) => {
      setBook(bookObj);
    });
  }, [bookId]);

  const handleInputChange = (event) => {
    const itemCopy = { ...newReview };
    itemCopy[event.target.name] = event.target.value;
    setNewReview(itemCopy);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newBookReviewItem = {
      book: parseInt(newReview.book),
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: newReview.date,
    };

    postNewBookReview(newBookReviewItem)
      .then(() => {
        // After posting the review, fetch the updated book details
        getBookById(bookId).then((bookObj) => {
          setBook(bookObj);
        });
      })
      .then(() => {
        // Then, clear the forms!
        setNewReview({
          book: bookId,
          rating: 0,
          comment: "",
          date: "",
        });
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <img
          className="w-64 h-75 object-cover bg-origin-padding m-3"
          src={book.cover_image_url}
          alt="Image of book"
        />
        <h2>
          <u> ALL BOOK REVIEWS</u>
          {book.book_review.map((review) => (
            <li key={review.id}>{review.comment}</li>
          ))}
        </h2>
      </div>
      <form>
        <div>
          <label>
            Comment:
            <input
              value={newReview.comment}
              type="text"
              name="comment"
              placeholder="Add new review"
              className="form-control"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Rating 1-10:
            <input
              value={newReview.rating}
              type="text"
              name="rating"
              placeholder="Add a number 1-10"
              className="form-control"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button className="btn" onClick={handleSave}>
          Add New Review
        </button>
      </form>
    </div>
  );
};
