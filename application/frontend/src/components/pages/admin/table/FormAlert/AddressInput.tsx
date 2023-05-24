import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

interface AddressInputProps {
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Render address input field, and take in user input
const AddressInput: React.FC<AddressInputProps> = ({ error, onChange }) => (
  <FormControl py={2} px={4} mb={4} isInvalid={!!error}>
    <FormLabel>Address</FormLabel>
    <Input
      name="address"
      type="text"
      placeholder="Enter the address"
      onChange={onChange}
    />
    <FormHelperText color="red.500">{error}</FormHelperText>
  </FormControl>
);

export default AddressInput;
