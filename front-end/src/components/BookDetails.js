import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

// pages & components
import useBooksContext from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function BookDetails({ book }) {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `https://final-project-api-x4ux.onrender.com/api/books/${book._id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: json });
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#C0A5D1",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <CardContent sx={{ width: "100%", inlineSize: "90%" }}>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle1">
          <em>{book.author}</em>
        </Typography>
      </CardContent>
      <CardContent
        sx={{ backgroundColor: "#EAC9FF", width: "100%", height: "100%" }}>
        <Typography>
          <strong>Genre: </strong>
          {book.genre.join(", ")}
        </Typography>
        <Typography>
          <strong>Pages: </strong>
          {book.pageNumber}
        </Typography>
        <Typography>
          <strong>Reading status: </strong>
          {book.status}
        </Typography>
        <Typography>
          <strong>Rating: </strong>
          {book.rating}/5
        </Typography>
        <Typography variant="caption">
          {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
        </Typography>
      </CardContent>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            backgroundColor: "#3B163D",
            color: "#F4E7FC",
            m: 2,
            justifySelf: "flex-end",
          }}
          onClick={handleDelete}
          startIcon={<DeleteIcon sx={{ color: "#F4E7FC" }} />}>
          Delete
        </Button>
    </Card>
  );
}
