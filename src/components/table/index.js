import { phoneMask } from "@/utils/functions";
import styles from "./styles.module.scss";

export const Table = ({ customers, showOrder }) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            {showOrder ? <th>Ordem</th> : null}
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenadas</th>
          </tr>
        </thead>
        <tbody>
          
          {customers?.length ? customers?.map((item, index) => (
            <tr key={index}>
              {showOrder ? <td>{index + 1}º</td> : null}
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{phoneMask(item.phone)}</td>
              <td>{item.coordinates}</td>
            </tr>
            )) : 
            <tr>
              <td colspan={showOrder ? 5 : 4} className={styles.empty}>Nenhum registro encontrado</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
};
