import { client } from "../../config/api/cliente";

export const editProduct = async (
  id: number,
  title: string,
  userId: number
) => {
  try {
    const response = await client.put(`/posts${id}`, {
      title,
      userId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};