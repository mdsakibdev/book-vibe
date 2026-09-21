"use client";

import { BookContext } from "@/context/BooksContext";
import { IBook } from "@/types/books.type";
import { useContext } from "react";
import { toast } from "react-toastify";

const ReadButton = ({ book }: { book: IBook }) => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("ReadButton must be used inside BookProvider");
  }

  const { readBook, setReadBook } = context;

  const handleReadBook = () => {
    if (readBook.includes(book.bookId)) {
      toast.info(`"${book.bookName}" is already in your read list`);
      return;
    }

    setReadBook((prev) => [...prev, book.bookId]);

    toast.success(`You have read "${book.bookName}"`);
  };

  return (
    <button
      className="btn btn-success flex-1 text-white"
      onClick={handleReadBook}
    >
      Read Now →
    </button>
  );
};

export default ReadButton;