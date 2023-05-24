import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { severityColors } from "../card/CardAlert";

// Base interface for alert severity level
interface SliderSeverityProps {
  severity: number;
  setSeverity: React.Dispatch<React.SetStateAction<number>>;
}
// Base prop elements
const SliderSeverity: React.FC<SliderSeverityProps> = ({
  severity,
  setSeverity,
}) => {
  const thumbStyle = {
    background: severityColors[severity],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "25px",
    height: "25px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
    outline: "none",
  };
  // Render severity level slider to page
  return (
    <Slider
      value={severity}
      min={0}
      max={10}
      ml={2}
      mr={2}
      step={1}
      onChange={(value: number) => setSeverity(value)}
    >
      <SliderTrack>
        <SliderFilledTrack bg={severityColors[severity]} />
      </SliderTrack>
      <SliderThumb boxSize={2} style={thumbStyle}>
        <Box
          textColor={"black"}
          textAlign="center"
          style={{ fontSize: "15px" }}
        >
          {severity}
        </Box>
      </SliderThumb>
    </Slider>
  );
};

export default SliderSeverity;
