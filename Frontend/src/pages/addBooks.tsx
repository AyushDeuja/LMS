import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { Book } from "./books";

const AddBooks = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book>();
  const [errorMessage, setErrorMessage] = useState("");
  const [base64IMG, setBase64IMG] = useState<string | ArrayBuffer | null>(null);

  const { id } = useParams();

  const convertToBase64 = (selectedFile: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      console.log(reader.result);
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
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: parsedFormValues,
      });

      toast.success(`Book ${id ? "Updated" : "Added"} Successfully`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate("/books");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchBookFromId = async () => {
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
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-center">
          {id ? "Edit Book" : "Add New Book"}
        </h1>
        <Button
          label="Back"
          type="button"
          className="bg-blue-600 p-4"
          onClick={() => navigate("/books")}
        />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          id="title"
          label="Title"
          value={bookData?.title}
          onChange={handleBookChange}
        />
        <Input
          name="author"
          type="text"
          id="author"
          label="Author"
          value={bookData?.author}
          onChange={handleBookChange}
        />
        <Input
          name="quantity"
          type="number"
          id="quantity"
          label="Quantity"
          value={bookData?.quantity}
          onChange={handleBookChange}
        />
        <div>
          <label
            htmlFor="book_img"
            className="block text-sm font-medium text-gray-700"
          >
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
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex items-center">
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
            className="mx-3 w-5 h-5"
            checked={bookData?.availability || false}
            onChange={handleBookChange}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-lg text-center">{errorMessage}</p>
        )}
        <Button label={id ? "Update Book" : "Add Book"} type="submit" />
      </form>
    </div>
  );
};

export default AddBooks;
