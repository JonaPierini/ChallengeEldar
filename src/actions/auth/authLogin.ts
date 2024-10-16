import { auth } from "../../config/api/auth";

export const authLogin = async (username: string, password: string) => {
  try {
    const response = await auth.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
