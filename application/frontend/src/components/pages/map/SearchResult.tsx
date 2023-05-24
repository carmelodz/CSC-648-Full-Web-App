import React, { useEffect, useState } from "react";
import { Box, Text, Grid } from "@chakra-ui/react";
import { CardAlert } from "../../card/CardAlert";
import { alertData } from "../../fakeData/alert";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../../sdk/safetyHubAPI/alerts/types";
import { useMapContext } from "./MapContext";

const { alerts } = useMapContext();

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function SearchResult() {
  const { selectedMarker, searchOptions, cardRefs } = useMapContext(); // eslint-disable-next-line
  const [filterData, setFilterData] = useState<any>([]);

  useEffect(() => {
    if (searchOptions) {
      const filterList = alertData
        .filter((item) => {
          const multiselect = searchOptions?.multiselect?.map((sel) =>
            slugify(sel)
          );
          if (multiselect.length === 0) {
            return true;
          }
          if (
            multiselect?.length > 0 &&
            multiselect?.includes(slugify(item.department))
          ) {
            // eslint-disable-line
            return true;
          }
          return false;
        })
        .filter((item) => {
          const type = Object.keys(searchOptions?.checkboxes).filter(
            (t: string) => searchOptions?.checkboxes?.[t] === true
          );
          if (type?.includes(item.type)) {
            return true;
          }
          return false;
        })
        .filter((item) => {
          if (!searchOptions?.input) {
            return true;
          }
          if (
            item.title.toLowerCase().includes(searchOptions.input.toLowerCase())
          ) {
            return true;
          }
          return false;
        });

      setFilterData(filterList);
    }
  }, [searchOptions]);
  // Updates card information, as necessary
  useEffect(() => {
    if (selectedMarker !== null) {
      const index = alertData.findIndex(
        (item) => item.id === selectedMarker.id
      );
      if (index !== -1 && cardRefs.current[index]) {
        cardRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedMarker, cardRefs, searchOptions]);

  return (
    <Box>
      <Text mt="2" textColor={"gray.200"} textAlign={"center"}>
        Results
      </Text>
      <Box maxHeight="calc(100vh - 140px)" overflow="auto">
        <Grid templateColumns="repeat(1, 1fr)" gap={5}>
          {alerts.map((item: IAlert, id: number) => (
            <CardAlert
              key={id}
              ref={(el: HTMLElement) => {
                cardRefs.current[id] = el;
              }}
              alert={item}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
