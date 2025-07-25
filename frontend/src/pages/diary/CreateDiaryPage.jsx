import {
  Box,
  Button,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiary } from "../../apis/diary.api";

const CreateDiaryPage = () => {
  const [newDiary, setNewDiary] = useState({
    title: "",
    description: "",
    date: "",
  });
  const toast = useToast();
  const bg = useColorModeValue("blue.50", "gray.800");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { success, message } = await createDiary(newDiary);

      toast({
        title: "Diary Created",
        description: message,
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
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={5}
      bg={bg}
      rounded="md"
      shadow="md"
      data-testid="create-diary-container"
    >
      <Heading
        size="lg"
        mb={6}
        textAlign="center"
        data-testid="create-diary-heading"
      >
        Create New Diary
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Title"
          value={newDiary.title}
          onChange={(e) => setNewDiary({ ...newDiary, title: e.target.value })}
          data-testid="diary-title-input"
        />
        <Textarea
          placeholder="Description"
          value={newDiary.description}
          onChange={(e) =>
            setNewDiary({ ...newDiary, description: e.target.value })
          }
          data-testid="diary-description-input"
        />
        <Input
          type="date"
          value={newDiary.date}
          onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
          data-testid="diary-date-input"
        />
        <HStack spacing={4} w="full">
          <Button
            colorScheme="gray"
            flex={1}
            onClick={() => navigate("/")}
            variant="outline"
            data-testid="cancel-button"
          >
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            flex={1}
            isDisabled={
              !newDiary.title || !newDiary.description || !newDiary.date
            }
            onClick={handleSubmit}
            data-testid="submit-button"
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default CreateDiaryPage;
