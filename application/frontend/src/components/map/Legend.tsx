import React from "react";
import { Box } from "@chakra-ui/react";
import { IThreshold } from "./mapConfig";

interface LegendProps {
  thresholds: IThreshold[];
}

const Legend = ({ thresholds }: LegendProps) => {
  return (
    <Box h="20px" w="100%" position="relative" boxShadow="0 0 0 2px black">
      {thresholds.map((t: IThreshold, index: number) => (
        <Box
          key={t.color}
          position="absolute"
          left={`${(t.range[0] / 100) * 100}%`}
          w={`${((t.range[1] - t.range[0]) / 100) * 100}%`}
          h="20px"
          bg={t.color}
        >
          {index < thresholds.length && (
            <Box
              position="absolute"
              top="20px"
              transform="translateX(-50%)"
              fontWeight="bold"
              textColor={"black"}
            >
              {t.rangeColor[0]}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Legend;
