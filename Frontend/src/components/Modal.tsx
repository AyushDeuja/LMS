import Button from "./Button";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: string;
  title: string;
}

export default function Modal({
  isModalOpen,
  onClose,
  onConfirm,
  content,
  title,
}: ModalProps) {
  return (
    <div
      className={`w-screen h-screen bg-[#00000079] flex justify-center items-center absolute inset-0 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-[600px] h-[200px] bg-white rounded p-4 flex flex-col justify-between">
        <div className="text w-full">
          <div className="flex flex-col gap-4 text-black">
            <h1 className="text-lg font-bold">{title}</h1>
            <p>{content}</p>
          </div>
        </div>
        <div className="button w-full flex justify-end items-center gap-4">
          <Button
            className="w-fit px-2 bg-none bg-white !text-black border"
            type="button"
            label="Cancel"
            onClick={onClose}
          />
          <Button
            className="w-fit px-2 bg-none bg-red-500"
            type="button"
            label="Delete"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
