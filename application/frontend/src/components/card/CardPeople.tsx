import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SocialButton } from "../button/SocialButton";

export interface IAboutPeople {
  name: string;
  role: string;
  img: string;
  description: string;
  linkedin_url: string;
  github_url: string;
}

interface CardPeopleParam {
  info: IAboutPeople;
}

export default function CardPeople({ info }: CardPeopleParam) {
  const nav = useNavigate();

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${info.img})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={info.img}
            onClick={() => {
              nav(`/about-us/${info.name}`);
            }}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {info.role}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {info.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <SocialButton label={"Github"} href={info.github_url}>
              <FaGithub />
            </SocialButton>
            <SocialButton label={"Linkedin"} href={info.linkedin_url}>
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
