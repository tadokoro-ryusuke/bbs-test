import { HTMLInputTypeAttribute, memo } from "react";

type Props = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
};

export const Input = memo<Props>(({ type, placeholder, name }) => (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="text-xl w-7/12 p-3 border rounded"
    />
  ));
