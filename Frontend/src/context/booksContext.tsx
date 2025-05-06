import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

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
  onDelete: (id: number) => void;
  updateBookData: () => void;
}

const BookContext = createContext<BookContextValues>({
  bookData: [],
  onDelete: () => {},
  updateBookData: () => {},
});

const BookProvider = ({ children }: { children: React.ReactElement }) => {
  const [bookData, setBookData] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      setBookData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBookData = async () => {
    await fetchBooks();
  };

  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      const newData = [...bookData].filter((book) => book.id !== id);
      setBookData(newData);
      toast.success(`Book Deleted Successfully!`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to delete book, please try again."
      );
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const value = useMemo(
    () => ({ bookData, onDelete, updateBookData }),
    [bookData]
  );
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

//Custom hook to use the BookContext
const useBook = () => {
  const context = useContext(BookContext);
  return context;
};
export { useBook, BookProvider };
