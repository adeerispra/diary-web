import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/auth.api";
import useAuthStore from "../../stores/auth.store.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const setUsername = useAuthStore((state) => state.setUsername);
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const data = await loginUser(newUser);

      if (data.user) {
        setUsername(data.user.nickname);
      }

      toast({
        title: "Success",
        description: "User Login successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Container maxW={"container.sm"} data-testid="login-page-container">
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={"8"}
          data-testid="login-heading"
        >
          Login
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("blue.50", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
          data-testid="login-form-box"
        >
          <VStack spacing={4}>
            <Input
              placeholder="User Name"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              data-testid="login-username-input"
            />
            <Input
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              data-testid="login-password-input"
            />
            <HStack spacing={4} w="full">
              <Button
                colorScheme="gray"
                flex={1}
                onClick={() => navigate("/")}
                variant="outline"
                data-testid="login-cancel-button"
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                flex={1}
                onClick={handleLogin}
                data-testid="login-submit-button"
              >
                Login
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;
