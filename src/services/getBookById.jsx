export const getBookById = (id) => {
  return fetch(`http://localhost:8000/books/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("book_token")).token
      }`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(`Error fetching book with ID ${id}:`, error);
    });
};
