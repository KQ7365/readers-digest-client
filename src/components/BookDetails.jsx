import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/getBookById";

export const BookDetails = () => {
  const [book, setBook] = useState({ book_review: [] });

  const { bookId } = useParams();

  useEffect(() => {
    getBookById(bookId).then((bookObj) => {
      setBook(bookObj);
    });
  }, [bookId]);

  return (
    <div>
      <h3>Book details for: {book.title}</h3>
      <div className="flex items-center justify-center">
        <img
          className="w-64 h-75 object-cover bg-origin-padding m-3"
          src={book.cover_image_url}
          alt="Image of book"
        />
        <h2>
          {book.book_review.map((review) => (
            <li key={review.id}>{review.comment}</li>
          ))}
        </h2>
      </div>
    </div>
  );
};
