import Grid from "@mui/material/Grid2";
import { useAuthStore } from "../../../store/auth/useAuthStore";
import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";

interface FormInterface {
  username: string;
  password: string;
}

//userRol => username: emilys, password: emilyspass
//adminRol => "username": "michaelw", "password": "michaelwpass",

export const LoginPage = () => {
  const [formState, setFormState] = useState<FormInterface>({
    username: "",
    password: "",
  });
  const { login } = useAuthStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setFormState({ ...formState, username: e.target.value });
    } else {
      setFormState({ ...formState, password: e.target.value });
    }
  };

  const handleLogin = async () => {
    if (formState.username.length === 0 || formState.password.length === 0) {
      return;
    }
    if (formState.password.length < 4) return;
    const wasSuccessful = await login(formState.username, formState.password);
    if (!wasSuccessful) {
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: "Incorrect username or password. Please try again.",
        confirmButtonColor: "#DD6B55",
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundColor: "primary.main",
        padding: 4,
      }}
    >
      <Grid
        className="box-shadow"
        component="div"
        sx={{
          width: { sm: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Grid>
          <TextField
            onChange={handleInputChange}
            name="username"
            label="User"
            type="text"
            placeholder="User"
            fullWidth
          />
        </Grid>
        <Grid marginTop={3}>
          <TextField
            onChange={handleInputChange}
            name="password"
            label="Password"
            placeholder="password"
            fullWidth
          />
        </Grid>
        <Grid marginTop={3}>
          <Button onClick={handleLogin} variant="contained" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
