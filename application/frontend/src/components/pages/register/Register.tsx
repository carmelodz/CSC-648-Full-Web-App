// Import des bibliothèques nécessaires
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  FormErrorMessage,
  HStack,
  useToast,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "framer-motion";
import DepartmentSelect from "../admin/table/FormAlert/DepartmentSelect";
import TypeSelect from "../admin/table/FormAlert/TypeSelect";
/* eslint import/no-relative-packages: "off" */
import apiClient from "../../../sdk/safetyHubAPI/ApiClient";

// Type form date
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  directorAlert?: "WEATHER" | "SECURITY" | "HEALTH" | "FIRE";
  countyName?: string;
};

const SwitchForm: React.FC = () => {
  const [formType, setFormType] = useState<"register" | "director">("register");
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      confirmPassword: "",
    },
  });
  const directorAlert = watch("directorAlert", "WEATHER");
  const toast = useToast();
  const nav = useNavigate();
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();

  const onSubmit = (data: FormData) => {
    if (formType === "register") {
      // eslint-disable-next-line no-param-reassign
      if (!data.countyName) data.countyName = "Alameda";

      apiClient.auth
        .register(data.email, data.password, data.countyName.replace(/ /g, ""))
        .then(() => {
          toast({
            title: `Register successfully welcome ${data.email}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          nav("/Map");
        })
        .catch((error) => {
          toast({
            title: `${error.response.status} ${error.response.statusText}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } else {
      // eslint-disable-next-line no-param-reassign
      if (!data.directorAlert) data.directorAlert = "WEATHER";
      // eslint-disable-next-line no-param-reassign
      if (!data.countyName) data.countyName = "Alameda";
      apiClient.auth
        .registerDirector(
          data.email,
          data.password,
          data.directorAlert,
          data.countyName.replace(/ /g, "")
        )
        .then(() => {
          toast({
            title: `Register successfully welcome ${data.email}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          nav("/Map");
        })
        .catch((error) => {
          toast({
            title: `${error.response.status} ${error.response.statusText}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("directorAlert", e.target.value as FormData["directorAlert"]);
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("countyName", e.target.value);
  };

  const password = watch("password");

  return (
    <Box
      width="100%"
      h="91vh"
      maxWidth="450px"
      mx="auto"
      display={"flex"}
      justifyContent={"center"} // eslint-disable-next-line
      alignItems={"center"}>
      <VStack spacing={4}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Account Registration</Heading>
          <Text fontSize={"lg"} color={"blue.600"}>
            Create an account to gain access to certain features!
          </Text>
        </Stack>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
          <VStack spacing={4} p={4} bg={"gray.800"} borderRadius={"20px"}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} type="email" />}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field} type="password" />}
              />
            </FormControl>
            <FormControl
              id="confirmPassword"
              isRequired // eslint-disable-next-line
              isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password ||
                    "Les mots de passe ne correspondent pas",
                }}
                render={({ field }) => <Input {...field} type="password" />}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>

            <DepartmentSelect value={"Alameda"} onChange={handleCountyChange} />

            {formType === "director" && (
              <>
                <HStack>
                  <TypeSelect
                    value={"WEATHER"}
                    selectedType={
                      directorAlert as
                        | "WEATHER"
                        | "SECURITY"
                        | "HEALTH"
                        | "FIRE"
                    }
                    onChange={handleTypeChange}
                  />
                </HStack>
                <Stack>
                  <Button>
                    File Upload
                    <Input
                      type="file"
                      id="file_pick"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*, .doc,.docx, .pdf"
                      multiple
                      onDragEnter={startAnimation}
                      onDragLeave={stopAnimation}
                    />
                  </Button>
                </Stack>
              </>
            )}

            <RadioGroup
              onChange={(value) =>
                setFormType(value as "register" | "director")
              } // eslint-disable-next-line
              value={formType}>
              <Stack direction="row">
                <Radio value="register">Register</Radio>
                <Radio value="director">Become Director County</Radio>
              </Stack>
            </RadioGroup>

            <Button type="submit" colorScheme="blue">
              Register
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SwitchForm;
