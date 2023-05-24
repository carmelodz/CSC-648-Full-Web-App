import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

interface DrescriptionInputProps {
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
// Render description input field, and take in user input, and store to database
const DrescriptionInput: React.FC<DrescriptionInputProps> = ({
  value,
  error,
  onChange,
}) => (
  <FormControl mb={4} isInvalid={!!error}>
    <FormLabel>Description</FormLabel>
    <Textarea
      name="description"
      defaultValue={value}
      placeholder="Enter the description"
      onChange={onChange}
    />
    <FormHelperText color="red.500">{error}</FormHelperText>
  </FormControl>
);

export default DrescriptionInput;
