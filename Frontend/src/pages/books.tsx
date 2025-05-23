import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Modal from "../components/Modal";
import { useBook } from "../context/booksContext";
import Input from "../components/Input";

export interface Book {
  title?: string;
  author?: string;
  id?: number;
  quantity?: number;
  availability?: boolean;
  book_img?: string;
}

const Books = () => {
  const { bookData, onDelete } = useBook();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(bookData);

  useEffect(() => {
    // Update filteredBooks whenever bookData changes
    setFilteredBooks(bookData);
  }, [bookData]);

  const handleDelete = async () => {
    if (selectedBookId) {
      onDelete(selectedBookId);
    }
    setIsModalOpen(false);
  };

  const openModal = (id: number) => {
    setSelectedBookId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };
  const selectedBook = bookData.find((book) => book.id === selectedBookId);

  const handleSearch = () => {
    const filtered = bookData.filter((book) => {
      return (
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-center">Books</h1>
        <div className="flex items-center ">
          <Input
            type="text"
            placeholder="Search by title or author"
            className="w-64 rounded-r-none"
            required={false}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button
            label="Search"
            type="button"
            className="rounded-l-none ml-0 !w-20"
            onClick={handleSearch}
          />
        </div>
        <Button
          label="Add Book"
          type="button"
          className="p-4"
          onClick={() => navigate("/add-book")}
        />
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {filteredBooks.length > 0 ? (
          <table className="w-full border-collapse bg-white shadow-xl rounded-lg">
            <thead className="sticky top-0 bg-gradient-to-l from-indigo-700 to-purple-600 text-white z-10">
              <tr>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Author</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Book Image</th>
                <th className="py-3 px-6 text-left">Availability</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
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
                    {book.availability === true ? (
                      <p className="text-green-600">Available</p>
                    ) : (
                      <p className="text-red-600">Not Available</p>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <PencilIcon
                        className="text-blue-400 cursor-pointer"
                        onClick={() => navigate(`/edit-book/${book.id}`)}
                      />
                      <Trash2Icon
                        className="text-red-400 cursor-pointer"
                        onClick={() => openModal(book.id as number)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-[70vh]">
            <p className="text-red-500 text-5xl font-bold">Book Not Found.</p>
          </div>
        )}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        content={`Are you sure you want to delete the book "${selectedBook?.title}"? This action cannot be undone.`}
        title={`Delete ${selectedBook?.title || "Book"}`}
      />
    </div>
  );
};

export default Books;
