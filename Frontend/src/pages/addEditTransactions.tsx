import { FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useBook } from "../context/booksContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useMember } from "../context/membersContext";

type TRANSACTION_TYPE = "return" | "borrow";

export interface Transaction {
  id?: number;
  book_id?: number;
  member_id?: number;
  transaction_date?: string;
  type?: TRANSACTION_TYPE;
}

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [errorMessage, setErrorMessage] = useState("");
  const { bookData } = useBook();
  const { memberData } = useMember();

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
          transaction_date: new Date(parsedFormValues.transaction_date),
        },
      });

      toast.success("Transaction Added Successfully");
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
      const formattedDate = response.data.transaction_date
        ? new Date(response.data.transaction_date).toLocaleDateString()
        : "";
      setTransactionData({ ...response.data, transaction_date: formattedDate });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransactionFromId();
    }
  }, [id]);

  const handleTransactionDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          onClick={() => navigate("/transactions")}
        >
          <ArrowLeft />
          <span className="px-2">Back to Transactions</span>
        </h1>
        <h1 className="text-2xl font-bold text-center  text-indigo-700">
          {id ? "Edit Transaction" : "Add New Transaction"}
        </h1>
        <p className="text-gray-400 p-2 text-center">
          Enter the details of the transaction you want to add to your
          collection.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="book"
              className="block text-lg font-bold text-gray-700"
            >
              Book
            </label>
            <select
              id="book"
              name="book_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
              value={transactionData?.book_id || ""}
            >
              <option value="" disabled>
                Select a Book
              </option>
              {bookData.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="member"
              className="block text-lg font-bold text-gray-700"
            >
              Member
            </label>
            <select
              id="member"
              name="member_id"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
              value={transactionData?.member_id || ""}
            >
              <option value="" disabled>
                Select a Member
              </option>
              {memberData.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-lg font-bold text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              onChange={handleTransactionDataChange}
              value={transactionData?.type || ""}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="borrow">Borrow</option>
              <option value="return">Return</option>
            </select>
          </div>
          <div>
            <Input
              name="transaction_date"
              type="date"
              id="date"
              label="Date"
              value={transactionData?.transaction_date || ""}
              onChange={handleTransactionDataChange}
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
