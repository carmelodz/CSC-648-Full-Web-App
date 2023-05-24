import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  TableContainer,
  Button,
  useToast,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { sortByAttribute } from "../../../utils/textTransform";
/* eslint import/no-relative-packages: "off" */
import { IUser } from "../../../../sdk/safetyHubAPI/user/types";
import apiClient from "../../../../sdk/safetyHubAPI/ApiClient";
import { iconPerType } from "../../../map/marker";

// Base parameter fields for user table

// User template, will auto-update when connected with database

const DirectorsTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sortedUserData, setSortedUserData] = useState<IUser[]>(users);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();

  // TODO replace by director
  const handleHeaderClick = (attribute: keyof IUser) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    const sortedData = [...sortedUserData].sort(
      sortByAttribute<IUser>(attribute, sortOrder)
    );

    setSortedUserData(sortedData);
    setSortOrder(newSortOrder);
  };

  // TODO Replace by directors
  const handleRefresh = () => {
    apiClient.user.getDirectors().then((items: IUser[]) => {
      setUsers(items);
      setSortedUserData(items);
    });
  };

  const handleAccept = (UserID: string) => {
    apiClient.user
      .updateUser(UserID, { directorStatus: "APPROVED" })
      .then(() => {
        toast({
          title: "Alert are now approved !",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setUsers((prevItems) =>
          prevItems.map((item) =>
            item.id === UserID ? { ...item, directorStatus: "APPROVED" } : item
          )
        );
        setSortedUserData((prevItems) =>
          prevItems.map((item) =>
            item.id === UserID ? { ...item, directorStatus: "APPROVED" } : item
          )
        );
      });
  };

  const handleReject = (UserID: string) => {
    apiClient.user
      .updateUser(UserID, { directorStatus: "REJECTED" })
      .then(() => {
        toast({
          title: "Alert are now rejected !",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setUsers((prevItems) =>
          prevItems.map((item) =>
            item.id === UserID ? { ...item, directorStatus: "REJECTED" } : item
          )
        );
        setSortedUserData((prevItems) =>
          prevItems.map((item) =>
            item.id === UserID ? { ...item, directorStatus: "REJECTED" } : item
          )
        );
      });
  };

  const handleRemove = (UserID: string) => {
    apiClient.user.deleteUser(UserID).then(() => {
      toast({
        title: "User was deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUsers((prevItems) => prevItems.filter((item) => item.id !== UserID));
      setSortedUserData((prevItems) =>
        prevItems.filter((item) => item.id !== UserID)
      );
    });
  };

  useEffect(() => {
    apiClient.user.getDirectors().then((items: IUser[]) => {
      setUsers(items);
      setSortedUserData(items);
    });
  }, []);

  // Render users table page
  return (
    <>
      <Box height="36px">
        <HStack spacing={"20"} ml={3} mt={1}>
          <Text size="sm" fontSize={20}>
            Directors
          </Text>

          <Button
            textColor={"#90cdf4"}
            leftIcon={<RepeatIcon />}
            size="sm"
            variant="ghost"
            onClick={() => {
              handleRefresh();
            }}
          >
            Refresh
          </Button>
        </HStack>
      </Box>

      <div style={{ height: "5px" }}>
        <Divider mt="0.5" bg="white" />
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          maxWidth: "100vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer
          m={2}
          display={"block"}
          overflowY="auto"
          width={`calc(100vw - 175px)`}
          maxHeight={`calc(91vh - 60px)`}
        >
          <Table variant={"striped"}>
            <Thead>
              <Tr>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                ></Th>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                >
                  Status
                </Th>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer"
                  onClick={() => handleHeaderClick("directorAlert")}
                >
                  Department
                </Th>

                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer"
                  onClick={() => handleHeaderClick("email")}
                >
                  Email
                </Th>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer"
                  onClick={() => handleHeaderClick("countyName")}
                >
                  County
                </Th>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer"
                  onClick={() => handleHeaderClick("role")}
                >
                  Role
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedUserData.map((user, index) => (
                <Tr key={index}>
                  <Td>
                    <DeleteIcon
                      color="red.500"
                      _hover={{ color: "red.700", cursor: "pointer" }}
                      // TODO Remove in list
                      onClick={() => handleRemove(user.id)}
                    />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontSize={"sm"}>{user.directorStatus}</Text>
                      {user.directorStatus === "PENDING" && (
                        <HStack justifyContent={"space-between"}>
                          <IconButton
                            colorScheme="green"
                            onClick={() => handleAccept(user.id)}
                            icon={<CheckIcon />}
                            size={"xs"}
                            aria-label={"ok"}
                          />
                          <IconButton
                            colorScheme="red"
                            onClick={() => handleReject(user.id)}
                            icon={<CloseIcon />}
                            size={"xs"}
                            aria-label={"ok"}
                          />
                        </HStack>
                      )}
                    </Box>
                  </Td>
                  <Td>
                    <HStack>
                      <Image
                        mb={2}
                        src={iconPerType[user.directorAlert]}
                        boxSize={"30px"}
                      />
                      <Text>{user.directorAlert}</Text>
                    </HStack>
                  </Td>

                  <Td>{user.email}</Td>
                  <Td>{user.countyName.replace(/([A-Z])/g, " $1").trim()}</Td>
                  <Td>{user.role}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DirectorsTable;
