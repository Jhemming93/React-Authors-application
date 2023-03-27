import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BookCard from "../components/BookCard";

import { useState, useEffect } from "react";

import { getAuthorWorks, getAuthor } from "../utils/api/authors";

export default function AuthorInfo(props) {
  const [authorInfo, setAuthorInfo] = useState([]);
  const [death, setDeath] = useState("");
  const [birth, setBirth] = useState("");
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    getAuthorWorks(props.authorKey).then((data) => {
      setBookData(data.entries);
    });
    getAuthor(props.authorKey).then((data) => {
      setAuthorInfo(data);
      setDeath(data.death_date);
      if (data.death_date === undefined || data.death_date === null) {
        setDeath("Not today Satan");
      }
      setBirth(data.birth_date);
      if (data.birth_date === undefined || data.birth_date === null) {
        setBirth("Undefined");
      }
    });
  }, [props.authorKey]);

  return (
    <Box>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {authorInfo.name}
      </Typography>
      <Typography align="center" color="text.primary" paragraph>
        {birth} - {death}
      </Typography>
      <BookCard books={bookData} />
    </Box>
  );
}
