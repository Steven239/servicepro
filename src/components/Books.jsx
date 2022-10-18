import React, { useEffect, useState } from "react";
import Template from "./Template";
import { BsSearch } from "react-icons/bs";
import * as Services from "./Services";
import Pagination from "./Pagination";

function Books() {
  // State Objects
  const [bookData, setBooks] = useState({ arrOfBooks: [], bookComponent: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState({ search: "" });

  useEffect(() => {
    Services.Get().then(onGetSuccess).catch(onGetError);
  }, []);

  // Success Handler
  const onGetSuccess = (response) => {
    const responseData = response.data.body;

    setBooks((prevState) => {
      let bookData = { ...prevState }; // You shouldn't update state directly
      bookData.arrOfBooks = responseData;
      bookData.bookComponent = responseData.map(mapBooks); // This contains the actual card component that contains the HTML

      return bookData;
    });
  };

  // Error Handler
  const onGetError = (response) => {
    console.error(response);
  };

  // Map Books to Template
  const mapBooks = (aBook) => {
    return <Template bookData={aBook} />;
  };

  // Get the current Books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookData.bookComponent.slice(
    indexOfFirstBook, // Starting pos
    indexOfLastBook // Ending pos
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // On SearchChange
  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setSearchTerm((prevState) => {
      let newSearchTerm = { ...prevState };
      newSearchTerm[name] = value;
      return newSearchTerm;
    });
  };

  // filterbooks
  const filterBooks = (books) => {
    let result = false;

    if (books.title.toLowerCase().includes(searchTerm.search)) {
      result = true;
    }

    return result;
  };

  const filteredBooks = bookData.arrOfBooks.filter(filterBooks);

  // Sort Title
  const sortTitle = () => {
    let sorted = bookData.arrOfBooks.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setBooks((prevState) => {
      const newOrder = { ...prevState };
      newOrder.arrOfBooks = sorted;
      newOrder.bookComponent = sorted.map(mapBooks);
      return newOrder;
    });
  };

  // Sort Author
  const sortAuthor = () => {
    let sorted = bookData.arrOfBooks.sort((a, b) =>
      a.author.localeCompare(b.author)
    );

    setBooks((prevState) => {
      const newOrder = { ...prevState };
      newOrder.arrOfBooks = sorted;
      newOrder.bookComponent = sorted.map(mapBooks);
      return newOrder;
    });
  };

  // Sort Year
  const sortYear = (col) => {
    console.log("firing");
    const sorted = [...bookData.arrOfBooks].sort((a, b) => {
      return a[col] - b[col];
    });

    setBooks((prevState) => {
      const newOrder = { ...prevState };
      newOrder.arrOfBooks = sorted;
      newOrder.bookComponent = sorted.map(mapBooks);
      return newOrder;
    });
  };

  return (
    <div className="container">
      <div className="main-heading">
        <h1>Search From Our Collection Of Books</h1>
      </div>
      <nav className="navbar navbar-light bg-light">
        <form className="container-fluid">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              value={searchTerm.search}
              name="search"
              type="text"
              className="form-control"
              placeholder="Search for book"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </nav>
      <div className="sort-container">
        <ul>
          <li onClick={sortTitle}>Title</li>
          <li onClick={sortAuthor}>Author</li>
          <li onClick={() => sortYear("year")}>Year</li>
        </ul>
      </div>
      <div className="card-container">
        {searchTerm.search.length === 0
          ? currentBooks
          : filteredBooks.map(mapBooks)}
      </div>
      <div className="pagination-container">
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={bookData.arrOfBooks.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Books;
