import { FunctionComponent } from "react";
import RightArrow from "../RightArrow";

interface FormProps {
  value: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: FunctionComponent<FormProps> = ({ value, onSubmit, onChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center justify-self-center w-[80%]"
    >
      <input
        type="text"
        placeholder="Search for IP Address"
        value={value}
        onChange={onChange}
        className="py-1 px-4 rounded-l-lg focus:outline-none focus:shadow-outline max-w-[350px] w-full"
      />
      <button
        type="submit"
        className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-r-lg focus:outline-none focus:shadow-outline"
      >
        <RightArrow />
      </button>
    </form>
  );
};

export default Form;
