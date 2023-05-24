import React from "react";
import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { FaFacebook, FaPhone, FaTwitter } from "react-icons/fa";
import { SocialButton } from "./button/SocialButton";

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "#1a202c")}
      color={useColorModeValue("gray.700", "gray.200")} // eslint-disable-next-line
      h="4vh">
      <Container
        as={Stack}
        maxW={"2xl"}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }} // eslint-disable-next-line
        align={{ base: "center", md: "center" }}>
        <Text>© SafetyHub All rights reserved 2023</Text>

        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Contact Us"} href={"Contact"}>
            <FaPhone />
          </SocialButton>
          <SocialButton label={"Facebook"} href={"https://www.facebook.com/"}>
            <FaFacebook />
          </SocialButton>
          <SocialButton label={"Twitter"} href={"https://twitter.com/?lang=en"}>
            <FaTwitter />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
