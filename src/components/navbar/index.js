import { Container } from "../container";
import Logo from "@/assets/images/logo.webp";
import Image from "next/image";
import styles from "./styles.module.scss";

export const Navbar = () => {
  return (
    <Container>
      <navbar>
        <ul className={styles.ul}>
          <li>
            <Image src={Logo} alt="Logo da empresa" width={190} height={54} />
          </li>
        </ul>
      </navbar>
    </Container>
  );
};
