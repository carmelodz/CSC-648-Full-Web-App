import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import CardPeople, { IAboutPeople } from "../../card/CardPeople";
import { aboutPeople } from "../../fakeData/aboutPeople";

export default function AboutPage() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }}>
      {aboutPeople.map((item: IAboutPeople, index) => {
        return <CardPeople key={index} info={item} />;
      })}
    </SimpleGrid>
  );
}
