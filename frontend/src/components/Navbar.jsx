import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import useAuthStore from "../stores/auth.store.js";
import { logoutUser } from "../apis/auth.api.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const username = useAuthStore((state) => state.username);
  const toast = useToast();

  const handleLogOut = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("username");
      useAuthStore.getState().clearAuth();

      toast({
        title: "Success",
        description: "User Logout successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Container
      maxW={"100%"}
      px={4}
      bgGradient="linear(to-r, yellow.100, teal.400)"
      py={2}
      borderRadius="md"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "30", sm: "40" }}
          data-testid="app-title"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-br, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}> My Diary </Link>
        </Text>

        <HStack spacing={3} alignItems={"center"}>
          {username ? (
            <>
              <Text
                fontWeight="semibold"
                color="gray.800"
                data-testid="username-display"
              >
                Welcome, {username}!
              </Text>
              <Button
                onClick={handleLogOut}
                bg={"red.300"}
                data-testid="logout-button"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button bg={"teal.300"} data-testid="login-button">
                  <Text>LogIn</Text>
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button bg={"teal.300"} data-testid="signup-button">
                  <Text>SignUp</Text>
                </Button>
              </Link>
            </>
          )}

          <Button
            onClick={toggleColorMode}
            bg={"teal.300"}
            data-testid="toggle-theme-button"
          >
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
