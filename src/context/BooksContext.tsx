"use client";

import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface IBookContext {
  readBook: number[];
  setReadBook: Dispatch<SetStateAction<number[]>>;

  wishList: number[];
  setWishList: Dispatch<SetStateAction<number[]>>;
}

interface IBookProviderProps {
  children: ReactNode;
}

export const BookContext = createContext<IBookContext | null>(null);

const BookProvider = ({ children }: IBookProviderProps) => {
  const [readBook, setReadBook] = useState<number[]>([]);
  const [wishList, setWishList] = useState<number[]>([]);

  return (
    <BookContext.Provider
      value={{
        readBook,
        setReadBook,
        wishList,
        setWishList,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;