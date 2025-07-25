import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/diary/CreateDiaryPage";
import HomePage from "./pages/home/HomePage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  const bgGradientAll = useColorModeValue(
    "linear(to-br, yellow.100, teal.200)",
    "linear(to-tr, yellow.800, teal.900)"
  );
  return (
    <Box
      minH={"100vh"}
      bgGradient={bgGradientAll}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </Box>
  );
}

export default App;
