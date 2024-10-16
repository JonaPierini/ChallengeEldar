import { client } from "../../config/api/cliente";

export const addProduct = async (
  title: string,
  body: string,
  userId: number,
  id: string
) => {
  try {
    const response = await client.post("/posts", {
      title,
      body,
      userId,
      id,
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
