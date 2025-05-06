import { PencilIcon, Trash2Icon } from "lucide-react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";
import { useMember } from "../context/membersContext";
import { useState } from "react";

type TransactionType = "borrow" | "return";

export interface Transaction {
  id: number;
  book_id: number;
  member_id: number;
  transaction_date: string;
  type: TransactionType;
}

const Transactions = () => {
  const navigate = useNavigate();
  const { memberData, onDelete } = useMember();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleDelete = async () => {
    if (selectedMemberId) {
      onDelete(selectedMemberId);
    }
    setIsModalOpen(false);
  };

  const openModal = (id: number) => {
    setSelectedMemberId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMemberId(null);
  };

  const selectedMember = memberData.find(
    (transaction) => transaction.id === selectedMemberId
  );

  return (
    <div>
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-center">Transactions</h1>
          <Button
            label="Add Member"
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
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {memberData.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={`bg-white hover:bg-indigo-100 transition-colors`}
                >
                  <td className="py-3 px-6 border-b border-gray-200 font-bold text-lg">
                    {transaction.book_id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 font-semibold">
                    {transaction.member_id}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {transaction.transaction_date}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {transaction.type}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <PencilIcon
                        className="text-blue-400 cursor-pointer"
                        onClick={() =>
                          navigate(`/edit-transaction/${transaction.id}`)
                        }
                      />
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
          content={`Are you sure you want to remove the transaction "${selectedMember?.name}"? This action cannot be undone.`}
          title={`Remove ${selectedMember?.name || "Member"}`}
          primaryButtonLabel="Remove"
        />
      </div>
    </div>
  );
};

export default Transactions;
