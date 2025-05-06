import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useBook } from "../context/booksContext";
import Input from "../components/Input";
import { Transaction } from "./transactions";

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [errorMessage, setErrorMessage] = useState("");
  const { bookData } = useBook();

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);
    const url = id ? `/transactions/${id}` : "/transactions";

    console.log(parsedFormValues);

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          book_id: parseInt(parsedFormValues.book_id, 10),
          member_id: parseInt(parsedFormValues.member_id, 10),
        },
      });

      toast.success("Transaction Added Successfully");
      // updateTransaction(parsedFormValues);
      navigate("/transactions");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again");
    }
  };

  const fetchTransactionFromId = async () => {
    try {
      const response = await axiosInstance(`/transactions/${id}`);
      setTransactionData({ ...response.data, availability: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionFromId();
  }, [id]);

  const handleTransactionDataChange = (e: any) => {
    const { name, value } = e.target;

    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center h-[90vh] items-center">
      <div className="bg-white shadow-lg rounded-lg p-5 w-[500px] max-h-[90vh] ">
        <h1
          className=" font-bold text-center mb-5 flex items-center cursor-pointer text-gray-700 "
          onClick={() => navigate("/members")}
        >
          <ArrowLeft />
          <span className="px-2">Back to members</span>
        </h1>
        <h1 className="text-2xl font-bold text-center  text-indigo-700">
          {id ? "Edit Transaction" : "Add New Transaction"}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              name="name"
              type="text"
              id="name"
              label="Name"
              value={transactionData?.name || ""}
              onChange={handleTransactionChange}
            />
          </div>
          <div>
            <Input
              name="address"
              type="text"
              id="address"
              label="Address"
              value={transactionData?.address || ""}
              onChange={handleTransactionChange}
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              id="email"
              label="Email"
              value={transactionData?.email || ""}
              onChange={handleTransactionChange}
            />
          </div>
          <div>
            <Input
              name="mobile"
              type="tel"
              id="mobile"
              label="Mobile"
              value={transactionData?.mobile || ""}
              onChange={handleTransactionChange}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Button
            label={id ? "Update Transaction" : "Add Transaction"}
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
