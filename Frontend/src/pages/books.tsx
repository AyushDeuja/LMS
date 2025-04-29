import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import Button from "../components/Button";
import { useNavigate } from "react-router";

interface Book {
  title: string;
  author: string;
  id: number;
  quantity: number;
  availability: boolean;
  book_img: string;
}

const Books = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      setBookData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-center">Books</h1>
        <Button
          label="Add Books"
          type="button"
          className="p-4"
          onClick={() => navigate("/add-books")}
        />
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead className="sticky top-0 bg-indigo-600 text-white z-10">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Book Image</th>
              <th className="py-3 px-6 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((book) => (
              <tr
                key={book.id}
                className={`bg-white hover:bg-indigo-100 transition-colors`}
              >
                <td className="py-3 px-6 border-b border-gray-200 font-bold text-lg">
                  {book.title}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 font-semibold">
                  {book.author}
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.quantity}
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.book_img ? (
                    <img
                      src={book.book_img}
                      alt={book.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 font-semibold">
                  {book.availability ? (
                    <p className="text-green-600">Available</p>
                  ) : (
                    <p className="text-red-600">Not Available</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
