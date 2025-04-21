interface InputProps {
  content: string;
  type: string;
  id: string;
  name: string;
}

const Input = ({ content, type, id, name }: InputProps) => {
  return (
    <div>
      <label htmlFor={name} className=" text-sm font-medium text-gray-700">
        {content}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
