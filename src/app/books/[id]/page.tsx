import ReadButton from "@/components/bookDetail/ReadButton";
import WishlistButton from "@/components/bookDetail/WishlistButton";
import { IBook } from "@/types/books.type";
import Image from "next/image";
import Link from "next/link";

interface IBookParamsDetailType {
  params: Promise<{ id: string }>;
}

const getBooks = async (): Promise<IBook[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL} /booksData.json`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  return data;
};

const BookPageDetail = async ({
  params,
}: IBookParamsDetailType) => {
  const { id } = await params;

  const booksData = await getBooks();

  const book = booksData.find(
    (book: IBook) => String(book.bookId) === String(id)
  );

  console.log(book, "book");

  // Book not found
  if (!book) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-error">
            Book Not Found
          </h1>

          <p className="mt-3 text-base-content/60">
            Sorry, we could not find the book youre looking for.
          </p>

          <Link
            href="/"
            className="btn btn-success mt-6 text-white"
          >
            Go Back Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-14">

      {/* Back Button */}
      <Link
        href="/"
        className="btn btn-ghost mb-6 gap-2"
      >
        ← Back to Books
      </Link>

      {/* Main Card */}
      <section className="card overflow-hidden border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body p-5 md:p-8 lg:p-10">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[350px_1fr] lg:gap-14">

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-75">

                <div className="absolute inset-4 rounded-3xl bg-success/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-2xl bg-base-200 p-5 shadow-lg">
                  <Image
                    src={book.image}
                    alt={book.bookName}
                    width={300}
                    height={430}
                    className="mx-auto h-auto w-full rounded-xl object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">

              {/* Category + Rating */}
              <div className="flex flex-wrap items-center gap-3">

                <span className="badge badge-success px-4 py-3 text-white">
                  {book.category}
                </span>

                <div className="badge badge-warning gap-1 px-4 py-3">
                  ★ {book.rating}
                </div>

              </div>

              {/* Book Name */}
              <h1 className="mt-5 font-serif text-4xl font-bold leading-tight md:text-5xl">
                {book.bookName}
              </h1>

              {/* Author */}
              <p className="mt-3 text-lg text-base-content/60">
                Written by{" "}
                <span className="font-semibold text-base-content">
                  {book.author}
                </span>
              </p>

              <div className="divider" />

              {/* Information */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/50">
                    Pages
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {book.totalPages}
                  </p>
                </div>

                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/50">
                    Published
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {book.yearOfPublishing}
                  </p>
                </div>

                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/50">
                    Publisher
                  </p>

                  <p className="mt-1 truncate text-lg font-bold">
                    {book.publisher}
                  </p>
                </div>

                <div className="rounded-xl bg-base-200 p-4">
                  <p className="text-sm text-base-content/50">
                    Rating
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    ⭐ {book.rating}
                  </p>
                </div>

              </div>

              {/* Tags */}
              <div className="mt-6">

                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                  Tags
                </p>

                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-outline badge-success px-4 py-3"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <ReadButton book={book}/>

                <WishlistButton book={book}/>

              </div>

            </div>
          </div>

          {/* Review */}
          <div className="mt-12">

            <div className="divider">
              <span className="text-sm font-semibold uppercase tracking-wider text-base-content/50">
                About This Book
              </span>
            </div>

            <div className="rounded-2xl bg-base-200 p-6 md:p-8">
              <p className="text-base leading-8 text-base-content/70 md:text-lg">
                {book.review}
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
};

export default BookPageDetail;