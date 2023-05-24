import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Image,
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
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  RepeatIcon,
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { sortByAttribute } from "../../../utils/textTransform";
import { iconPerType } from "../../../map/marker";
import { severityColors } from "../../../card/CardAlert";
import AlertModal from "./AlertModal";
/* eslint import/no-relative-packages: "off" */
import apiClient from "../../../../sdk/safetyHubAPI/ApiClient";
import {
  IAlert,
  ISearchAlertDto,
} from "../../../../sdk/safetyHubAPI/alerts/types";
import { AuthContext } from "../../../../auth/AuthContext";

// Base structure for alerts table
const AlertsTable = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);
  const [sortedAlertData, setSortedAlertData] = useState(alerts);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [modifyAlert, setModifyAlert] = useState<IAlert | null>(null);
  const { user } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isDirectorPending =
    user &&
    user.role === "DIRECTOR_COUNTY" &&
    user.directorStatus !== "APPROVED";

  const handleRefresh = () => {
    if (user && user.role === "DIRECTOR_COUNTY" && user.directorAlert) {
      const searchOptions: ISearchAlertDto = {
        contentSearch: "",
        countySearch: [user.countyName],
        types: [user.directorAlert],
        zipCode: "",
      };

      apiClient.alert.search(searchOptions).then((items) => {
        setAlerts(items);
        setSortedAlertData(items);
      });
    } else {
      apiClient.alert.getAlerts().then((items: IAlert[]) => {
        setAlerts(items);
        setSortedAlertData(items);
      });
    }
  };

  const handleHeaderClick = (attribute: keyof IAlert) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    if (!sortedAlertData) return;
    const sortedData = [...sortedAlertData].sort(
      sortByAttribute<IAlert>(attribute, sortOrder)
    );

    setSortedAlertData(sortedData);
    setSortOrder(newSortOrder);
  };

  const handleRemove = (AlertID: string) => {
    apiClient.alert.deleteAlert(AlertID).then(() => {
      toast({
        title: "New alert was deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setAlerts((prevItems) => prevItems.filter((item) => item.id !== AlertID));
      setSortedAlertData((prevItems) =>
        prevItems.filter((item) => item.id !== AlertID)
      );
    });
  };

  const handleAccept = (AlertID: string) => {
    apiClient.alert
      .updateAlert(AlertID, { alertStatus: "APPROVED" })
      .then(() => {
        toast({
          title: "Alert are now approved !",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setAlerts((prevItems) =>
          prevItems.map((item) =>
            item.id === AlertID ? { ...item, alertStatus: "APPROVED" } : item
          )
        );
        setSortedAlertData((prevItems) =>
          prevItems.map((item) =>
            item.id === AlertID ? { ...item, alertStatus: "APPROVED" } : item
          )
        );
      });
  };

  const handleReject = (AlertID: string) => {
    apiClient.alert
      .updateAlert(AlertID, { alertStatus: "REJECTED" })
      .then(() => {
        toast({
          title: "Alert are now rejected !",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setAlerts((prevItems) =>
          prevItems.map((item) =>
            item.id === AlertID ? { ...item, alertStatus: "REJECTED" } : item
          )
        );
        setSortedAlertData((prevItems) =>
          prevItems.map((item) =>
            item.id === AlertID ? { ...item, alertStatus: "REJECTED" } : item
          )
        );
      });
  };

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box height="36px">
        <HStack spacing={"20"} ml={3} mt={1}>
          <Text size="sm" fontSize={20}>
            Alerts
          </Text>

          <Box>
            <Button
              textColor={"#90cdf4"}
              leftIcon={<AddIcon />}
              size="sm"
              variant="ghost"
              onClick={() => {
                setModifyAlert(null);
                onOpen();
              }}
              isDisabled={isDirectorPending as boolean}
            >
              Create
            </Button>
            <Button
              textColor={"#90cdf4"}
              leftIcon={<RepeatIcon />}
              size="sm"
              variant="ghost"
              onClick={() => {
                handleRefresh();
              }}
              isDisabled={isDirectorPending as boolean}
            >
              Refresh
            </Button>
          </Box>
        </HStack>
      </Box>

      <div style={{ height: "5px" }}>
        <Divider mt="0.5" bg="white" />
      </div>

      {isDirectorPending ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flex={1}
          maxW={"100vw"}
          h={"85vh"}
        >
          <Text> Your Are {user?.directorStatus} Status </Text>
        </Box>
      ) : (
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
            <Table variant={"striped"} size="md">
              <Thead>
                <Tr>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                  ></Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                  >
                    Status
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                    cursor="pointer"
                    onClick={() => handleHeaderClick("type")}
                  >
                    Type
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                    cursor="pointer"
                    onClick={() => handleHeaderClick("countyName")}
                  >
                    County
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                    cursor="pointer"
                    onClick={() => handleHeaderClick("severity")}
                  >
                    Severity
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                  >
                    Latitude
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                  >
                    Longitude
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                    cursor="pointer"
                    onClick={() => handleHeaderClick("title")}
                  >
                    Title
                  </Th>
                  <Th
                    style={{
                      position: "sticky",
                      top: 0,
                      background: "#1a202c",
                    }}
                    cursor="pointer"
                    onClick={() => handleHeaderClick("description")}
                  >
                    Description
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedAlertData &&
                  sortedAlertData.map((alert: IAlert) => (
                    <Tr key={alert.id}>
                      <Td>
                        <EditIcon
                          color="blue.500"
                          _hover={{ color: "blue.700", cursor: "pointer" }}
                          onClick={() => {
                            setModifyAlert({
                              ...alert,
                              countyName: alert.countyName
                                .replace(/([A-Z])/g, " $1")
                                .trim(),
                            });
                            onOpen();
                          }}
                          mr={2}
                        />
                        <DeleteIcon
                          color="red.500"
                          _hover={{ color: "red.700", cursor: "pointer" }}
                          onClick={() => handleRemove(alert.id)}
                        />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontSize={"sm"}>{alert.alertStatus}</Text>
                          {alert.alertStatus === "PENDING" &&
                            user?.role === "ADMIN" && (
                              <HStack justifyContent={"space-between"}>
                                <IconButton
                                  colorScheme="green"
                                  onClick={() => handleAccept(alert.id)}
                                  icon={<CheckIcon />}
                                  size={"xs"}
                                  aria-label={"ok"}
                                />
                                <IconButton
                                  colorScheme="red"
                                  onClick={() => handleReject(alert.id)}
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
                            src={iconPerType[alert.type]}
                            boxSize={"30px"}
                          />
                          <Text>{alert.type}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        {alert.countyName.replace(/([A-Z])/g, " $1").trim()}
                      </Td>
                      <Td textColor={severityColors[alert.severity]}>
                        {alert.severity}
                      </Td>
                      <Td>{alert.lat}</Td>
                      <Td>{alert.lng}</Td>
                      <Td>{alert.title}</Td>
                      <Td>{alert.description}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
      <AlertModal isOpen={isOpen} onClose={onClose} modifyAlert={modifyAlert} />
    </>
  );
};

export default AlertsTable;
