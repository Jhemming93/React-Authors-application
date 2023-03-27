import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Fragment } from "react";

import { POPULAR_AUTHORS } from "../utils/constants/popular_authors";

export default function PopularAuthors(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Popular Authors
      </Typography>
      <List sx={{ width: "100%" }}>
        <Divider />
        {POPULAR_AUTHORS.map((author) => {
          return (
            <Fragment key={props.value}>
              <ListItem
                secondaryAction={
                  <Button
                    id="show"
                    value={props.value}
                    onClick={() => {
                      props.getAuthorKey(author.key);
                    }}
                  >
                    show
                  </Button>
                }
              >
                <ListItemText primary={author.name}></ListItemText>
              </ListItem>
              <Divider />
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
}
