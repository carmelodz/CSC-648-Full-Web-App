import React, { Ref } from "react";
import { Box, Flex, Text, Image, HStack, forwardRef } from "@chakra-ui/react";
import { iconPerType } from "../map/marker";
import { useMapContext } from "../pages/map/MapContext";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../sdk/safetyHubAPI/alerts/types";
// TODO Alert
interface CardAlertProps {
  alert: IAlert;
}

export const severityColors: { [key: number]: string } = {
  0: "gray.400",
  1: "green.400",
  2: "green.400",
  3: "blue.400",
  4: "blue.400",
  5: "yellow.400",
  6: "yellow.400",
  7: "yellow.400",
  8: "orange.400",
  9: "red.400",
  10: "red.400",
};

export const CardAlert = forwardRef(
  (props: CardAlertProps, ref: Ref<HTMLDivElement>) => {
    const { alert } = props;

    const borderColor = severityColors[alert.severity];
    const { selectedMarker, setSelectedMarker } = useMapContext();

    const handleCardClick = () => {
      if (selectedMarker && selectedMarker.id === alert.id) {
        setSelectedMarker(null);
      } else {
        setSelectedMarker(alert);
      }
    };

    return (
      <Box
        ref={ref}
        maxW={{ base: "sm", md: "lg", lg: "2xl" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderColor={borderColor}
        m="1"
        bg={
          selectedMarker && selectedMarker.id === alert.id
            ? "whiteAlpha.300"
            : ""
        }
        onClick={handleCardClick}
      >
        <Flex
          justify="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          direction={{ base: "row", md: "row" }}
        >
          <Text
            textColor={"gray.100"}
            m="1"
            fontWeight="bold"
            fontSize={{ base: "xl", md: "2xl" }}
            mb={{ base: "2", md: "0" }}
          >
            {alert.title}
          </Text>

          <Image src={iconPerType[alert.type]} boxSize={"30px"} />
        </Flex>

        <Flex direction="column" pr="2" pb="2" pl="2">
          <Text
            textColor={"gray.400"}
            fontSize={{ base: "md", md: "lg" }}
            mb={{ base: "2", md: "4" }}
          >
            {alert.description}
          </Text>
          <Flex
            justify="space-between"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
          >
            <HStack mb={{ base: "2", md: "0" }}>
              <Text
                textColor={"gray.200"}
                fontSize="sm"
                fontWeight="bold"
                display={{ base: "none", md: "block" }}
              >
                Department:
              </Text>
              <Text textColor={"red.100"}>{alert.countyName}</Text>
            </HStack>
            <Flex alignItems="center">
              <Box
                as="span"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                color={borderColor}
                mr="2"
              >
                {alert.severity}
              </Box>
              <Box
                h={{ base: "2px", md: "3px" }}
                w={{ base: "20px", md: "30px" }}
                bg={borderColor}
                borderRadius="10px"
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  }
);
