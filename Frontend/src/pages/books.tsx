import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

const Books = () => {
  const [data, setData] = useState([]);
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
    <div className="h-full w-full flex flex-col p-8">
      <h1 className="text-lg font-bold">Books</h1>
      <table>
        <thead>
          <th>Title</th>
          <th>Author</th>
        </thead>
      </table>
    </div>
  );
};

export default Books;
