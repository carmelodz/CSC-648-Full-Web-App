// useFormValidation.ts
import { useState } from "react";
import type { FormValues } from "../../AlertModal";

interface FormErrors {
  title: string;
  description: string;
  lat: string;
  lng: string;
  address: string;
}
// Form and input validation for Admin input metrics
export const useFormValidation = (initialErrors: FormErrors) => {
  const [formErrors, setFormErrors] = useState<FormErrors>(initialErrors);

  // Base constructor for form fields
  const validateForm = (
    formValues: FormValues,
    locationType: string
  ): boolean => {
    let isValid = true;
    const errors: FormErrors = {
      title: "",
      description: "",
      lat: "",
      lng: "",
      address: "",
    };

    if (!formValues.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formValues.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (locationType === "coordinates") {
      if (!formValues.lat || Number.isNaN(formValues.lat)) {
        errors.lat = "Valid latitude is required";
        isValid = false;
      } else {
        errors.lat = "";
      }

      if (!formValues.lng || Number.isNaN(formValues.lng)) {
        errors.lng = "Valid longitude is required";
        isValid = false;
      } else {
        errors.lng = "";
      }

      errors.address = "";
    } else if (locationType === "address") {
      if (!formValues.address.trim()) {
        errors.address = "Address is required";
        isValid = false;
      } else {
        errors.address = "";
      }

      errors.lat = "";
      errors.lng = "";
    }

    setFormErrors(errors);
    return isValid;
  };

  return { formErrors, setFormErrors, validateForm };
};
