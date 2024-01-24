import styles from "./styles.module.scss";

export const Container = ({ children, ...rest }) => {
  return (
    <section className={styles.container} {...rest}>
      {children}
    </section>
  );
};
