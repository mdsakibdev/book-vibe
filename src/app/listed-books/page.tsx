"use client";

import ListedBooks from "@/components/shared/$RPDYY3G/ListedBooks";
import { BookContext } from "@/context/BooksContext";
import { IBook } from "@/types/books.type";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const ListedBook = () => {
  const context = useContext(BookContext);

  const [books, setBooks] = useState<IBook[]>([]);
  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");

  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("/booksData.json");
      const data = await res.json();

      setBooks(data);
    };

    getBooks();
  }, []);

  if (!context) {
    return null;
  }

  const { readBook, wishList } = context;

  const readBooks = books.filter((book) =>
    readBook.includes(book.bookId)
  );

  const wishListBooks = books.filter((book) =>
    wishList.includes(book.bookId)
  );

  const displayedBooks =
    activeTab === "read" ? readBooks : wishListBooks;

  return (
    <main className="min-h-screen bg-base-200/40">

      {/* ================= HEADER ================= */}
      <section className="container mx-auto px-4 pt-8 md:pt-12">

        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-success/10 via-base-100 to-base-100 p-6 shadow-sm md:p-10">

          {/* Decorative Circle */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-success/10 blur-3xl" />

          <div className="relative z-10">
            <span className="badge badge-success badge-outline mb-4 px-4 py-3">
              My Library
            </span>

            <h1 className="font-serif text-3xl font-bold md:text-5xl">
              Your Book{" "}
              <span className="text-success">
                Collection
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-base-content/60 md:text-base">
              Keep track of the books you have read and save
              the books you want to read later.
            </p>
          </div>
        </div>

      </section>


      {/* ================= TABS ================= */}
      <section className="container mx-auto px-4 pt-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="tabs tabs-boxed bg-base-100 p-1 shadow-sm">

            <button
              onClick={() => setActiveTab("read")}
              className={`tab gap-2 ${
                activeTab === "read"
                  ? "tab-active bg-success text-white"
                  : ""
              }`}
            >
              📖 Read Books
              <span className="badge badge-sm">
                {readBooks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`tab gap-2 ${
                activeTab === "wishlist"
                  ? "tab-active bg-success text-white"
                  : ""
              }`}
            >
              ♡ Wishlist
              <span className="badge badge-sm">
                {wishListBooks.length}
              </span>
            </button>

          </div>

          {/* Total */}
          <p className="text-sm text-base-content/50">
            {displayedBooks.length}{" "}
            {displayedBooks.length === 1 ? "book" : "books"}
          </p>

        </div>

      </section>


      {/* ================= BOOK LIST ================= */}
      <section className="container mx-auto px-4 py-8 pb-16">

        {displayedBooks.length > 0 ? (

          <div className="space-y-5">

            {displayedBooks.map((book) => (

              <ListedBooks
                key={book.bookId}
                book={book}
                activeTab={activeTab}
              />

            ))}

          </div>

        ) : (

          /* ================= EMPTY STATE ================= */

          <div className="flex min-h-100 flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-100 px-6 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl">
              {activeTab === "read" ? "📖" : "♡"}
            </div>

            <h2 className="text-2xl font-bold">
              {activeTab === "read"
                ? "No books read yet"
                : "Your wishlist is empty"}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-base-content/50">
              {activeTab === "read"
                ? "Books you mark as read will appear here."
                : "Save books you are interested in and find them here later."}
            </p>

            <Link
              href="/"
              className="btn btn-success mt-6 text-white"
            >
              Explore Books →
            </Link>

          </div>

        )}

      </section>

    </main>
  );
};

export default ListedBook;