import "./App.css";
import Header from "./Components/Header";
import Box from "@mui/material/Box";
import BaseRouter from "./routes";

export default function App() {
  return (
    <Box className="App">
      <Header />
        <BaseRouter />
    </Box>
  );
}
