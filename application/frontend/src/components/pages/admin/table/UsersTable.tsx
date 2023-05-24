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
} from "@chakra-ui/react";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { sortByAttribute } from "../../../utils/textTransform";
/* eslint import/no-relative-packages: "off" */
import { IUser } from "../../../../sdk/safetyHubAPI/user/types";
import apiClient from "../../../../sdk/safetyHubAPI/ApiClient";

// Base parameter fields for user table

// User template, will auto-update when connected with database

const UsersTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sortedUserData, setSortedUserData] = useState<IUser[]>(users);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newRole = e.target.value;
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole as "USER" | "DIRECTOR_COUNTY" | "ADMIN";
    setUsers(updatedUsers);
  };

  const handleHeaderClick = (attribute: keyof IUser) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    const sortedData = [...sortedUserData].sort(
      sortByAttribute<IUser>(attribute, sortOrder)
    );

    setSortedUserData(sortedData);
    setSortOrder(newSortOrder);
  };

  const handleRefresh = () => {
    apiClient.user.getUsers().then((items: IUser[]) => {
      setUsers(items);
      setSortedUserData(items);
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
    apiClient.user.getUsers().then((items: IUser[]) => {
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
            Users
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
                  <Td>{user.email}</Td>
                  <Td>{user.countyName.replace(/([A-Z])/g, " $1").trim()}</Td>

                  <Td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(e, index)}
                      style={{
                        backgroundColor: "transparent",
                        color: user.role === "ADMIN" ? "tomato" : "inherit",
                      }}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="DIRECTOR_COUNTY">DIRECTOR_COUNTY</option>
                    </select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default UsersTable;
