import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { FaBell, FaCog } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import DepartmentSelect from "./pages/admin/table/FormAlert/DepartmentSelect";
import { iconPerType } from "./map/marker";
import { toPascalCase } from "./utils/textTransform";
/* eslint import/no-relative-packages: "off" */
import apiClient from "../sdk/safetyHubAPI/ApiClient";

export const Navbar = () => {
  const bg = useColorModeValue("white", "#1a202c");
  const toast = useToast();

  const mobileNav = useDisclosure();
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);
  const [checkboxes, setCheckboxes] = useState<{
    [key: string]: boolean | undefined;
  }>({
    FIRE: user?.fire_alerts,
    WEATHER: user?.weather_alerts,
    HEALTH: user?.health_alerts,
    SECURITY: user?.security_alerts,
  });
  const [countyName, setCountyName] = useState<string | undefined>(
    user?.countyName
  );

  useEffect(() => {
    setCheckboxes({
      FIRE: user?.fire_alerts,
      WEATHER: user?.weather_alerts,
      HEALTH: user?.health_alerts,
      SECURITY: user?.security_alerts,
    });
    setCountyName(user?.countyName);
  }, [user]);

  const handleCheckboxChange = (label: string, newValue: boolean) => {
    setCheckboxes({
      ...checkboxes,
      [label]: newValue,
    });
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountyName(e.target.value);
  };

  const onSubmit = () => {
    const settings = {
      fire_alerts: checkboxes.FIRE,
      weather_alerts: checkboxes.WEATHER,
      health_alerts: checkboxes.HEALTH,
      security_alerts: checkboxes.SECURITY,
      countyName: countyName?.replace(/ /g, ""),
    };

    apiClient.user
      .updateUserSettings(settings)
      .then(() => {
        toast({
          title: `Successfully setting change`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: `${error.response.status} ${error.response.statusText}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    onClose();
  };

  return (
    <Box
      as="nav"
      role="navigation"
      bg={useColorModeValue("gray.50", "#1a202c")}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"100vw"} // eslint-disable-next-line
      h="5vh">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <Button
            fontWeight={"medium"}
            style={{ backgroundColor: "transparent" }}
            ml="2"
            fontSize="2xl"
            variant="ghost" // eslint-disable-next-line
            onClick={() => nav("/")}>
            SafetyHub
          </Button>
        </Flex>
        <Text textAlign={"center"} textColor={"red"} fontSize={"10px"}>
          SFSU Software Engineering Project CSC 648-848, Spring 2023. For
          Demonstration Only
        </Text>

        <HStack display="flex" alignItems="center" spacing={2}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500" // eslint-disable-next-line
            display={{ base: "none", md: "inline-flex" }}>
            {!user && (
              <>
                <Button
                  size="sm"
                  color={"black"}
                  colorScheme={"cyan"} // eslint-disable-next-line
                  onClick={() => nav("Register")}>
                  Register
                </Button>
                <Button variant="link" p={3} onClick={() => nav("SignIn")}>
                  Sign in
                </Button>
              </>
            )}

            {user &&
              (user.role === "DIRECTOR_COUNTY" || user.role === "ADMIN") && (
                <Button variant="link" p={3} onClick={() => nav("Admin")}>
                  {user.role === "DIRECTOR_COUNTY" && (
                    <Text>Director Panel</Text>
                  )}
                  {user.role === "ADMIN" && <Text>Admin Panel</Text>}
                </Button>
              )}

            {user && (
              <>
                <Button variant="link" p={3} onClick={() => nav("Map")}>
                  Map
                </Button>

                <Button
                  variant="link"
                  p={3}
                  onClick={() => {
                    // TODO Implement Logout
                    logout();
                    nav("/"); // eslint-disable-next-line
                  }}>
                  Logout
                </Button>
                <Button variant="link" p={3} onClick={() => nav("about-us")}>
                  About us
                </Button>
              </>
            )}

            {user && user.role === "USER" && (
              <>
                <Button
                  size="sm"
                  leftIcon={<FaBell />}
                  colorScheme="red"
                  variant="solid"
                  alignContent={"center"} // eslint-disable-next-line
                  onClick={() => nav("History")}>
                  Alerts
                </Button>

                <IconButton
                  aria-label="settings page"
                  icon={<FaCog />}
                  onClick={onOpen}
                />

                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose} // eslint-disable-next-line
                  size={"sm"}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                      Account Settings
                    </DrawerHeader>

                    <DrawerBody>
                      <Stack spacing="24px">
                        <Box>
                          <CheckboxGroup>
                            <Text>Receive Notifications For:</Text>
                            <Stack
                              spacing={[1, 5]} // eslint-disable-next-line
                              direction={["column", "row"]}
                              justifyContent={"center"}
                              alignItems={"center"}
                            >
                              <Flex flexWrap="wrap" gap={6}>
                                {Object.entries(iconPerType).map(
                                  ([label, imageUrl]) => (
                                    <Flex key={label} alignItems="center">
                                      <Checkbox
                                        isChecked={checkboxes[label]}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            label,
                                            e.target.checked
                                          )
                                        }
                                      >
                                        <HStack minWidth="110px">
                                          <Image
                                            src={imageUrl}
                                            marginRight={2}
                                          />
                                          <Text textColor={"white"}>
                                            {toPascalCase(label)}
                                          </Text>
                                        </HStack>
                                      </Checkbox>
                                    </Flex>
                                  )
                                )}
                              </Flex>
                            </Stack>
                          </CheckboxGroup>
                        </Box>

                        <Box>
                          <FormLabel>Select County Preference</FormLabel>
                          <DepartmentSelect
                            value={countyName ?? "Alameda"}
                            onChange={handleCountyChange}
                          />
                        </Box>
                        <Button
                          bg={"blue.500"} // eslint-disable-next-line
                          onClick={() => nav("PasswordChange")}>
                          Change Password
                        </Button>
                      </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                      <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button bg={"blue.500"} onClick={onSubmit}>
                        Submit
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </HStack>
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              _dark={{ color: "inherit" }}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="md"
              shadow="md"
              borderRadius={20} // eslint-disable-next-line
              zIndex={2}>
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />
              <Button
                variant="link"
                w="full"
                p={3} // eslint-disable-next-line
                onClick={() => nav("about-us")}>
                About us
              </Button>

              <Button variant="link" w="full" onClick={() => nav("SignIn")}>
                Sign in
              </Button>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};
