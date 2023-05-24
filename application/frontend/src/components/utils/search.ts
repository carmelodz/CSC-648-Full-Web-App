// Base interface for searching
export interface ISearchOptionMap {
  checkboxes: { [key: string]: boolean };
  input: string;
  multiselect: string[];
}
// Render all alert types to page, with these type properties
export const defaultSearchOption: ISearchOptionMap = {
  checkboxes: {
    WEATHER: true,
    SECURITY: true,
    FIRE: true,
    HEALTH: true,
  },
  input: "",
  multiselect: ["Option 1"],
};
