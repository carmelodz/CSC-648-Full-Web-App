import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../../sdk/safetyHubAPI/alerts/types";
import { defaultSearchOption, ISearchOptionMap } from "../../utils/search";

// Base inferface for all map components
interface MapContextData {
  selectedMarker: IAlert | null;
  setSelectedMarker: React.Dispatch<React.SetStateAction<IAlert | null>>;

  searchOptions: ISearchOptionMap;
  setSearchOptions: React.Dispatch<React.SetStateAction<ISearchOptionMap>>;
  cardRefs: React.MutableRefObject<(HTMLElement | null)[]>;

  alerts: IAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<IAlert[]>>;
  // TODO add IAlert[] list
}

// Base props for all map elements
const MapContext = createContext<MapContextData>({
  selectedMarker: null,
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  setSelectedMarker: () => {},
  searchOptions: defaultSearchOption,
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  setSearchOptions: () => {},

  cardRefs: { current: [] },
  alerts: [],
  /* eslint-disable-next-line @typescript-eslint/no-empty-function */
  setAlerts: () => {},
});

export const useMapContext = () => useContext(MapContext);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<IAlert | null>(null);
  const [searchOptions, setSearchOptions] =
    useState<ISearchOptionMap>(defaultSearchOption);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  // Render all map elements to page, using map API
  return (
    <MapContext.Provider
      value={{
        selectedMarker,
        setSelectedMarker,
        searchOptions,
        setSearchOptions,
        cardRefs,
        alerts,
        setAlerts,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
