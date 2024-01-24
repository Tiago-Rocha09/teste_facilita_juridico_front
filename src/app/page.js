"use client";
import { Container } from "@/components/container";
import styles from "../assets/styles/page.module.scss";
import { useCallback, useEffect, useState } from "react";
import { customerServices } from "@/services/customers";
import { useForm } from "react-hook-form";
import { debounce, getOnlyNumbers, phoneMask } from "@/utils/functions";
import { Modal } from "@/components/modal";
import { Table } from "@/components/table";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const { getCustomers, createCustomer, getBestRoute } = customerServices;
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
    control,
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalDistance, setTotalDistance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [route, setRoute] = useState([]);

  function handleClear() {
    reset({
      name: "",
      email: "",
      phone: "",
      coordinateX: "",
      coordinateY: "",
    });
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const response = await createCustomer(data);
      setIsLoading(false);
      if (response.status === 200) {
        handleClear();
        getListCustomers();
        return toast.success("Cliente cadastrado");
      }
      if (response?.data?.errors) {
        toast.error(response?.data?.errors.join(", "));
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar");
    }
  }

  async function handleShowBestRoute() {
    try {
      const response = await getBestRoute({ searchTerm });
      const data = response.data?.customers?.map((item) => ({
        name: item.name,
        email: item.email,
        phone: item.phone,
        coordinates: `(${item.coordinateX}, ${item.coordinateY})`,
      }));
      setRoute(data);
      setTotalDistance(
        response.data?.totalDistance
          ? Number(response.data?.totalDistance).toFixed(2)
          : null
      );
      setModalOpen(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao buscar a melhor rota");
    }
  }

  const getListCustomers = useCallback(
    async (searchTerm) => {
      setSearchTerm(searchTerm);
      try {
        const response = await getCustomers({ searchTerm });
        const data = response.data?.map((item) => ({
          name: item.name,
          email: item.email,
          phone: item.phone,
          coordinates: `(${item.coordinateX}, ${item.coordinateY})`,
        }));
        setCustomers(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Ocorreu um erro ao buscar a buscar os clientes");
      }
    },
    [getCustomers]
  );

  const handlePhoneChange = (event) => {
    const input = event.target;
    const inputValue = input.value;
    const maskedValue = phoneMask(inputValue);
    setValue("phone", maskedValue);
    if (inputValue.length >= 15) {
      trigger("phone");
    }
  };

  const handleSearch = debounce((searchTerm) => {
    getListCustomers(searchTerm);
  }, 300);

  const handleChange = (event) => {
    const value = event.target.value;
    handleSearch(value);
  };

  useEffect(() => {
    getListCustomers();
  }, []);

  return (
    <main className={styles.main}>
      <Container>
        <h2>Cadastro de clientes</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome completo"
            error={errors.name}
            name="name"
            control={control}
            rules={{
              required: "O nome completo é obrigatório",
            }}
          />

          <Input
            label="E-mail"
            error={errors.email}
            control={control}
            name="email"
            rules={{
              required: "Email inválido",
              pattern: {
                value: /^([a-z\d\-_\.]+)@([a-z\d\-_\.]+\.[a-z]{2,})$/i,
                message: "Email inválido",
              },
            }}
          />

          <Input
            label="Telefone"
            error={errors.phone}
            control={control}
            name="phone"
            rules={{
              required: "Número de telefone válido é obrigatório.",
              validate: (value) => {
                const phoneValue = getOnlyNumbers(value);
                return (
                  phoneValue.length === 11 ||
                  phoneValue.length === 0 ||
                  "Número de telefone inválido"
                );
              },
            }}
            maxLength={15}
            onChange={handlePhoneChange}
          />
          <Input
            label="Coordenada X"
            error={errors.coordinateX}
            control={control}
            name="coordinateX"
            rules={{
              required: "Coordenada X inválida.",
            }}
            type="number"
          />

          <Input
            label="Coordenada Y"
            error={errors.coordinateY}
            control={control}
            name="coordinateY"
            rules={{
              required: "Coordenada Y inválida.",
            }}
            type="number"
          />

          <div>
            <Button
              isLoading={isLoading}
              onClick={handleClear}
              text="Limpar"
              className={styles.secondary}
            />
            <Button isLoading={isLoading} text="Salvar" type="submit" />
          </div>
        </form>
      </Container>
      <Container>
        <div className={styles.sectionHeader}>
          <div className={styles.titleContainer}>
            <h2>Listagem de clientes</h2>

            <Button
              isLoading={isLoading}
              onClick={handleShowBestRoute}
              text="Exibir melhor rota"
              className={styles.secondary}
            />
          </div>
          <input
            placeholder="Pesquise por nome, telefone ou email..."
            onChange={handleChange}
          />
        </div>
        <Table customers={customers} />
      </Container>
      {modalOpen ? (
        <Modal>
          <div className={styles.sectionHeader}>
            <div className={styles.titleContainer}>
              <h2>Listagem de clientes</h2>
              <h2>Distância total: {totalDistance}</h2>
              <span
                className={styles.closeIcon}
                onClick={() => setModalOpen(false)}
              >
                X
              </span>
            </div>
            <Table customers={route} showOrder={true} />
          </div>
        </Modal>
      ) : null}
      <ToastContainer />
    </main>
  );
}
