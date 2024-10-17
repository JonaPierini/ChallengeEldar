import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";

interface ProductList {
  title: string;
  body?: string;
  userId?: number;
  id: number;
}

interface ProductItemProps {
  prod: ProductList;
  isEdit: boolean;
  selectedId: ProductList | undefined;
  changeText: string;
  user: string | undefined;
  setChangeText: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (id: number) => void;
  uuidv4: () => string;
  handleEdit: (id: number) => void;
}

export const ProductItem = ({
  prod,
  isEdit,
  selectedId,
  changeText,
  user,
  setChangeText,
  handleUpdate,
  uuidv4,
  handleEdit,
}: ProductItemProps) => {
  return (
    <Fragment key={prod.id}>
      {isEdit && selectedId?.id === prod.id ? (
        <Box>
          <TextField
            margin="dense"
            value={changeText}
            fullWidth
            onChange={(e) => setChangeText(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleUpdate(prod.id)}
          >
            Save
          </Button>
        </Box>
      ) : (
        <List key={uuidv4()} style={{ border: "2px solid gray" }}>
          <ListItem>
            <ListItemText primary={prod.title} secondary={prod.id} />
            <Button
              disabled={user === "emilys"}
              onClick={() => handleEdit(prod.id)}
            >
              Editar
            </Button>
          </ListItem>
        </List>
      )}
    </Fragment>
  );
};
