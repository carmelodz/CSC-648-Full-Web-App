import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { sortByAttribute } from "../../../utils/textTransform";

// Base parameter fields for user table
interface IUser {
  username: string;
  email: string;
  role: string;
}
// User template, will auto-update when connected with database
const userData: IUser[] = [
  { username: "A", email: "john.doe@example.com", role: "USER" },
  { username: "C", email: "john.doe@example.com", role: "USER" },
];

const RequestsTable = () => {
  const [sortedUserData, setSortedUserData] = useState(userData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [users, setUsers] = useState(userData);

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newRole = e.target.value;
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
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
  // Render users table page
  return (
    <>
      <Box height="36px">
        <HStack spacing={"20"} ml={3} mt={1}>
          <Text size="sm" fontSize={20}>
            Admin Requests
          </Text>

          <Button
            textColor={"#90cdf4"}
            leftIcon={<RepeatIcon />}
            size="sm"
            variant="ghost"
            onClick={() => {
              // Handle the refresh button action
              // eslint-disable-next-line
            }}>
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
          alignItems: "center", // eslint-disable-next-line
        }}>
        <TableContainer
          m={2}
          display={"block"}
          overflowY="auto"
          width={`calc(100vw - 175px)`} // eslint-disable-next-line
          maxHeight={`calc(91vh - 60px)`}>
          <Table variant={"striped"}>
            <Thead>
              <Tr>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer" // eslint-disable-next-line
                  onClick={() => handleHeaderClick("username")}>
                  Username
                </Th>
                <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer" // eslint-disable-next-line
                  onClick={() => handleHeaderClick("email")}>
                  Email
                </Th>
                {/* <Th
                  style={{ position: "sticky", top: 0, background: "#1a202c" }}
                  cursor="pointer"
                  onClick={() => handleHeaderClick("role")}>
                  Role
                </Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {sortedUserData.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(e, index)}
                      style={{
                        backgroundColor: "transparent",
                        color: user.role === "ADMIN" ? "tomato" : "inherit", // eslint-disable-next-line
                      }}>
                      {/* <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option> */}
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

export default RequestsTable;
