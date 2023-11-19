export const postNewBook = (item, chosenCategories) => {
  return fetch("http://localhost:8000/books", {
    method: "POST",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("book_token")).token
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item, categories: Array.from(chosenCategories) }),
  });
};
