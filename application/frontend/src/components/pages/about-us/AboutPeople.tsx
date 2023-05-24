import React, { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { IAboutPeople } from "../../card/CardPeople";
import { aboutPeople } from "../../fakeData/aboutPeople";

export default function AboutPeople() {
  const { id } = useParams();
  const [infos, setInfos] = useState<IAboutPeople>();

  useEffect(() => {
    // eslint-disable-next-line
    aboutPeople.find((item, index) => {
      if (item.name === id) {
        setInfos(aboutPeople[index]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxW={"5xl"} px={12} py={12} minH={"88vh"}>
      <Center>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              {infos?.name}
            </Text>
            <Heading>{infos?.role}</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              {infos?.description}
            </Text>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={infos?.img}
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Center>
    </Container>
  );
}
