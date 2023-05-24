import React from "react";
import { useNavigate } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import apiClient from "../../../sdk/safetyHubAPI/ApiClient";
/* eslint import/no-relative-packages: "off" */

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const PasswordChange: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      confirmNewPassword: "",
    },
  });
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Call API
    apiClient.auth
      .changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmNewPassword
      )
      .then(() => {
        toast({
          title: `Password reset successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/SignIn");
      })
      .catch((error) => {
        toast({
          title: `${error.response.status} ${error.response.statusText}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
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
          <Stack mb={5}>
            <Heading fontSize={"4xl"} color="blue.600">
              Password Change
            </Heading>
          </Stack>
          <FormControl id="password" isRequired>
            <FormLabel>Current Password</FormLabel>
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type="password" />}
            />
          </FormControl>
          <FormControl id="new-password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} type="password" />}
            />
          </FormControl>
          <FormControl
            id="confirmNewPassword"
            isRequired // eslint-disable-next-line
            isInvalid={!!errors.confirmNewPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Controller
              name="confirmNewPassword"
              control={control}
              rules={{
                required: true,
                validate: (value) =>
                  value === watch("newPassword") || "Password does not match.",
              }}
              render={({ field }) => <Input {...field} type="password" />}
            />
            <FormErrorMessage>
              {errors.confirmNewPassword && errors.confirmNewPassword.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Submit
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PasswordChange;
