import Box from "@mui/material/Box";

// pages & components
import View from "../components/View";
import BookForm from "../components/BookForm";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}>
      <View />
      <BookForm />
    </Box>
  );
}
