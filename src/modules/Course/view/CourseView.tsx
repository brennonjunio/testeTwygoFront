import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  AspectRatio,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ArrowRightIcon, CheckCircleIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Course } from "../../../services/Course/InterfaceCourse";
import { useNavigate } from "react-router-dom";

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
      { id: 1, title: "Course Introduction", url: "https://example.com/lesson1" },
      { id: 2, title: "Basic Concepts", url: "https://example.com/lesson2" },
      { id: 3, title: "Advanced Practice", url: "https://example.com/lesson3" },
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
    <Box p={5}>
      <Button leftIcon={<ArrowBackIcon />} onClick={goToPreviousPage} mb={4}>
        Back
      </Button>
      <Heading mb={4}>{course.title}</Heading>
      <Text mb={6}>{course.description}</Text>

      <HStack align="start" spacing={8}>
        <VStack flex={2} align="stretch">
          {currentLesson && (
            <>
              <AspectRatio ratio={16 / 9}>
                <Box as="iframe" src={currentLesson.url} allowFullScreen />
              </AspectRatio>
              <Heading size="md" mt={4}>{currentLesson.title}</Heading>
            </>
          )}
        </VStack>

        <VStack flex={1} align="stretch">
          <Heading size="md" mb={2}>Lesson List</Heading>
          <List spacing={3}>
            {videoLessons.map((lesson) => (
              <ListItem key={lesson.id}>
                <Button
                  variant="ghost"
                  onClick={() => selectLesson(lesson)}
                  justifyContent="flex-start"
                  width="100%"
                >
                  <ListIcon as={lesson === currentLesson ? CheckCircleIcon : ArrowRightIcon} color="green.500" />
                  {lesson.title}
                </Button>
              </ListItem>
            ))}
          </List>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CourseView;
