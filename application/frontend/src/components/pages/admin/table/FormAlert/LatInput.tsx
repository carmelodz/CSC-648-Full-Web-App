import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

interface LatInputProps {
  value: number | string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Render latitude location input field, and take in user input, and store in database
const LatInput: React.FC<LatInputProps> = ({ value, error, onChange }) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>Latitude</FormLabel>
    <Input
      name="lat"
      defaultValue={value}
      type="number"
      placeholder="Enter the latitude"
      onChange={onChange}
    />
    <FormHelperText color="red.500">{error}</FormHelperText>
  </FormControl>
);

export default LatInput;
