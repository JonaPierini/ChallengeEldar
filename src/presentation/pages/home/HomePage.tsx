import { useEffect, useState } from "react";
import { getProduct } from "../../../actions/getProduct/getProduct";
import { useAuthStore } from "../../../store/auth/useAuthStore";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import "./HomePage.css";
import { Spinner } from "../../components/ui/Spinner";
import { addProduct } from "../../../actions/addProduct/addProduct";

export const HomePage = () => {
  const { user } = useAuthStore();

  interface UserList {
    title: string;
    body?: string;
    userId?: number;
    id: number;
  }
  const [listUser, setListUser] = useState<UserList[]>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(10);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await getProduct();
    setListUser(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNextPage = () => {
    if (nextPage === listUser.length) return;
    setInitialPage(initialPage + 10);
    setNextPage(nextPage + 10);
  };

  const handlePrevPage = () => {
    if (initialPage !== 0 && nextPage > 10) {
      setInitialPage(initialPage - 10);
      setNextPage(nextPage - 10);
    }
  };

  const [addTitle, setAddTitle] = useState("");

  const handleAdd = async () => {
    const newProd = {
      title: addTitle,
      body: "",
      userId: 1,
      id: uuidv4(),
    };
    const response = await addProduct(
      newProd.title,
      newProd.body,
      newProd.userId,
      newProd.id + 1
    );
    const newIdUser = { ...response!.data, id: uuidv4() };
    if (addTitle === "") return;
    setListUser([newIdUser, ...listUser]);
    setAddTitle("");
  };

  //EDIT

  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectId] = useState<UserList>();
  const [changeText, setChangeText] = useState<string>();

  const handleEdit = (id: number) => {
    const data = listUser.find((e) => e.id === id);
    if (data && data.id) {
      setSelectId(data);
      setIsEdit((prev) => !prev);
    }
  };

  const handleUpdate = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: selectedId?.id,
        title: changeText,
        userId: selectedId?.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((updatedData) => {
        // Actualiza el usuario en listUser en lugar de agregar uno nuevo
        const updatedList = listUser.map((user) =>
          user.id === updatedData.id ? updatedData : user
        );
        setListUser(updatedList); // Actualiza la lista de usuarios
        setIsEdit(false); // Desactivar modo edición
        setChangeText(""); // Limpiar el input
      });
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Welcome {user}
      </Typography>
      <Grid className="parent">
        {listUser?.slice(initialPage, nextPage).map((u) => (
          <>
            {isEdit && selectedId?.id === u.id ? (
              <Box>
                <input onChange={(e) => setChangeText(e.target.value)} />
                <button onClick={() => handleUpdate(u.id)}>Save</button>
              </Box>
            ) : (
              <List
                key={uuidv4()}
                style={{ border: "2px solid gray", backgroundColor: "tomato" }}
              >
                <ListItem>
                  <ListItemText primary={u.title} secondary={u.id} />
                  <button onClick={() => handleEdit(u.id)}>Editar</button>
                </ListItem>
              </List>
            )}
          </>
        ))}
      </Grid>
      <Box>
        <input
          placeholder="agregar"
          value={addTitle}
          onChange={(e) => setAddTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Agregar</button>
      </Box>
    </Grid>
  );
};
