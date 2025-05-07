import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Trash2Icon } from "lucide-react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useBook } from "../context/booksContext";
import { useMember } from "../context/membersContext";

type TRANSACTION_TYPE = "return" | "borrow";

interface Transaction {
  id: number;
  book_id: number;
  member_id: number;
  transaction_date: string;
  type: TRANSACTION_TYPE;
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const { bookData } = useBook();
  const { memberData } = useMember();

  const navigate = useNavigate();

  const fetchTransaction = async () => {
    try {
      const response = await axiosInstance(`/transactions`);
      console.log(response.data);
      setTransactionData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleDelete = async () => {
    if (selectedTransactionId) {
      try {
        await axiosInstance(`/transactions/${selectedTransactionId}`, {
          method: "DELETE",
        });
        setTransactionData((prev) =>
          prev.filter((transaction) => transaction.id !== selectedTransactionId)
        );
        toast.success("Transaction deleted successfully");
      } catch (error) {
        toast.error("Failed to delete transaction");
      }
    }
    setIsModalOpen(false);
  };

  const openModal = (id: number) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  const renderBookTitle = (book_id: number) => {
    const book = bookData.find((book) => book.id === book_id);
    return book ? book.title : "Unknown Book";
  };
  const renderMemberName = (member_id: number) => {
    const member = memberData.find((member) => member.id === member_id);
    return member ? member.name : "Unknown Member";
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-center">Transactions</h1>
          <Button
            label="Add Transaction"
            type="button"
            className="p-4"
            onClick={() => navigate("/add-transaction")}
          />
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full border-collapse bg-white shadow-xl rounded-lg">
            <thead className="sticky top-0 bg-gradient-to-l from-indigo-700 to-purple-600 text-white z-10">
              <tr>
                <th className="py-3 px-6 text-left">Book</th>
                <th className="py-3 px-6 text-left">Member</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`bg-white hover:bg-indigo-100 transition-colors`}
                >
                  <td className="py-3 px-6 border-b border-gray-200 font-bold text-lg">
                    {renderBookTitle(transaction.book_id)}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 font-semibold">
                    {renderMemberName(transaction.member_id)}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {transaction.type}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <Trash2Icon
                        className="text-red-400 cursor-pointer"
                        onClick={() => openModal(transaction.id as number)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          content={`Are you sure you want to remove this transaction? This action cannot be undone.`}
          title={`Remove Transaction`}
          primaryButtonLabel="Remove"
        />
      </div>
    </div>
  );
}
