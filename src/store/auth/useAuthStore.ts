import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authLogin } from "../../actions/auth/authLogin";

export interface AuthState {
  status: boolean;
  token?: string;
  user?: string;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      status: false,
      token: undefined,
      user: undefined,

      login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) {
          set({ status: false, token: undefined, user: undefined });
          return false;
        }
        set({ status: true, token: resp.accessToken, user: resp.firstName });
        return true;
      },

      logout: async () => {
        set({ status: false, token: undefined, user: undefined });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
