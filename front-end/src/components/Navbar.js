import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// pages & components
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <AppBar
      position="static"
      sx={{ m: 0, p: "10px", backgroundColor: "#3B163D" }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ ml: "40px", color: "#F4E7FC" }}>
        Bookaholic
      </Typography>
      <Box sx={{ position: "absolute", right: "60px" }}>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ mr: "20px", color: "#F4E7FC" }}>{user.email}</Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ backgroundColor: "#C0A5D1", color: "#3B163D" }}
              onClick={handleClick}>
              Log out
            </Button>
          </Box>
        )}
        {!user && (
          <Box>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ backgroundColor: "#C0A5D1", color: "#3B163D", mr: 2 }}>
                Login
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ backgroundColor: "#C0A5D1", color: "#3B163D" }}>
                Signup
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}
