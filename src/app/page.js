import { Container } from "@/components/container";
import styles from "../assets/styles/page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <h2>Cadastro de clientes</h2>
        <form className={styles.form}>
          <fieldset>
            <label>Nome completo</label>
            <input />
          </fieldset>

          <fieldset>
            <label>E-mail</label>
            <input />
          </fieldset>

          <fieldset>
            <label>Telefone</label>
            <input />
          </fieldset>

          <fieldset>
            <label>Coordenada X</label>
            <input />
          </fieldset>

          <fieldset>
            <label>Coordenada Y</label>
            <input />
          </fieldset>
          <div>
            <button className={styles.secondary}>Limpar</button>
            <button>Salvar</button>
          </div>
        </form>
      </Container>
      <Container>
        <div className={styles.sectionHeader}>
          <h2>Listagem de clientes</h2>
          <input placeholder="Pesquise por nome, telefone ou email..." />
        </div>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Coordenadas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiago Rocha</td>
                <td>tiagoarrocha@gmail.com</td>
                <td>(94) 99262-8331</td>
                <td>(1,6)</td>
              </tr>
              <tr>
                <td>Tiago Rocha</td>
                <td>tiagoarrocha@gmail.com</td>
                <td>(94) 99262-8331</td>
                <td>(1,6)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </main>
  );
}
