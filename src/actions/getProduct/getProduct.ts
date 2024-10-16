import { client } from "../../config/api/cliente";

export const getProduct = async () => {
  try {
    const response = await client.get("/posts");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
