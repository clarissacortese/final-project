import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";

// pages & components
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <Box
      sx={{
        width: 300,
        padding: 10,
        mt: 12,
        mx: "auto",
        backgroundColor: "#C0A5D1",
        borderRadius: "20px",
      }}>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <TextField
            color="secondary"
            sx={{ mb: 3, color: "#3B163D" }}
            label="Email address:"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            color="secondary"
            sx={{ mb: 3, color: "#3B163D" }}
            label="Password:"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ backgroundColor: "#3B163D", color: "#F4E7FC" }}
            disabled={isLoading}>
            Log in
          </Button>
          {error && (
            <Box color="error.dark" sx={{ mt: 3, mx: "auto" }}>
              {error}
            </Box>
          )}
        </FormGroup>
      </form>
    </Box>
  );
};

export default Login;
