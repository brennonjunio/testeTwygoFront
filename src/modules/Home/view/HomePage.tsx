import { useState } from "react";
import CourseList from "./HomeCourseList";
import { Box, Button } from "@chakra-ui/react";
import ModalCourseForm from "../../Course/view/ModalCoursForm";
const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const openModal = () => {
    setOpenForm(true);
  };

  const closeModal = () => {
    setOpenForm(false);
  };
  return (
    <Box p={5}>
      <Button onClick={openModal} colorScheme="teal">
        Adicionar Curso
      </Button>
      <CourseList />
      {openForm && (
        <ModalCourseForm onClose={closeModal} titleModal="Adicionar Cursos" />
      )}
    </Box>
  );
};

export default HomePage;
