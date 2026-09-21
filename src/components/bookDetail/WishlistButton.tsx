"use client";

import { BookContext } from "@/context/BooksContext";
import { IBook } from "@/types/books.type";
import { useContext } from "react";
import { toast } from "react-toastify";

const WishlistButton = ({ book }: { book: IBook }) => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error("WishlistButton must be used inside BookProvider");
  }

  const { wishList, setWishList } = context;

  const handleAddToWishlist = () => {
    if (wishList.includes(book.bookId)) {
      toast.info(`"${book.bookName}" is already in your wishlist`);
      return;
    }

    setWishList((prev) => [...prev, book.bookId]);

    toast.success(
      `You have added "${book.bookName}" to your wishlist`
    );
  };

  return (
    <button
      className="btn btn-outline flex-1"
      onClick={handleAddToWishlist}
    >
      Add to Wishlist ♡
    </button>
  );
};

export default WishlistButton;