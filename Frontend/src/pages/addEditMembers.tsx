import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useMember } from "../context/membersContext";
import { Member } from "./members";

const AddEditMembers = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState<Member>();
  const [errorMessage, setErrorMessage] = useState("");
  const { updateMemberData } = useMember();

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const url = id ? `/members/${id}` : "/members";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: formValues,
      });

      toast.success(`Member ${id ? "Updated" : "Added"} Successfully`);
      await updateMemberData();
      navigate("/members");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again");
    }
  };

  const fetchMemberFromId = async () => {
    if (!id) return; // Only fetch if an ID is present
    try {
      const response = await axiosInstance(`/members/${id}`);
      setMemberData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemberFromId();
  }, [id]);

  const handleMemberChange = (e: any) => {
    const { name, value } = e.target;
    setMemberData((prevData) => ({
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
          {id ? "Edit Member" : "Add New Member"}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              name="name"
              type="text"
              id="name"
              label="name"
              value={memberData?.name || ""}
              onChange={handleMemberChange}
            />
          </div>
          <div>
            <Input
              name="address"
              type="text"
              id="address"
              label="address"
              value={memberData?.address || ""}
              onChange={handleMemberChange}
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              id="email"
              label="email"
              value={memberData?.email || ""}
              onChange={handleMemberChange}
            />
          </div>
          <div>
            <Input
              name="mobile"
              type="mobile"
              id="mobile"
              label="mobile"
              value={memberData?.mobile || ""}
              onChange={handleMemberChange}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Button
            label={id ? "Update Member" : "Add Member"}
            type="submit"
            className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded-md"
          />
        </form>
      </div>
    </div>
  );
};

export default AddEditMembers;
