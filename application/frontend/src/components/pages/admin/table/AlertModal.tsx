import React, { useState, useEffect } from "react";
import {
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

/* eslint import/no-relative-packages: "off" */
import {
  IAlert,
  IAlertCreateDto,
  IAlertUpdateDto,
} from "../../../../sdk/safetyHubAPI/alerts/types";
import SliderSeverity from "../../../input/SliderSeverity";
import TitleInput from "./FormAlert/TitleInput";
import DrescriptionInput from "./FormAlert/DescriptionInput";
import TypeSelect from "./FormAlert/TypeSelect";
import DepartmentSelect from "./FormAlert/DepartmentSelect";
import { useFormValidation } from "./FormAlert/hooks/useFormValidation";
import LocationInput from "./FormAlert/LocationInput";
import apiClient from "../../../../sdk/safetyHubAPI/ApiClient";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  modifyAlert: IAlert | null;
}
// Alert modal must contain these interface parameters
export interface FormValues {
  title: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  countyName: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  modifyAlert,
}) => {
  const [locationType, setLocationType] = useState<"coordinates" | "address">(
    "coordinates"
  );
  const [selectedType, setSelectedType] = useState<string>(
    modifyAlert ? modifyAlert.type : "FIRE"
  );
  const [severity, setSeverity] = useState<number>(5);
  // Set alert fields to default values (non-null empty)
  const [formValues, setFormValues] = useState<FormValues>({
    address: "",
    lat: modifyAlert ? modifyAlert.lat : 0,
    lng: modifyAlert ? modifyAlert.lng : 0,
    title: modifyAlert ? modifyAlert.title : "",
    description: modifyAlert ? modifyAlert.description : "",
    countyName: modifyAlert ? modifyAlert.countyName : "Alameda",
  });

  const { formErrors, setFormErrors, validateForm } = useFormValidation({
    title: "",
    description: "",
    lat: "",
    lng: "",
    address: "",
  });
  const toast = useToast();

  const handleSubmit = () => {
    if (validateForm(formValues, locationType)) {
      // console.log("Modal", formValues, selectedType, severity);
      if (modifyAlert) {
        const alert: IAlertUpdateDto = {
          lat: parseFloat(String(formValues.lat)),
          lng: parseFloat(String(formValues.lng)),
          severity,
          type: selectedType,
          title: formValues.title,
          description: formValues.description,
          zipCode: "",
          countyName: formValues.countyName.replace(/ /g, ""),
        };

        apiClient.alert
          .updateAlert(modifyAlert.id, alert)
          .then(() => {
            toast({
              title: "Alert was updated",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch(() => {
            toast({
              title: "Error occured in update",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        // TODO update
      } else {
        const alert: IAlertCreateDto = {
          lat: parseFloat(String(formValues.lat)),
          lng: parseFloat(String(formValues.lng)),
          severity,
          type: selectedType,
          title: formValues.title,
          description: formValues.description,
          zipCode: "",
          countyName: formValues.countyName.replace(/ /g, ""),
        };

        apiClient.alert
          .createAlert(alert)
          .then(() => {
            toast({
              title: "New alert was created",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch(() => {
            toast({
              title: "Error occured in creating",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "countyName") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value.replace(/ /g, ""),
      }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(
      e.target.value as "WEATHER" | "SECURITY" | "HEALTH" | "FIRE"
    );
  };

  useEffect(() => {
    setSelectedType(modifyAlert ? modifyAlert.type : "FIRE");
    setSeverity(modifyAlert ? modifyAlert.severity : 5);

    setFormValues({
      address: "",
      lat: modifyAlert ? modifyAlert.lat : 0,
      lng: modifyAlert ? modifyAlert.lng : 0,
      title: modifyAlert ? modifyAlert.title : "",
      description: modifyAlert ? modifyAlert.description : "",
      countyName: modifyAlert ? modifyAlert.countyName : "Alameda",
    });
  }, [modifyAlert]);

  useEffect(() => {
    setFormErrors({
      title: "",
      description: "",
      lat: "",
      lng: "",
      address: "",
    });
  }, [isOpen, setFormErrors]);
  // Render alert modal window, and take in user input, and store in database
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="8px">
          <ModalHeader>
            {modifyAlert ? "Update Alert" : "Create Alert"}{" "}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <TitleInput
              value={modifyAlert ? modifyAlert.title : ""}
              error={formErrors.title}
              onChange={handleChange}
            />

            <DrescriptionInput
              value={modifyAlert ? modifyAlert.description : ""}
              error={formErrors.description}
              onChange={handleChange}
            />

            <HStack mb={4}>
              <TypeSelect
                value={modifyAlert ? modifyAlert.type : "FIRE"}
                selectedType={
                  selectedType as "WEATHER" | "SECURITY" | "HEALTH" | "FIRE"
                }
                onChange={handleTypeChange}
              />

              <FormControl>
                <FormLabel>Severity</FormLabel>
                <SliderSeverity severity={severity} setSeverity={setSeverity} />
              </FormControl>
            </HStack>

            <LocationInput
              locationType={locationType}
              setLocationType={setLocationType}
              modifyAlert={modifyAlert}
              formErrors={{
                lat: formErrors.lat,
                lng: formErrors.lng,
                address: formErrors.address,
              }}
              onChange={handleChange}
            />

            <DepartmentSelect
              value={modifyAlert ? modifyAlert.countyName : "Alameda"}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="solid" colorScheme="blue">
              {modifyAlert ? "Save" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlertModal;
