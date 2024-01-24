import { useController } from "react-hook-form";
import styles from "./styles.module.scss";

export const Input = ({ label, error, name, control, rules, ...rest }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });

  return (
    <fieldset className={error ? styles.validationError : ""}>
      {label ? <label>{label}</label> : null}
      <input className={styles.input} {...field} {...rest} />
      {error ? <small>{error.message}</small> : null}
    </fieldset>
  );
};
