import React, { useEffect, useState } from "react";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import BookCard from "./BookCard";

function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    fetch("https://www.dbooks.org/api/recent")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.log("Invalid data format:", data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCardClick = (selectedBook) => {
    console.log("Selected book:", selectedBook);
    // Perform any other actions based on the selected book
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          colorScheme={currentPage === i ? "teal" : "gray"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <Box>
      <Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} bg="#edf3f8">
          {currentBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={handleCardClick} />
          ))}
        </Grid>
      </Box>

      <Box mt={4} textAlign="center">
        {renderPaginationButtons()}
      </Box>
    </Box>
  );
}

export default BookList;
