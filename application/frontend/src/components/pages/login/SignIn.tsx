import React, { useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
/* eslint import/no-relative-packages: "off" */
import { AuthContext } from "../../../auth/AuthContext";

type FormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { login } = useContext(AuthContext);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    login(data.email, data.password);
  };

  return (
    <Box
      width="100%"
      h="91vh"
      maxWidth="450px"
      mx="auto"
      display={"flex"}
      justifyContent={"center"} // eslint-disable-next-line
      alignItems={"center"}>
      <Box bg={"gray.800"} p={4} borderRadius={"20px"}>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={6}>
          <Stack>
            <Heading fontSize={"4xl"}>Sign in</Heading>
            <Text fontSize={"lg"} color={"blue.600"}>
              to use certain features!
            </Text>
          </Stack>
          <FormControl isRequired id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "The password must be at least 6 characters long",
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="100%">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignIn;
