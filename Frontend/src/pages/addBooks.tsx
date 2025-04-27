import { FormEvent } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

const AddBooks = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);

    try {
      const response = await axiosInstance(`/books`, {
        method: "POST",
        data: {
          ...parsedFormValues,
          quantity: parseInt(parsedFormValues?.quantity, 10),
          availability: (parsedFormValues?.availability, false),
        },
      });
      console.log(response.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Add Books</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          id="title"
          label="Title"
          required={true}
        />
        <Input
          name="author"
          type="text"
          id="author"
          label="Author"
          required={true}
        />
        <Input name="quantity" type="number" id="quantity" label="Quantity" />
        <Input name="book_img" type="text" id="book_img" label="Book Image" />
        <div className="flex items-center ">
          <label
            htmlFor="availability"
            className=" text-gray-700 text-sm font-bold "
          >
            Availability:
          </label>
          <input type="checkbox" className="mx-3 size-5" />
        </div>
        <Button label="Add Book" type="submit" className="bg-blue-600" />
      </form>
    </div>
  );
};

export default AddBooks;
