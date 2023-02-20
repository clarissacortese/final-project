import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

// pages & components
import useBooksContext from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function BookForm() {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState([]);
  const [rating, setRating] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const genreList = [
    "Fantasy",
    "Science fiction",
    "Mystery",
    "Fiction",
    "Non-fiction",
    "Horror",
    "Thriller",
    "Historical fiction",
    "Romance",
  ];

  const handleCheck = (event) => {
    var updatedList = [...genre];
    if (event.target.checked) {
      updatedList = [...genre, event.target.value];
    } else {
      updatedList.splice(genre.indexOf(event.target.value), 1);
    }
    setGenre(updatedList);
  };

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    genre.includes(item) ? "checked-item" : "not-checked-item";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return alert(error);
    }

    const book = {
      title,
      author,
      genre,
      rating,
      pageNumber,
      status,
    };
    const response = await fetch("https://final-project-api-x4ux.onrender.com/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setTitle("");
      setAuthor("");
      setGenre([]);
      setRating("");
      setPageNumber("");
      setStatus("");
      console.log("New book added!");
      dispatch({
        type: "CREATE_BOOK",
        payload: json,
      });
    }
  };

  console.log(genre);

  return (
    <Box sx={{ width: "30%", m: 1 }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Add a new book:
          </Typography>
          <TextField
            color="secondary"
            label="Book title:"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sx={{ mb: 1 }}
          />
          <TextField
            color="secondary"
            label="Book author:"
            type="text"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            sx={{ mb: 1 }}
          />
          <FormGroup sx={{ mb: 1 }}>
            <Typography>Book genre:</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {genreList.map((item, index) => (
                <FormControlLabel
                  label={item}
                  key={index}
                  control={
                    <Checkbox
                      color="secondary"
                      type="checkbox"
                      className={isChecked(item)}
                      value={item}
                      onChange={handleCheck}
                    />
                  }
                />
              ))}
            </Box>
          </FormGroup>
          <TextField
            color="secondary"
            label="Book pages:"
            type="number"
            onChange={(e) => setPageNumber(e.target.value)}
            value={pageNumber}
            sx={{ mb: 1 }}
          />
          <InputLabel id="ReadingStatus">Reading status</InputLabel>
          <Select
            color="secondary"
            required
            labelId="ReadingStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value={"Read"}>Read</MenuItem>
            <MenuItem value={"Reading"}>Reading</MenuItem>
            <MenuItem value={"Want to read"}>Want to read</MenuItem>
          </Select>
          <Typography>Your rating:</Typography>
          <Rating
            label="Your rating:"
            value={+rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "#3B163D", color: "#F4E7FC" }}>
            Add book
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
}
