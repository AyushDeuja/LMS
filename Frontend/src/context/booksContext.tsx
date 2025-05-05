import { createContext, useContext, useMemo, useState } from "react";

interface Book {
  title?: string;
  author?: string;
  id?: number;
  quantity?: number;
  availability?: boolean;
  book_img?: string;
}

interface BookContextValues {
  bookData: Book[];
}

const BookContext = createContext<BookContextValues>({
  bookData: [],
});

const BookProvider = ({ children }: { children: React.ReactElement }) => {
  const [Book, setBookData] = useState<Book[]>([]);

  const value = useMemo(() => ({ bookData }), [bookData]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

//Custom hook to use the BookContext
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
