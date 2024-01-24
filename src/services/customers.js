import { api } from "./api";

export const customerServices = {
  getCustomers: async (params) => {
    const response = await api
      .get("/customers/", {
        params: params,
      })
      .then(({ ...response }) => {
        return response;
      })
      .catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  getBestRoute: async (params) => {
    const response = await api
      .get("/customers/best-route", {
        params: params,
      })
      .then(({ ...response }) => {
        return response;
      })
      .catch(({ ...response }) => {
        return response;
      });
    return response;
  },
  createCustomer: async (body) => {
    const response = await api
      .post("/customers", body)
      .then(({ ...response }) => {
        return response;
      })
      .catch(({ response }) => {
        return response;
      });
    return response;
  },
};
