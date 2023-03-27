import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { getAllAuthors } from "../utils/api/authors";

export default function Navbar(props) {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");

  const changeAuthorKey = (newAuthorKey) => {
    props.getAuthorKey(newAuthorKey);
  };

  useEffect(() => {
    getAllAuthors(search).then((data) => {
      setAuthors(data.docs);
    });
  }, [search]);

  return (
    <AppBar position="relative" sx={{ mb: "1rem" }}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Our Library
        </Typography>
        <Autocomplete
          freeSolo
          sx={{ minWidth: "320px" }}
          onChange={(event, newValue) => {
            if (newValue === null) {
              return;
            }
            changeAuthorKey(newValue.key);
          }}
          getOptionLabel={(option) => `${option.name} (${option.key})`}
          options={authors}
          renderOption={(props, option) => {
            return (
              <Box key={option.key} component="li" {...props}>
                {option.name} - {option.key}
              </Box>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                sx={{
                  label: {
                    color: "white",
                  },
                  input: {
                    color: "white",
                  },
                }}
                variant="outlined"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                label="search"
              />
            );
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
