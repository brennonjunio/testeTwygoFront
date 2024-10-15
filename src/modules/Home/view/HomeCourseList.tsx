import React, { useEffect, useState } from "react";
import {
  Button,
  Heading,
  SimpleGrid,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Container,
  Badge,
  useToast,
  Select,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spacer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import CourseForm from "../../Course/view/ModalCoursForm";
import { Course } from "../../../services/Course/InterfaceCourse";
import { formatDate } from "../../../services/Utils";
import { CourseDefaultList } from "../../../services/Course/CourseObjectDefault";
import { useNavigate } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";

const CourseList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const navigate = useNavigate();
  const toast = useToast();

  const closeModal = () => {
    setIsModalOpen(false);
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
    setIsModalOpen(true);
  };

  const editCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const saveCourse = (updatedCourse: Course) => {
    setCourses((prevCourses) => {
      if (updatedCourse.id === 0) {
        const newId = Math.max(...prevCourses.map((c) => c.id ?? 0), 0) + 1;
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

  const viewCourse = (course: Course) => {
    if (isCourseOpen(course.FinalDate as string)) {
      navigate(`/course/${course.id}`);
    } else {
      toast({
        title: "Curso fechado",
        description: "Este curso já foi encerrado e não está mais disponível.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setCourses(CourseDefaultList);
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const titleMatch = course.title
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      const statusMatch =
        statusFilter === "todos" ||
        (statusFilter === "abertos" &&
          isCourseOpen(course.FinalDate as string)) ||
        (statusFilter === "fechados" &&
          !isCourseOpen(course.FinalDate as string));
      return titleMatch && statusMatch;
    });
    setFilteredCourses(filtered);
  }, [courses, titleFilter, statusFilter]);

  // const gridColumns = useBreakpointValue({
  //   base: 1,
  //   sm: 2,
  //   md: 3,
  //   lg: 4,
  //   xl: 5,
  // });

  const isCourseOpen = (finalDate: string) => {
    return new Date(finalDate) > new Date();
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Flex gap={3} alignItems="center">
        <Heading size={{ base: "lg", md: "xl" }}>Cursos</Heading>
        <Spacer />
        <Button
          onClick={() => navigate("/report")}
          colorScheme="teal"
          size="sm"
          leftIcon={<RiDashboard3Line />}
        >
          Report
        </Button>
        <Button
          onClick={openAddModal}
          colorScheme="teal"
          size="sm"
          leftIcon={<AddIcon />}
        >
          Adicionar Curso
        </Button>
      </Flex>
      <hr style={{ borderColor: "#c7c7c7", marginTop: "10px" }} />
      <Flex gap={3} mb={5} mt={3}>
        <FormControl>
          <FormLabel fontSize="sm">Filtrar por título</FormLabel>
          <Input
            size="sm"
            variant="filled"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Digite o título do curso"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">Status do curso</FormLabel>
          <Select
            size="sm"
            variant="filled"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="abertos">Abertos</option>
            <option value="fechados">Fechados</option>
          </Select>
        </FormControl>
      </Flex>

      <SimpleGrid
        columns={3}
        spacing="4"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {filteredCourses.map((course) => (
          <Card maxW="md" boxShadow="md" onClick={() => viewCourse(course)}>
            <CardHeader>
              <Heading size="md">{course.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text fontSize="md" color="#8c8c8c">
                {" "}
                {course.description}
              </Text>
              <Text fontSize="md" mt={4}>
                Início: <b>{formatDate(course?.InitialDate)}</b>
              </Text>
              <Text fontSize="md">
                Fim: <b>{formatDate(course?.FinalDate)}</b>
              </Text>
              <Badge
                colorScheme={
                  isCourseOpen(course.FinalDate as string) ? "green" : "red"
                }
                fontSize="md"
                mt={2}
              >
                {isCourseOpen(course.FinalDate as string)
                  ? "Aberto"
                  : "Fechado"}
              </Badge>
            </CardBody>
            <CardFooter>
              <Flex
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  leftIcon={<EditIcon />}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    editCourse(course);
                  }}
                >
                  Editar
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCourse(course.id ?? 0);
                  }}
                >
                  Excluir
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      {isModalOpen && selectedCourse && (
        <CourseForm
          onClose={closeModal}
          titleModal={
            selectedCourse.id === 0 ? "Adicionar Curso" : "Editar Curso"
          }
          params={selectedCourse}
          onSave={saveCourse}
        />
      )}
    </Container>
  );
};

export default CourseList;
