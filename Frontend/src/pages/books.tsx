import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

interface Book {
  title: string;
  author: string;
  id: number;
  quantity: number;
  availability: boolean;
  book_img: string;
}

const Books = () => {
  const [data, setData] = useState<Book[]>([]);
  const fetchBooks = async () => {
    try {
      const response = await axiosInstance(`/books`);
      console.log("Books:", response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="h-full w-full flex flex-col p-8 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Books
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Book Image</th>
              <th className="py-3 px-6 text-left">Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book) => (
              <tr
                key={book.id}
                className={`bg-white hover:bg-indigo-100 transition-colors`}
              >
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.title}
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.author}
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.quantity}
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  <img
                    src={book.book_img}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-6 border-b border-gray-200">
                  {book.availability ? "Available" : "Not Available"}
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
