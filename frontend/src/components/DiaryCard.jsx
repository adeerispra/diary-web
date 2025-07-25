import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  // Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { deleteDiaryById, updateDiaryById } from "../apis/diary.api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DiaryCard = ({ diary, index }) => {
  const [updatedDiary, setUpdatedDiary] = useState(diary);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("blue.50", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    if (diary) {
      setUpdatedDiary({
        ...diary,
        date: diary.date ? diary.date.split("T")[0] : "",
      });
    }
  }, [diary]);

  const handleDeleteDiary = async (id) => {
    try {
      const { success, message } = await deleteDiaryById(id);

      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(0);
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

  const handleUpdateDiary = async (id, updatedDiary) => {
    try {
      const { success, message, data } = await updateDiaryById(
        id,
        updatedDiary
      );
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      navigate(0);
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
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      data-testid={`diary-card-${index}`}
    >
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} data-testid={`diary-title-${index}`}>
          {diary.title}
        </Heading>
        <Text
          fontWeight="bold"
          fontSize="xl"
          color={textColor}
          mb={4}
          data-testid={`diary-description-${index}`}
        >
          {diary.description}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
            data-testid={`edit-diary-${index}`}
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteDiary(diary._id)}
            colorScheme="red"
            data-testid={`delete-diary-${index}`}
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent data-testid={`modal-diary-${index}`}>
          <ModalHeader>Update Diary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Diary Title"
                name="title"
                value={updatedDiary.title}
                onChange={(e) =>
                  setUpdatedDiary({ ...updatedDiary, title: e.target.value })
                }
                data-testid={`modal-input-title`}
              />
              <Input
                placeholder="Diary Description"
                name="description"
                value={updatedDiary.description}
                onChange={(e) =>
                  setUpdatedDiary({
                    ...updatedDiary,
                    description: e.target.value,
                  })
                }
                data-testid={`modal-input-description`}
              />
              <Input
                type="date"
                value={updatedDiary.date}
                onChange={(e) =>
                  setUpdatedDiary({
                    ...updatedDiary,
                    date: e.target.value,
                  })
                }
                data-testid={`modal-input-date`}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateDiary(diary._id, updatedDiary)}
              data-testid={`modal-button-update`}
            >
              Update
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              data-testid={`modal-button-cancel`}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default DiaryCard;
