import React from "react";

import { Flex, Box } from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import AlertsTable from "./table/AlertsTable";
import UsersTable from "./table/UsersTable";
import DirectorsTable from "./table/DirectorsTable";

const MotionBox = motion(Box);

const AlertAdminPanel: React.FC = () => {
  const [activeLink, setActiveLink] = React.useState("alerts");

  // Mapping tables for alerts and users to Admin Dashboard
  type ComponentMap = Record<string, React.FC>;
  const components: ComponentMap = {
    alerts: AlertsTable,
    users: UsersTable,
    directors: DirectorsTable,
  };

  const ActiveComponent: React.FC = components[activeLink];

  return (
    <Flex height="91vh" width="100vw" flexDirection="row">
      <Flex flex={1} maxWidth="175px">
        <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      </Flex>

      <Flex flex={1}>
        <Flex flex={1} flexDirection="column">
          <Flex flex={1}>
            <Flex flex={1} flexDirection="column">
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeLink}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ActiveComponent />
                </MotionBox>
              </AnimatePresence>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AlertAdminPanel;
