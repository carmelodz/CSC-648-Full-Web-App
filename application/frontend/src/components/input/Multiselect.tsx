import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";
import { countiesName } from "../map/county";
import { useMapContext } from "../pages/map/MapContext";

// Handle multiple input selection from user, auto-update accordingly
export default function Multiselect() {
  const { searchOptions, setSearchOptions } = useMapContext();

  const handleMultiselectChange = (selectedOptions: string[]) => {
    setSearchOptions({
      ...searchOptions,
      multiselect: selectedOptions,
    });
  };

  return (
    <Stack direction="column" mr="1">
      <Text textColor={"gray.200"}>Type Search</Text>
      <AutoComplete openOnFocus multiple onChange={handleMultiselectChange}>
        <AutoCompleteInput
          bg="#232934"
          _hover={{ backgroundColor: "#272d38" }}
          _placeholder={{ color: "gray.500" }}
          placeholder="County Search..."
          variant="filled"
          textColor={"white"}
          mb="2"
        >
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                bg="gray.300"
                textColor={"black"}
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))
          }
        </AutoCompleteInput>
        <AutoCompleteList>
          {countiesName.map((county) => (
            <AutoCompleteItem
              key={county}
              textColor={"white"}
              value={county}
              textTransform="capitalize"
              _selected={{ bg: "whiteAlpha.50" }}
              _focus={{ bg: "whiteAlpha.100" }}
            >
              {county}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
