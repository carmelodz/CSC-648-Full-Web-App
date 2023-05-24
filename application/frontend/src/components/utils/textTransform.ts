export function toPascalCase(text: string): string {
  return text
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function sortByAttribute<T>(
  attribute: keyof T,
  sortOrder: "asc" | "desc"
) {
  return (a: T, b: T) => {
    const valueA = a[attribute];
    const valueB = b[attribute];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? (valueA as string).localeCompare(valueB as string)
        : (valueB as string).localeCompare(valueA as string);
    }
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc"
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    }
    return 0;
  };
}
