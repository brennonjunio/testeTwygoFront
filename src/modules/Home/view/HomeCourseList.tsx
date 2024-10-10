import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CourseForm from "../../Course/view/ModalCoursForm";
import { Course } from "../../../services/Course/InterfaceCourse";
import { formatDate } from "../../../services/Utils";
import { CourseDefaultList } from "../../../services/Course/CourseObjectDefault";

const CourseList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [object, SetObject] = useState<Course>();
  const [courses, SetListCourses] = useState<Course[]>([]);
  const editOrAdd = (obj: Course) => {
    SetObject(obj);

    SetListCourses((prevCourses) =>
      prevCourses.map((course) => (course.id === obj.id ? obj : course))
    );
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const deleteCourse = (obj: Course) => {
    SetListCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== obj.id)
    );
  };

  useEffect(() => {
    const list = CourseDefaultList;
    SetListCourses(list);
  }, []);

  return (
    <Box p={5}>
      <Heading mb={5}>Cursos</Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
        {courses.map((course) => (
          <Box
            key={course.id}
            borderWidth={1}
            borderRadius="lg"
            p={3}
            bg="white"
            boxShadow="md"
            position="relative"
          >
            <HStack spacing={2} position="absolute" top={2} right={2}>
              <IconButton
                aria-label="Editar"
                icon={<EditIcon />}
                size="sm"
                onClick={() => editOrAdd(course)}
              />
              <IconButton
                aria-label="Excluir"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => deleteCourse(course)}
              />
            </HStack>
            <VStack align="start">
              <Text fontWeight="bold">{course.title}</Text>
              <Text>{course.description}</Text>
              <Text>Início: {formatDate(course?.InitialDate)}</Text>
              <Text>Fim: {formatDate(course?.FinalDate)}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
      {openModal && (
        <CourseForm
          onClose={closeModal}
          titleModal="Editar cursos"
          params={object}
          onSave={editOrAdd}
        />
      )}
    </Box>
  );
};

export default CourseList;
