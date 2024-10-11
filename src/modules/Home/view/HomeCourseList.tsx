import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Container,
  useBreakpointValue,
  Badge,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import CourseForm from "../../Course/view/ModalCoursForm";
import { Course } from "../../../services/Course/InterfaceCourse";
import { formatDate } from "../../../services/Utils";
import { CourseDefaultList } from "../../../services/Course/CourseObjectDefault";

const CourseList: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const closeModal = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  const openAddModal = () => {
    setSelectedCourse({
      id: 0,
      title: "",
      description: "",
      InitialDate: "",
      FinalDate: "",
    });
    setOpenModal(true);
  };

  const editCourse = (course: Course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const saveCourse = (updatedCourse: Course) => {
    setCourses((prevCourses) => {
      if (updatedCourse.id === 0) {
        const newId = Math.max(...prevCourses.map(c => c.id ?? 0), 0) + 1;
        return [...prevCourses, { ...updatedCourse, id: newId }];
      } else {
        return prevCourses.map((course) =>
          course.id === updatedCourse.id ? updatedCourse : course
        );
      }
    });
    closeModal();
  };

  const deleteCourse = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  useEffect(() => {
    setCourses(CourseDefaultList);
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(titleFilter.toLowerCase());
      const startDateMatch = !startDateFilter || new Date(course.InitialDate) >= new Date(startDateFilter);
      const endDateMatch = !endDateFilter || new Date(course.FinalDate) <= new Date(endDateFilter);
      return titleMatch && startDateMatch && endDateMatch;
    });
    setFilteredCourses(filtered);
  }, [courses, titleFilter, startDateFilter, endDateFilter]);

  const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  const isCourseOpen = (finalDate: string) => {
    return new Date(finalDate) > new Date();
  };

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={4} align="stretch">
        <Heading size={{ base: "lg", md: "xl" }}>Cursos</Heading>
        <Button
          onClick={openAddModal}
          colorScheme="teal"
          size="sm"
          leftIcon={<AddIcon />}
        >
          Adicionar Curso
        </Button>

        <VStack spacing={3} align="stretch">
          <FormControl>
            <FormLabel fontSize="sm">Filtrar por título</FormLabel>
            <Input
              size="sm"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              placeholder="Digite o título do curso"
            />
          </FormControl>
          <Flex direction={{ base: "column", sm: "row" }} gap={3}>
            <FormControl flex={1}>
              <FormLabel fontSize="sm">Data de início</FormLabel>
              <Input
                size="sm"
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormLabel fontSize="sm">Data de fim</FormLabel>
              <Input
                size="sm"
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </FormControl>
          </Flex>
        </VStack>

        <SimpleGrid columns={gridColumns} spacing={4}>
          {filteredCourses.map((course) => (
            <Box
              key={course.id}
              borderWidth={1}
              borderRadius="md"
              p={2}
              bg="white"
              boxShadow="sm"
            >
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{course.title}</Text>
                <Text fontSize="xs" noOfLines={2}>{course.description}</Text>
                <Text fontSize="xs">Início: {formatDate(course?.InitialDate)}</Text>
                <Text fontSize="xs">Fim: {formatDate(course?.FinalDate as string)}</Text>
                <Badge colorScheme={isCourseOpen(course.FinalDate as string) ? "green" : "red"}>
                  {isCourseOpen(course.FinalDate as string) ? "Aberto" : "Fechado"}
                </Badge>
                <Flex width="100%" justifyContent="space-between" alignItems="center">
                  <Button
                    leftIcon={<EditIcon />}
                    size="xs"
                    onClick={() => editCourse(course)}
                  >
                    Editar
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    size="xs"
                    colorScheme="red"
                    onClick={() => deleteCourse(course.id ?? 0)}
                  >
                    Excluir
                  </Button>
                </Flex>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
        {openModal && selectedCourse && (
          <CourseForm
            onClose={closeModal}
            titleModal={selectedCourse.id === 0 ? "Adicionar Curso" : "Editar Curso"}
            params={selectedCourse}
            onSave={saveCourse}
          />
        )}
      </VStack>
    </Container>
  );
};

export default CourseList;
