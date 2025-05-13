import { PencilIcon, Trash2Icon } from "lucide-react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";
import { useMember } from "../context/membersContext";
import { useEffect, useState } from "react";
import Input from "../components/Input";

export interface Member {
  name?: string;
  address?: string;
  email?: string;
  mobile?: string;
  id?: number;
}

const Members = () => {
  const navigate = useNavigate();
  const { memberData, onDelete } = useMember();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(memberData);

  useEffect(() => {
    setFilteredMembers(memberData);
  }, [memberData]);

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
    (member) => member.id === selectedMemberId
  );

  const handleSearch = () => {
    const filtered = memberData.filter((member) => {
      return member.name?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredMembers(filtered);
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-center">Members</h1>
          <div className="flex items-center ">
            <Input
              type="text"
              placeholder="Search by name"
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
            label="Add Member"
            type="button"
            className="p-4"
            onClick={() => navigate("/add-member")}
          />
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          {filteredMembers.length > 0 ? (
            <table className="w-full border-collapse bg-white shadow-xl rounded-lg">
              <thead className="sticky top-0 bg-gradient-to-l from-indigo-700 to-purple-600 text-white z-10">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Mobile</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className={`bg-white hover:bg-indigo-100 transition-colors`}
                  >
                    <td className="py-3 px-6 border-b border-gray-200 font-bold text-lg">
                      {member.name}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 font-semibold">
                      {member.address}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {member.email}
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200">
                      {member.mobile}
                    </td>

                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <PencilIcon
                          className="text-blue-400 cursor-pointer"
                          onClick={() => navigate(`/edit-member/${member.id}`)}
                        />
                        <Trash2Icon
                          className="text-red-400 cursor-pointer"
                          onClick={() => openModal(member.id as number)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-[70vh]">
              <p className="text-red-500 text-5xl font-bold">
                Member Not Found.
              </p>
            </div>
          )}
        </div>
        <Modal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          content={`Are you sure you want to remove the member "${selectedMember?.name}"? This action cannot be undone.`}
          title={`Remove ${selectedMember?.name || "Member"}`}
          primaryButtonLabel="Remove"
        />
      </div>
    </div>
  );
};

export default Members;
