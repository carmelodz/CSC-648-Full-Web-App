import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Text,
  Flex,
  Checkbox,
  HStack,
  Image,
  Stack,
  Input,
  Grid,
  Button,
} from "@chakra-ui/react";
import { CardAlert } from "../../card/CardAlert";
import Multiselect from "../../input/Multiselect";
import { iconPerType } from "../../map/marker";
import { toPascalCase } from "../../utils/textTransform";
/* eslint import/no-relative-packages: "off" */
import {
  IAlert,
  ISearchAlertDto,
} from "../../../sdk/safetyHubAPI/alerts/types";
import { useMapContext } from "./MapContext";
import apiClient from "../../../sdk/safetyHubAPI/ApiClient";

export default function Sidebar() {
  const {
    selectedMarker,
    searchOptions,
    setSearchOptions,
    cardRefs,
    setAlerts,
    alerts,
  } = useMapContext();

  // Handle category selection from user, should auto-update if nesccesary

  const handleCheckboxChange = (label: string, newValue: boolean) => {
    setSearchOptions({
      ...searchOptions,
      checkboxes: {
        ...searchOptions.checkboxes,
        [label]: newValue,
      },
    });
  };

  // Handle input from user, should be set to search parameters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOptions({
      ...searchOptions,
      input: e.target.value,
    });
  };

  const handleSearch = () => {
    const types = Object.keys(searchOptions.checkboxes).filter(
      (key) => searchOptions.checkboxes[key]
    );
    const contentSearch = searchOptions.input;
    let countySearch = searchOptions.multiselect;
    for (let i = 0; i < countySearch.length; i += 1) {
      countySearch[i] = countySearch[i].replace(/ /g, "");
    }

    // Because on first load this value is set to "Option1"
    if (countySearch.length > 0 && countySearch[0] === "Option1") {
      countySearch = [];
    }
    // countySearch[i].replace(/([A-Z])/g, " $1").trim()
    const searchParams: ISearchAlertDto = {
      contentSearch,
      countySearch,
      types,
      zipCode: "",
    };
    apiClient.alert.search(searchParams).then((items) => setAlerts(items));
  };

  // Updates card information, as necessary
  useEffect(() => {
    if (selectedMarker !== null) {
      const index = alerts.findIndex((item) => item.id === selectedMarker.id);
      if (index !== -1 && cardRefs.current[index]) {
        cardRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker, cardRefs]);

  useEffect(() => {
    apiClient.alert.getAlertsApproved().then((items: IAlert[]) => {
      setAlerts(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Divider mb="2" bg="white" />

      <Multiselect />

      <Flex flexWrap="wrap" gap={6}>
        {Object.entries(iconPerType).map(([label, imageUrl]) => (
          <Flex key={label} alignItems="center">
            <Checkbox
              defaultChecked
              onChange={(e) => handleCheckboxChange(label, e.target.checked)}
            >
              <HStack minWidth="110px">
                <Image src={imageUrl} marginRight={2} />
                <Text textColor={"white"}>{toPascalCase(label)}</Text>
              </HStack>
            </Checkbox>
          </Flex>
        ))}
      </Flex>

      <Divider mt="4" bg="white" />

      <Stack direction="column" mr="1">
        <Text mt="2" textColor={"gray.200"}>
          Content Search
        </Text>
        <Input
          onChange={handleInputChange}
          bg="#232934"
          _hover={{ backgroundColor: "#272d38" }}
          _placeholder={{ color: "gray.500" }}
          placeholder="Content Search..."
          variant="filled"
          textColor={"white"}
        />
      </Stack>

      <Grid templateColumns="1fr auto" alignItems="center">
        <Divider h="2px" bg="white" />
        <Button
          ml="1"
          mt="1"
          colorScheme={"cyan"}
          size="sm"
          lineHeight="1"
          // TODO Search
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </Grid>

      <Text mt="2" textColor={"gray.200"}>
        Result
      </Text>
      <Box maxHeight="calc(100vh - 395px)" overflow="auto">
        {alerts.map((item: IAlert, id: number) => (
          <CardAlert
            key={id}
            ref={(el: HTMLElement) => {
              cardRefs.current[id] = el;
            }}
            alert={item}
          />
        ))}
      </Box>
    </Box>
  );
}
