import { IBook } from '@/types/books.type';
import Image from 'next/image';
import Link from 'next/link';

type ListedBooksProps = {
  book: IBook;
  activeTab: string;
};

const ListedBooks = ({ book, activeTab }: ListedBooksProps) => {
    return ( 
    <div
                key={book.bookId}
                className="
                  group
                  flex flex-col
                  overflow-hidden
                  rounded-2xl
                  border border-base-300
                  bg-base-100
                  p-4
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:flex-row
                  sm:items-center
                "
              >

                {/* Book Image */}
                <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl bg-base-200 sm:h-44 sm:w-32">

                  <Image
                    src={book.image}
                    alt={book.bookName}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                </div>


                {/* Book Content */}
                <div className="flex-1 px-1 py-5 sm:px-6 sm:py-2">

                  {/* Category */}
                  <div className="flex flex-wrap items-center gap-2">

                    <span className="badge badge-success badge-outline">
                      {book.category}
                    </span>

                    <span className="text-sm text-base-content/50">
                      ★ {book.rating}
                    </span>

                  </div>


                  {/* Title */}
                  <h2 className="mt-3 line-clamp-1 text-xl font-bold md:text-2xl">
                    {book.bookName}
                  </h2>


                  {/* Author */}
                  <p className="mt-1 text-sm text-base-content/60">
                    by{" "}
                    <span className="font-medium text-base-content">
                      {book.author}
                    </span>
                  </p>


                  {/* Information */}
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-base-content/60">

                    <span>
                      📄 {book.totalPages} pages
                    </span>

                    <span>
                      📅 {book.yearOfPublishing}
                    </span>

                    <span>
                      🏢 {book.publisher}
                    </span>

                  </div>


                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">

                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-success"
                      >
                        #{tag}
                      </span>
                    ))}

                  </div>

                </div>


                {/* Action */}
                <div className="flex shrink-0 flex-col gap-2 sm:w-36">

                  <Link
                    href={`/books/${book.bookId}`}
                    className="btn btn-success text-white"
                  >
                    View Details
                  </Link>

                  <button className="btn btn-ghost btn-sm">
                    {activeTab === "read"
                      ? "✓ Read"
                      : "♡ Saved"}
                  </button>

                </div>

              </div>
    );
};

export default ListedBooks;