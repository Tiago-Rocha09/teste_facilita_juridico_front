import { Spinner } from "../spinner";

export const Button = ({ text, type = "button", isLoading, ...rest }) => {
  return (
    <button type={type} disabled={isLoading} {...rest}>
      {isLoading ? <Spinner /> : text}
    </button>
  );
};
