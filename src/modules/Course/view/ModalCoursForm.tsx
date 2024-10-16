import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { Course } from "../../../services/Course/InterfaceCourse";
import { formatToStandardDate, ValidateDate } from "../../../services/Utils";

interface CourseFormProps {
  onClose: () => void;
  titleModal?: string;
  params?: Course;
  onSave?: (obj: Course) => void;
}

const ModalCourseForm: React.FC<CourseFormProps> = ({
  onClose,
  titleModal,
  params,
  onSave,
}) => {
  const [body, setBody] = useState<Course>({
    title: "",
    description: "",
    InitialDate: "",
    FinalDate: "",
  });

  const [error, setError] = useState<boolean>(false);
  const toast = useToast();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    },
    [body]
  );

  // const validateBody  =() =>{
  //   if()
  // }

  const handleSubmit = () => {
    setError(false);
    if (onSave && !error) {
      onSave(body);
      onClose();
    }
  };

  useEffect(() => {
    if (params) {
      setBody(params);
    }
  }, [params]);

  useEffect(() => {
    if (
      !body.title ||
      !body.description ||
      !body.InitialDate ||
      !body.FinalDate
    ) {
      setError(true);
    } else {
      setError(false);
    }

    const validate = ValidateDate(
      body.InitialDate.toString(),
      body.FinalDate.toString()
    );

    if (validate !== "") {
      toast({
        title: "Formato de data inválido",
        description: `${validate}`,
        status: "warning",
        duration: 4000,
        isClosable: false,
      });
      setError(true);
    }
  }, [body, toast]);

  return (
    <Modal isOpen={true} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{titleModal}</Heading>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired isInvalid={!body.title}>
              <FormLabel>Título</FormLabel>
              <Input
                name="title"
                value={body.title}
                onChange={handleInputChange}
                placeholder="Digite o título do curso"
              />
            </FormControl>
            <FormControl isRequired isInvalid={!body.description}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                name="description"
                value={body.description}
                onChange={handleInputChange}
                placeholder="Digite a descrição do curso"
                resize="none"
              />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl isRequired isInvalid={!body.InitialDate}>
                <FormLabel>Data de Início</FormLabel>
                <Input
                  name="InitialDate"
                  type="date"
                  value={formatToStandardDate(body?.InitialDate)}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired isInvalid={!body.FinalDate}>
                <FormLabel>Data de Fim</FormLabel>
                <Input
                  name="FinalDate"
                  type="date"
                  value={formatToStandardDate(body.FinalDate)}
                  onChange={handleInputChange}
                />
              </FormControl>
            </SimpleGrid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={handleSubmit}
            isDisabled={error}
          >
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCourseForm;
