import React from "react";
import { HStack, Box, Button, Flex } from "@chakra-ui/react";
import LatInput from "./LatInput";
import LongInput from "./LongInput";
import AddressInput from "./AddressInput";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../../../../sdk/safetyHubAPI/alerts/types";

// Base constructor for location input fields
interface LocationInputProps {
  locationType: "coordinates" | "address";
  setLocationType: (type: "coordinates" | "address") => void;
  modifyAlert: IAlert | null;
  formErrors: {
    lat: string;
    lng: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Render input location field as box on page element
const LocationInput: React.FC<LocationInputProps> = ({
  locationType,
  setLocationType,
  modifyAlert,
  formErrors,
  onChange,
}) => {
  return (
    <Box borderRadius="8px" border="1px solid" borderColor="gray.300" mb={4}>
      <Box>
        <Flex align="center" justify="center">
          <Button
            style={{ margin: 0, backgroundColor: "transparent" }}
            _hover={{ backgroundColor: "transparent" }}
            variant="ghost"
            flex="1"
            colorScheme="blue"
            isActive={locationType === "coordinates"}
            borderRight={"1px"}
            borderRadius="0px"
            onClick={() => setLocationType("coordinates")}
          >
            Coordinate
          </Button>
          <Button
            style={{ margin: 0, backgroundColor: "transparent" }}
            _hover={{ backgroundColor: "transparent" }}
            variant="ghost"
            flex="1"
            colorScheme="blue"
            borderRadius="0px"
            isActive={locationType === "address"}
            onClick={() => setLocationType("address")}
          >
            Address
          </Button>
        </Flex>
        <Box position="relative" height="3px" width="100%">
          <Box
            position="absolute"
            height="100%"
            width="50%"
            bg="#8bceee"
            transition="transform 0.3s ease-in-out"
            transform={
              locationType === "coordinates"
                ? "translateX(0%)"
                : "translateX(100%)"
            }
          />
        </Box>
      </Box>

      {locationType === "coordinates" ? (
        <HStack py={2} px={4} mb={4}>
          <LatInput
            value={modifyAlert ? modifyAlert.lat : ""}
            error={formErrors.lat}
            onChange={onChange}
          />

          <LongInput
            value={modifyAlert ? modifyAlert.lng : ""}
            error={formErrors.lng}
            onChange={onChange}
          />
        </HStack>
      ) : (
        <AddressInput error={formErrors.address} onChange={onChange} />
      )}
    </Box>
  );
};

export default LocationInput;
