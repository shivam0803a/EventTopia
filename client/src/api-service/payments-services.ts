import axios from "axios";

export const getClientSecret = async (amount: number) => {
  const response = await axios.post("/api/payment/client-payment-intent", {
    amount,
  });
  return response.data;
};
