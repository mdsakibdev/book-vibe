import { IBook } from '@/types/books.type';
import Image from 'next/image';
import Link from 'next/link';

interface IBookCardProps {
    book:IBook
}

const BookCard = ({ book }: IBookCardProps) => {
    return (

        <div >
            {/* Books Grid */}
            <div
                key={book.bookId}
                className="
              group overflow-hidden
              rounded-2xl
              border border-gray-200
              bg-white
              shadow-sm
              transition-all duration-300
              hover:-translate-y-2
              hover:shadow-xl
            "
            >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                    <Image
                        src={book.image}
                        alt={book.bookName}
                        fill
                        className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-105
                "
                    />

                    {/* Category */}
                    <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-md backdrop-blur-sm">
                            {book.category}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        <span className="text-yellow-400">★</span>
                        {book.rating}
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                    {/* Book Name */}
                    <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
                        {book.bookName}
                    </h3>

                    {/* Author */}
                    <p className="mt-1 text-sm text-gray-500">
                        by{" "}
                        <span className="font-medium text-gray-700">
                            {book.author}
                        </span>
                    </p>

                    {/* Book Info */}
                    <div className="mt-5 flex items-center justify-between border-y border-gray-100 py-3 text-xs text-gray-500">
                        <div>
                            <p className="font-medium text-gray-400">Pages</p>
                            <p className="mt-1 font-semibold text-gray-700">
                                {book.totalPages}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-400">Published</p>
                            <p className="mt-1 font-semibold text-gray-700">
                                {book.yearOfPublishing}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-400">Publisher</p>
                            <p className="mt-1 max-w-20 truncate font-semibold text-gray-700">
                                {book.publisher}
                            </p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                            <span
                                key={tag}
                                className="
                      rounded-md
                      bg-green-50
                      px-2.5 py-1
                      text-xs
                      font-medium
                      text-green-700
                    "
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Button */}
                    <Link
                        href={`/books/${book.bookId}`}
                        className="
                  mt-5 flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-[#23BE0A]
                  px-4 py-3
                  text-sm font-semibold
                  text-white
                  shadow-sm
                  transition-all duration-300
                  hover:bg-[#1fa609]
                  hover:shadow-lg
                "
                    >
                        View Details
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;