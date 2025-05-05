import { createContext, useContext, useMemo, useState } from "react";

//BookContext for implementing dark mode and light mode
// context provider stores and manipulates the context data
type Book = "light" | "dark";

interface BookContextValues {
  bookData: Book[];
}

const BookContext = createContext<BookContextValues>({
  bookData: [],
});

const BookProvider = ({ children }: { children: React.ReactElement }) => {
  const [Book, setBook] = useState<Book>("light");
  const toggleBook = () => {
    setBook((prevBook) => (prevBook === "light" ? "dark" : "light"));
  };
  const value = useMemo(() => ({ Book, toggleBook }), [Book]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

//Custom hook to use the BookContext
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
