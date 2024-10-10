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
} from "@chakra-ui/react";
import { Course } from "../../../services/Course/InterfaceCourse";
import { formatToStandardDate } from "../../../services/Utils";

interface CourseFormProps {
  onClose: () => void;
  titleModal?: string;
  params?: Course;
}

const ModalCourseForm: React.FC<CourseFormProps> = ({
  onClose,
  titleModal,
  params,
}) => {
  const [body, setBody] = useState<Course>({
    title: "",
    description: "",
    InitialDate: "",
    FinalDate: "",
  });

  const [error, setError] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBody({ ...body, [e.target.name]: e.target.value });
    },
    [body]
  );

  const handleSubmit = () => {
    if (
      !body.title ||
      !body.description ||
      !body.InitialDate ||
      !body.FinalDate
    ) {
      setError(true);
      return;
    }
    setError(false);
    
    onClose();
  };

  useEffect(() => {
    if (params) {
      setBody(params);
    }
  }, [params]);

  return (
    <Modal isOpen={true} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">{titleModal}</Heading>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired isInvalid={error && !body.title}>
              <FormLabel>Título</FormLabel>
              <Input
                name="title"
                value={body.title}
                onChange={handleInputChange}
                placeholder="Digite o título do curso"
              />
            </FormControl>
            <FormControl isRequired isInvalid={error && !body.description}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                name="description"
                value={body.description}
                onChange={handleInputChange}
                placeholder="Digite a descrição do curso"
                resize="none"
              />
            </FormControl>
            <FormControl isRequired isInvalid={error && !body.InitialDate}>
              <FormLabel>Data de Início</FormLabel>
              <Input
                name="InitialDate"
                type="date"
                value={formatToStandardDate(body?.InitialDate)}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired isInvalid={error && !body.FinalDate}>
              <FormLabel>Data de Fim</FormLabel>
              <Input
                name="FinalDate"
                type="date"
                value={formatToStandardDate(body.FinalDate)}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
