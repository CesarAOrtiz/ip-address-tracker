import { FunctionComponent } from "react";

interface FormProps {
    value: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form: FunctionComponent<FormProps> = ({ value, onSubmit, onChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Enter IP Address"
                value={value}
                onChange={onChange}
            />
            <button type="submit">Track</button>
        </form>
    );
};

export default Form;
