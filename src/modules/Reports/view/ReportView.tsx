import { useEffect, useState } from "react";
import { Course } from "../../../services/Course/InterfaceCourse";
import { CourseDefaultList } from "../../../services/Course/CourseObjectDefault";
import {
  Box,
  Text,
  Flex,
  Square,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
  VStack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  calculateMemoryByMonth,
  calculateTotalMemory,
} from "../../../services/Utils";

const ReportView = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses(CourseDefaultList);
  }, []);

  const goToPreviousPage = () => {
    navigate("/");
  };
  const isMobile = useBreakpointValue({ base: true, md: false });

  const totalMemory = calculateTotalMemory(courses);
  const memoryByMonth = calculateMemoryByMonth(courses);

  return (
    <Box p={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={goToPreviousPage}
        size="sm"
        mb={3}
        colorScheme="teal"
      >
        Voltar
      </Button>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Relatório de Cursos
          </Heading>
          <Box height={{ base: "300px", md: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={memoryByMonth}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="size"
                  fill="#8884d8"
                  name="Tamanho do Vídeo (MB)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          {isMobile && (
            <Text fontSize="sm" mt={2} textAlign="center">
              Deslize para ver o gráfico completo
            </Text>
          )}
        </Box>

        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          <TableContainer flex={1}>
            <Table variant="simple" size="sm" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Título do Vídeo</Th>
                  <Th isNumeric>Tamanho (MB)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses.map((course) => (
                  <Tr key={course.id}>
                    <Td>{course.Video?.description || "Sem título"}</Td>
                    <Td isNumeric fontWeight="bold">
                      {course.Video?.sizeMb || 0}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
            gap={4}
          >
            <Square
              size={{ base: "100%", sm: "150px" }}
              bg="teal.500"
              color="white"
              borderRadius="md"
            >
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold" p={1}>
                  Total de memória
                </Text>
                <Text fontSize="2x1" fontWeight="bold">
                  {totalMemory} MB
                </Text>
              </Box>
            </Square>
            <Square
              size={{ base: "100%", sm: "150px" }}
              bg="blue.500"
              color="white"
              borderRadius="md"
            >
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  Total de cursos
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {courses.length}
                </Text>
              </Box>
            </Square>
            <Square
              size={{ base: "100%", sm: "150px" }}
              bg="green.500"
              color="white"
              borderRadius="md"
            >
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  Média de tamanho
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {(totalMemory / courses.length).toFixed(2)} MB
                </Text>
              </Box>
            </Square>
            <Square
              size={{ base: "100%", sm: "150px" }}
              bg="purple.500"
              color="white"
              borderRadius="md"
            >
              <Box textAlign="center">
                <Text fontSize="lg" fontWeight="bold">
                  Maior vídeo
                </Text>
                <Text fontSize="2xl" fontWeight="bold">
                  {Math.max(
                    ...courses.map((course) => course.Video?.sizeMb || 0)
                  )}{" "}
                  MB
                </Text>
              </Box>
            </Square>
          </Grid>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ReportView;
