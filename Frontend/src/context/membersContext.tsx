import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";

interface Member {
  name?: string;
  address?: string;
  email?: string;
  mobile?: string;
  id?: number;
}

interface MemberContextValues {
  memberData: Member[];
  onDelete: (id: number) => void;
  updateMemberData: () => void;
}

const MemberContext = createContext<MemberContextValues>({
  memberData: [],
  onDelete: () => {},
  updateMemberData: () => {},
});

const MemberProvider = ({ children }: { children: React.ReactElement }) => {
  const [memberData, setMemberData] = useState<Member[]>([]);

  const fetchMembers = async () => {
    try {
      const response = await axiosInstance(`/members`);
      setMemberData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMemberData = async () => {
    await fetchMembers();
  };

  const onDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/members/${id}`);
      const newData = [...memberData].filter((member) => member.id !== id);
      setMemberData(newData);
      toast.success(`Member Removed Successfully!`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed to remove Member, please try again."
      );
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const value = useMemo(
    () => ({ memberData, onDelete, updateMemberData }),
    [memberData]
  );
  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
};

//Custom hook to use the MemberContext
const useMember = () => {
  const context = useContext(MemberContext);
  return context;
};
export { useMember, MemberProvider };
