import { Container } from "../container";
import styles from "./styles.module.scss";

export const Modal = ({ children, ...rest }) => {
  return (
    <section className={styles.modal} {...rest}>
      <Container>{children}</Container>
    </section>
  );
};
