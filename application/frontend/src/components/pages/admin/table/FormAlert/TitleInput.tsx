import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

// Base constructor for alert title box
interface TitleInputProps {
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// Render alert title input field, and take in user input, and store in database
const TitleInput: React.FC<TitleInputProps> = ({ value, error, onChange }) => (
  <FormControl mb={4} isInvalid={!!error}>
    <FormLabel>Title</FormLabel>
    <Input
      name="title"
      defaultValue={value}
      type="text"
      placeholder="Enter the title"
      onChange={onChange}
    />
    <FormHelperText color="red.500">{error}</FormHelperText>
  </FormControl>
);

export default TitleInput;
