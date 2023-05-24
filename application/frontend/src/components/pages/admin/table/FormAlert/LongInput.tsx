import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

interface LongInputProps {
  value: number | string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Render longitude location input field, and take in user input, and store in database
const LongInput: React.FC<LongInputProps> = ({ value, error, onChange }) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>Longitude</FormLabel>
    <Input
      name="lng"
      defaultValue={value}
      type="number"
      placeholder="Enter the longitude"
      onChange={onChange}
    />
    <FormHelperText color="red.500">{error}</FormHelperText>
  </FormControl>
);

export default LongInput;
