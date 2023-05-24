import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { countiesName } from "../../../../map/county";

interface DepartmentSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
// Render department input field, and take in user input, switch to that department
const DepartmentSelect: React.FC<DepartmentSelectProps> = ({
  value,
  onChange,
}) => (
  <FormControl mb={4}>
    <FormLabel>County</FormLabel>
    <Select name="countyName" defaultValue={value} onChange={onChange}>
      {countiesName.map((dept: string, id: number) => (
        <option key={id} value={dept}>
          {dept}
        </option>
      ))}
    </Select>
  </FormControl>
);

export default DepartmentSelect;
