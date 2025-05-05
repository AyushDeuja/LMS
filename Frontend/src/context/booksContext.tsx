import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

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
  const [bookData, setBookData] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      console.log(response.data);
      setBookData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const value = useMemo(() => ({ bookData }), [bookData]);
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

//Custom hook to use the BookContext
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
