import React, { useEffect, useState } from "react";
import { Grid, Text, Center, Stack, Box } from "@chakra-ui/react";
import { CardAlert } from "../../card/CardAlert";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../../sdk/safetyHubAPI/alerts/types";
import apiClient from "../../../sdk/safetyHubAPI/ApiClient";

export const History = () => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    apiClient.user.getNotifications().then((items: IAlert[]) => {
      setAlerts(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box h="94vh">
      <Text
        textAlign={"center"}
        fontWeight={"medium"}
        style={{ backgroundColor: "red" }}
        ml="2" // eslint-disable-next-line
        fontSize="3xl">
        Alert History
      </Text>
      <Stack py={{ base: 20, md: 30 }}>
        <Center>
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            {alerts.map((item: IAlert, id: number) => (
              <CardAlert key={id} alert={item} />
            ))}
          </Grid>
        </Center>
      </Stack>
    </Box>
  );
};
