import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

// pages & components
import BookDetails from "../components/BookDetails";
import useBooksContext from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function View() {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:4000/api/books", {
        headers: { "Authorization": `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };
    if (user) {
      fetchBooks();
    }
  }, [dispatch, user]);

  return (
    <Box sx={{ width: "60%", m: 1 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Your books:</Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {books &&
          books.map((book) => <BookDetails key={book._id} book={book} />)}
      </Box>
    </Box>
  );
}
