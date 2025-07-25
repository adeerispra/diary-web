import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/auth.store.js";
import { getAllUserDiary } from "../../apis/diary.api.js";
import DiaryCard from "../../components/DiaryCard.jsx";
import { Spinner } from "@chakra-ui/react";

const HomePage = () => {
  const username = useAuthStore((state) => state.username);
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchDiaries = async () => {
      setLoading(true);
      try {
        const data = await getAllUserDiary();
        setDiaries(Array.isArray(data.diary) ? data.diary : []);
      } catch (error) {
        toast({
          title: "Error",
          description: err.message || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, [username]);

  if (!username) {
    return (
      <Container maxW="container.md" py={20}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Please{" "}
            <Link to="/login" data-testid="login-link">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                login
              </Text>
            </Link>{" "}
            to see your diary.
          </Text>
        </VStack>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxW="container.md" py={20}>
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" color="blue.500" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
          data-testid="user-homepage"
        >
          Your Diary
        </Text>

        {diaries.length > 0 && (
          <HStack w="full" justifyContent="flex-end">
            <Link to="/create">
              <Button colorScheme="blue" data-testid="add-new-diary-button">
                Add New Diary
              </Button>
            </Link>
          </HStack>
        )}

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton height="200px" key={i} borderRadius="md" />
              ))
            : diaries.map((diary, index) => (
                <DiaryCard
                  key={diary._id}
                  diary={diary}
                  index={index}
                  // testId={`diary-card-${index + 1}`}
                />
              ))}
        </SimpleGrid>

        {diaries.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
            data-testid="no-diary-text"
          >
            No Diary found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
                data-testid="create-diary-link"
              >
                Create a Diary
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
