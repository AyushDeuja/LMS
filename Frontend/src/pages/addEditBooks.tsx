import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { Book } from "./books";
import { Image, ArrowLeft } from "lucide-react";
import { useBook } from "../context/booksContext";
import { boolean, number, object, string } from "yup";

const bookSchema = object({
  title: string().required(),
  author: string().required(),
  quantity: number(),
  availability: boolean().required(),
});

const AddBooks = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book>();
  const [errorMessage, setErrorMessage] = useState("");
  const [base64IMG, setBase64IMG] = useState<string | ArrayBuffer | null>(null);
  const { updateBookData } = useBook();

  const { id } = useParams();

  const convertToBase64 = (selectedFile: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setBase64IMG(reader.result);
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formValues = Object.fromEntries(formData.entries());
    const parsedFormValues = {
      ...formValues,
      quantity: parseInt(formValues.quantity as string, 10),
      availability: formValues.availability === "on",
      book_img: base64IMG || bookData?.book_img, // Use the Base64 image or existing image
    };

    const url = id ? `/books/${id}` : "/books";

    try {
      // const values = await bookSchema.validate(formValues);
      // console.log(values);
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: parsedFormValues,
      });

      toast.success(`Book ${id ? "Updated" : "Added"} Successfully`);
      updateBookData(); // Update the book data in context
      navigate("/books");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again");
    }
  };

  const fetchBookFromId = async () => {
    if (!id) return; // Only fetch if an ID is present
    try {
      const response = await axiosInstance(`/books/${id}`);
      setBookData(response.data);
      setBase64IMG(response.data.book_img); // Set the existing image as Base64
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookFromId();
  }, [id]);

  const handleBookChange = (e: any) => {
    const { name, value, checked, type, files } = e.target;

    if (name === "book_img" && files && files[0]) {
      convertToBase64(files[0]); // Convert the selected file to Base64
    } else {
      setBookData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="bg-white shadow-lg rounded-lg p-5 w-[500px] max-h-[90vh] ">
        <h1
          className=" font-bold text-center mb-5 flex items-center cursor-pointer text-gray-700 "
          onClick={() => navigate("/books")}
        >
          <ArrowLeft />
          <span className="px-2">Back to books</span>
        </h1>
        <h1 className="text-2xl font-bold text-center  text-indigo-700">
          {id ? "Edit Book" : "Add New Book"}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              name="title"
              type="text"
              id="title"
              label="Title"
              value={bookData?.title || ""}
              onChange={handleBookChange}
            />
          </div>
          <div>
            <Input
              name="author"
              type="text"
              id="author"
              label="Author"
              value={bookData?.author || ""}
              onChange={handleBookChange}
            />
          </div>
          <div>
            <Input
              name="quantity"
              type="number"
              id="quantity"
              required={false}
              label="Quantity"
              value={bookData?.quantity || ""}
              onChange={handleBookChange}
            />
          </div>
          <div>
            <label
              htmlFor="book_img"
              className="block text-sm font-medium text-gray-700"
            >
              <Image className="inline-block mr-2 text-gray-500" />
              Book Image
            </label>
            <input
              type="file"
              id="book_img"
              name="book_img"
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              onChange={handleBookChange}
            />
            {(base64IMG || bookData?.book_img) && (
              <img
                src={(base64IMG as string) || bookData?.book_img}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-md mx-auto"
              />
            )}
          </div>
          {/* <div className="flex items-center">
            <label
              htmlFor="availability"
              className="text-gray-700 text-sm font-bold"
            >
              Availability:
            </label>
            <input
              type="checkbox"
              id="availability"
              name="availability"
              className="mx-3 w-5 h-5 accent-indigo-700"
              checked={bookData?.availability || false}
              onChange={handleBookChange}
            />
          </div> */}
          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Button
            label={id ? "Update Book" : "Add Book"}
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
