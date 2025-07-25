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
import { registerUser } from "../../apis/auth.api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [newUser, setNewUser] = useState({
    name: "",
    nickname: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await registerUser(newUser);
      toast({
        title: "Success",
        description: "User registered successfully!",
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
    <Container maxW={"container.sm"} data-testid="register-page-container">
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={"8"}
          data-testid="register-heading"
        >
          Register User
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("blue.50", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
          data-testid="register-form-box"
        >
          <VStack spacing={4}>
            <Input
              placeholder="User Name"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              data-testid="register-username-input"
            />
            <Input
              placeholder="Nick Name"
              name="nickname"
              value={newUser.nickname}
              onChange={(e) =>
                setNewUser({ ...newUser, nickname: e.target.value })
              }
              data-testid="register-nickname-input"
            />
            <Input
              placeholder="Password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              data-testid="register-password-input"
            />
            <HStack spacing={4} w="full">
              <Button
                colorScheme="gray"
                flex={1}
                onClick={() => navigate("/")}
                variant="outline"
                data-testid="register-cancel-button"
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                flex={1}
                onClick={handleRegister}
                data-testid="register-submit-button"
              >
                Register
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default RegisterPage;
