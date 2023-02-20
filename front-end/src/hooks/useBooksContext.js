import { useContext } from "react";

// pages & components
import { BooksContext } from "../context/BooksContext";

export default function useBooksContext() {
  const context = useContext(BooksContext);
  if (!context) {
    throw Error("useBooksContext must be used within a BookContextProvider");
  }
  return context;
}