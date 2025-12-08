import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BokksList.css";
import { MdFlipCameraAndroid } from "react-icons/md";
  interface Book {
  _id: string;
  title: string;
  author: string;
  frontCover: string;
  backCover: string;
  bookPdf: string;
}
interface BooksListProps {
  user: any;
}

const BooksList : React.FC<BooksListProps> = ({ user }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [coverToggled, setCoverToggled] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user || !user.token) {
        console.warn("User not logged in — skipping fetch");
        setLoading(false);
        // navigate("/signin");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/books/all",{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        setBooks(response.data.books );
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [user]);

  const handleToggleCover = (bookId: string) => {
    setCoverToggled((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };
  // const handleBookRead = (bookId: string, bookPdf: string) => {
  //   localStorage.setItem(`pdf-${bookId}`, bookPdf);
  //   navigate(`/book/${bookId}`);
  // }
  if (loading) return <p style={{textAlign:"center"}}>Loading books...</p>;

  

  return (
    <>
    <div className="search-container" style={{ position: "fixed" }}>
      {/* <br/> */}
      <input type="search" placeholder="Search" />
      {/* <br/> */}
    </div>
    <div className="book-list-container">
      <h2>📚 Available Books</h2>
      <div className="book-grid">
        {books.length > 0 ? (
          books.map((book: Book) => (
            <div key={book._id} className="book-card row">
              <div className="card-left col-md-4 col-sm-4">
                <img 
                  src={
                      coverToggled[book._id]
                        ? book.backCover
                        : book.frontCover
                  }
                  alt={book.title}
                  className="book-cover text-align-center"
                />
                <div className="text-section">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                </div>
              </div>
              <div className="card-right col-md-8 col-sm-8">
                 <button
                    className="toggle-btn"
                    onClick={() => handleToggleCover(book._id)}
                  >
                    <MdFlipCameraAndroid />
                  </button>
                  <a
                    href={book.bookPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pdf-link"
                  >
                    <button>Read Now</button>
                  </a>
                  <button>Summary</button>

                {/* <button className="read-btn" onClick={() => handleBookRead(book._id,book.bookPdf)}>
                  Read Now
                </button> */}
               
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No books found.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default BooksList;
