import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  AspectRatio,
  List,
  ListItem,
  ListIcon,
  Flex,
} from "@chakra-ui/react";
import { ArrowRightIcon, CheckCircleIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Course } from "../../../services/Course/InterfaceCourse";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

interface VideoLesson {
  id: number;
  title: string;
  url: string;
}

const CourseView: React.FC<{ course: Course }> = ({ course }) => {
  const [videoLessons, setVideoLessons] = useState<VideoLesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<VideoLesson | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const simulatedLessons: VideoLesson[] = [
      { id: 1, title: "Introdução ao Curso", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 2, title: "Conceitos Básicos", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { id: 3, title: "Prática Avançada", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ];
    setVideoLessons(simulatedLessons);
    setCurrentLesson(simulatedLessons[0]);
  }, [course]);

  const selectLesson = (lesson: VideoLesson) => {
    setCurrentLesson(lesson);
  };

  const goToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Box p={3}>
      <Button leftIcon={<ArrowBackIcon />} onClick={goToPreviousPage} mb={4} size="sm">
        Voltar
      </Button>
      <Heading mb={4} fontSize={{ base: "xl", md: "2xl" }}>{course.title}</Heading>
      <Text mb={6} fontSize={{ base: "sm", md: "md" }}>{course.description}</Text>

      <Flex direction={{ base: "column", md: "row" }} align="start">
        <VStack flex={2} align="stretch" width="100%" mb={{ base: 6, md: 0 }} spacing={4}>
          {currentLesson && (
            <>
              <AspectRatio ratio={16 / 9}>
                <ReactPlayer
                  url={currentLesson.url}
                  width="100%"
                  height="100%"
                  controls
                />
              </AspectRatio>
              <Heading size="md" fontSize={{ base: "lg", md: "xl" }}>{currentLesson.title}</Heading>
            </>
          )}
        </VStack>

        <VStack flex={1} align="stretch" width="100%" spacing={4} ml={{ base: 0, md: 8 }}>
          <Heading size="md" fontSize={{ base: "lg", md: "xl" }}>Lista de Aulas</Heading>
          <List spacing={3}>
            {videoLessons.map((lesson) => (
              <ListItem key={lesson.id}>
                <Button
                  variant="ghost"
                  onClick={() => selectLesson(lesson)}
                  justifyContent="flex-start"
                  width="100%"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <ListIcon as={lesson === currentLesson ? CheckCircleIcon : ArrowRightIcon} color="green.500" />
                  {lesson.title}
                </Button>
              </ListItem>
            ))}
          </List>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CourseView;
