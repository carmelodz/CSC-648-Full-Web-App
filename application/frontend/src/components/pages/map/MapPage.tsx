import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { MapProvider } from "./MapContext";
import Sidebar from "./Sidebar";
import { Footer } from "../../Footer";
import Map from "../../map/Map";

export default function MapPage() {
  return (
    <MapProvider>
      <Grid
        templateAreas={`"nav main"
                  "nav footer"`}
        gridTemplateRows={"1fr 35px"}
        gridTemplateColumns={"1fr 5fr"}
        h="94vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"nav"} minW={["150px", "150px", "310px"]}>
          <Sidebar />
        </GridItem>
        <GridItem bg="green.300" area={"main"}>
          <Map />
        </GridItem>
        <GridItem area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </MapProvider>
  );
}
