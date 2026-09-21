"use client";

import { BookContext } from "@/context/BooksContext";
import { IBook } from "@/types/books.type";
import { useContext, useEffect, useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarShapeProps,
  LabelList,
  Label,
  LabelProps,
  Tooltip,
} from "recharts";

// --------------------------------------------------
// Colors
// --------------------------------------------------

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#FF6699",
  "#22C55E",
];

// --------------------------------------------------
// Custom Triangle Bar Path
// --------------------------------------------------

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  return `M${x},${y + height}
    C${x + width / 3},${y + height}
    ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}

    C${x + width / 2},${y + height / 3}
    ${x + (2 * width) / 3},${y + height}
    ${x + width},${y + height}

    Z`;
};

// --------------------------------------------------
// Custom Triangle Bar
// --------------------------------------------------

const TriangleBar = (props: BarShapeProps) => {
  const {
    x,
    y,
    width,
    height,
    index,
  } = props;

  const color =
    colors[(index ?? 0) % colors.length];

  return (
    <path
      strokeWidth={props.isActive ? 5 : 0}
      d={getPath(
        Number(x),
        Number(y),
        Number(width),
        Number(height)
      )}
      stroke={color}
      fill={color}
      style={{
        transition: "stroke-width 0.3s ease-out",
      }}
    />
  );
};

// --------------------------------------------------
// Custom Label
// --------------------------------------------------

const CustomColorLabel = (props: LabelProps) => {
  const fill =
    colors[(props.index ?? 0) % colors.length];

  return (
    <Label
      {...props}
      fill={fill}
      fontSize={12}
      fontWeight={600}
    />
  );
};

// --------------------------------------------------
// Main Component
// --------------------------------------------------

const ReadBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      "ReadBooks must be used inside BookProvider"
    );
  }

  const { readBook } = context;

  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // Get all books
  // --------------------------------------------------

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch("/booksData.json");

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: IBook[] = await res.json();

        setBooks(data);
      } catch (error) {
        console.error(
          "Failed to load books:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  // --------------------------------------------------
  // Convert readBook IDs → Full Book Objects
  // --------------------------------------------------

  const readBooks = useMemo(() => {
    return books.filter((book) =>
      readBook.includes(book.bookId)
    );
  }, [books, readBook]);

  // --------------------------------------------------
  // Prepare data for Recharts
  // --------------------------------------------------

  const chartData = useMemo(() => {
    return readBooks.map((book) => ({
      name:
        book.bookName.length > 16
          ? `${book.bookName.slice(0, 16)}...`
          : book.bookName,

      pages: book.totalPages,

      rating: book.rating,

      bookName: book.bookName,
    }));
  }, [readBooks]);

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const totalPages = useMemo(() => {
    return readBooks.reduce(
      (total, book) =>
        total + book.totalPages,
      0
    );
  }, [readBooks]);

  const averageRating = useMemo(() => {
    if (readBooks.length === 0) {
      return "0.0";
    }

    const totalRating = readBooks.reduce(
      (total, book) =>
        total + book.rating,
      0
    );

    return (
      totalRating / readBooks.length
    ).toFixed(1);
  }, [readBooks]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="flex min-h-100 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-success" />
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-base-200/40">
      <section className="container mx-auto px-4 py-8 md:py-12">

        {/* -------------------------------------------
            Header
        -------------------------------------------- */}

        <div className="mb-8">
          <span className="badge badge-success badge-outline mb-3 px-4 py-3">
            📖 Reading Analytics
          </span>

          <h1 className="text-3xl font-bold md:text-5xl">
            Your Reading{" "}
            <span className="text-success">
              Progress
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-base-content/60 md:text-base">
            Track your reading activity and explore
            how many pages you have completed.
          </p>
        </div>

        {/* -------------------------------------------
            Statistics
        -------------------------------------------- */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Books */}

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <p className="text-sm text-base-content/50">
              Books Read
            </p>

            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {readBooks.length}
              </h2>

              <span className="text-3xl">
                📚
              </span>
            </div>
          </div>

          {/* Pages */}

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <p className="text-sm text-base-content/50">
              Total Pages
            </p>

            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {totalPages.toLocaleString()}
              </h2>

              <span className="text-3xl">
                📄
              </span>
            </div>
          </div>

          {/* Rating */}

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
            <p className="text-sm text-base-content/50">
              Average Rating
            </p>

            <div className="mt-2 flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {averageRating}
              </h2>

              <span className="text-3xl">
                ⭐
              </span>
            </div>
          </div>

        </div>

        {/* -------------------------------------------
            Chart
        -------------------------------------------- */}

        {readBooks.length > 0 ? (

          <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">

            {/* Chart Header */}

            <div className="border-b border-base-300 px-5 py-5 md:px-7">

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl font-bold md:text-2xl">
                    Pages Per Book
                  </h2>

                  <p className="mt-1 text-sm text-base-content/50">
                    A visual overview of the pages
                    in your read books.
                  </p>
                </div>

                <span className="badge badge-success px-4 py-3">
                  {readBooks.length}{" "}
                  {readBooks.length === 1
                    ? "Book"
                    : "Books"}
                </span>

              </div>

            </div>

            {/* ---------------------------------------
                Recharts
            ---------------------------------------- */}

            <div className="w-full overflow-x-auto p-4 md:p-8">

              <BarChart
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  height: "500px",
                  margin: "0 auto",
                }}
                responsive
                data={chartData}
                margin={{
                  top: 35,
                  right: 20,
                  left: 10,
                  bottom: 60,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.25}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(99, 102, 241, 0.08)",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border:
                      "1px solid rgba(0,0,0,0.08)",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [
                    `${value} pages`,
                    "Pages",
                  ]}
                />

                <XAxis
                  dataKey="name"
                  angle={-20}
                  textAnchor="end"
                  height={80}
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  width="auto"
                  tickLine={false}
                  axisLine={false}
                />

                <Bar
                  dataKey="pages"
                  shape={TriangleBar}
                  activeBar
                >

                  <LabelList
                    content={CustomColorLabel}
                    position="top"
                  />

                </Bar>

              </BarChart>

            </div>

          </div>

        ) : (

          /* -----------------------------------------
             Empty State
          ------------------------------------------ */

          <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-100 px-6 text-center shadow-sm">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl">
              📖
            </div>

            <h2 className="text-2xl font-bold">
              No Read Books Yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-base-content/50">
              Once you mark a book as read,
              your reading statistics and chart
              will appear here.
            </p>

            {/* <a
              href="/"
              className="btn btn-success mt-6 px-6 text-white"
            >
              Explore Books →
            </a> */}

          </div>

        )}

      </section>
    </main>
  );
};

export default ReadBooks;