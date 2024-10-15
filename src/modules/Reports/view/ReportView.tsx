import { useEffect, useState } from "react";
import { Course } from "../../../services/Course/InterfaceCourse";
import { CourseDefaultList } from "../../../services/Course/CourseObjectDefault";
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Box, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const ReportView = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(CourseDefaultList);
  }, []);

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box overflowX="auto" p={3}>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="teal"
          size={isMobile ? "sm" : "md"}
        >
          <TableCaption>
            Fatores de conversão imperial para métrico
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Para converter</Th>
              <Th>em</Th>
              <Th isNumeric>multiplicar por</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>polegadas</Td>
              <Td>milímetros (mm)</Td>
              <Td isNumeric>25,4</Td>
            </Tr>
            <Tr>
              <Td>pés</Td>
              <Td>centímetros (cm)</Td>
              <Td isNumeric>30,48</Td>
            </Tr>
            <Tr>
              <Td>jardas</Td>
              <Td>metros (m)</Td>
              <Td isNumeric>0,91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Para converter</Th>
              <Th>em</Th>
              <Th isNumeric>multiplicar por</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {isMobile && (
        <Text fontSize="sm" mt={2} textAlign="center">
          Deslize para ver a tabela completa
        </Text>
      )}
    </Box>
  );
};

export default ReportView;
