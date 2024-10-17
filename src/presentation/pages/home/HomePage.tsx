import { useEffect, useState } from "react";
import { getProduct } from "../../../actions/getProduct/getProduct";
import { useAuthStore } from "../../../store/auth/useAuthStore";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./HomePage.css";
import { Spinner } from "../../components/ui/Spinner";
import { addProduct } from "../../../actions/addProduct/addProduct";
import Swal from "sweetalert2";
import { editProduct } from "../../../actions/editProduct/editProduct";
import { ProductItem } from "../../components/ui/ProductItem";

export const HomePage = () => {
  const { user } = useAuthStore();

  interface ProductList {
    title: string;
    body?: string;
    userId?: number;
    id: number;
  }
  const [productList, setListProduct] = useState<ProductList[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [selectedId, setSelectId] = useState<ProductList>();
  const [changeText, setChangeText] = useState<string>("");

  const getData = async () => {
    setLoading(true);
    const response = await getProduct();
    setListProduct(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
    setListProduct([...productList, newIdUser]);
    setAddTitle("");
  };

  const handleEdit = (id: number) => {
    const data = productList.find((e) => e.id === id);
    if (data && data.id) {
      setSelectId(data);
      setIsEdit((prev) => !prev);
    }
  };

  const handleUpdate = async (id: number) => {
    const updatedData = await editProduct(id, changeText, selectedId?.userId);
    if (updatedData) {
      const updatedList = productList.map((product) =>
        product.id === updatedData.id ? updatedData : product
      );
      setListProduct(updatedList);
      setIsEdit(false);
      setChangeText("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Change didn't save",
        confirmButtonColor: "#DD6B55",
      });
      setIsEdit(false);
      setChangeText("");
    }
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
        {productList?.map((prod) => (
          <ProductItem
            key={prod.id}
            prod={prod}
            isEdit={isEdit}
            selectedId={selectedId}
            changeText={changeText}
            user={user}
            setChangeText={setChangeText}
            handleUpdate={handleUpdate}
            uuidv4={uuidv4}
            handleEdit={handleEdit}
          ></ProductItem>
        ))}
      </Grid>
      <Box display={"flex"} justifyContent={"center"} margin={2}>
        <TextField
          disabled={user === "emilys"}
          placeholder="agregar"
          value={addTitle}
          onChange={(e) => setAddTitle(e.target.value)}
        />
        <Button
          disabled={user === "emilys"}
          variant="contained"
          onClick={handleAdd}
        >
          Agregar
        </Button>
      </Box>
    </Grid>
  );
};
