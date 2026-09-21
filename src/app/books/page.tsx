import BookCard from "@/components/shared/$RPDYY3G/shared/BookCard";
import { IBook } from "@/types/books.type";

const getBooks = async () => {
  try{
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booksData.json`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error)};
};

const Books = async () => {
  const booksData = await getBooks();

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      {/* Section Header */}
      <div className="mb-10 flex flex-col items-center text-center">
        <span className="mb-3 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-[#23BE0A]">
          Our Collection
        </span>

        <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
          Explore All <span className="text-[#23BE0A]">Books</span>
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Discover your next favorite book from our carefully selected
          collection of timeless classics and modern stories.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {booksData.map((book: IBook) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </section>
  );
};

export default Books;
