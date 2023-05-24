import React, { useCallback, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { createRoot } from "react-dom/client";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Box } from "@chakra-ui/react";

import californiaCountiesGeoJSON from "./geojson/california-counties.geojson";

import {
  apiKey,
  californiaBounds,
  californiaCenter,
  LegendMapThresholds,
  mapOptions,
  zoom,
} from "./mapConfig";
import { iconPerType } from "./marker";
import { countDepartmentOccurrences, getColorByThreshold } from "./county";
import Legend from "./Legend";
/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../sdk/safetyHubAPI/alerts/types";

import { useMapContext } from "../pages/map/MapContext";

const Map: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { selectedMarker, setSelectedMarker, cardRefs, alerts } =
    useMapContext();

  function legendToMap() {
    const legend = document.createElement("div");
    legend.style.cssText = `
          position: absolute;
          bottom: 10px;
          left: 10px;
          backgroundColor: white;
          padding: 10px;
          borderRadius: 5px;
          boxShadow: 0px 0px 5px rgba(0,0,0,0.3);
          fontFamily: Arial;
          fontSize: 12px;
          lineHeight: 15px;
          display: flex;
          justifyContent: space-between;
          width: 200px;
        `;
    return legend;
  }

  const createInfoWindow = useCallback(
    (marker: google.maps.Marker, content: string) => {
      const infoWindow = new google.maps.InfoWindow({
        content,
      });

      marker.addListener("click", () => {
        infoWindow.open(mapInstance, marker);
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(mapInstance, marker);
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });
    },
    [mapInstance]
  );

  useEffect(() => {
    if (mapInstance && selectedMarker) {
      mapInstance.panTo({ lat: selectedMarker.lat, lng: selectedMarker.lng });
      mapInstance.setZoom(12);
    }
  }, [mapInstance, selectedMarker]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mapInstance) {
      // Restricted bounds of Map
      mapInstance.setOptions({
        restriction: {
          latLngBounds: californiaBounds,
          strictBounds: false,
        },
      });

      // GeoJson county's California
      const geoJson = new google.maps.Data();
      geoJson.loadGeoJson(californiaCountiesGeoJSON);

      // Color of County
      geoJson.setStyle((features: google.maps.Data.Feature) => {
        const countyName: string = features.getProperty("CountyName");
        const number: number =
          countDepartmentOccurrences(alerts)[countyName] || 0;
        const fillColor = getColorByThreshold(number);

        return {
          fillColor,
          strokeWeight: 1,
          fillOpacity: 0.4,
          strokeColor: "black",
        };
      });

      // Add overlay to map
      geoJson.setMap(mapInstance);

      // Add Gradient Legend to Map
      const legend = legendToMap();
      mapInstance.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
        legend
      );
      createRoot(legend).render(
        <Box w={"100%"}>
          <Box textColor={"black"}>Number of alerts</Box>
          <Legend thresholds={LegendMapThresholds} />
        </Box>
      );

      // Cluster Marker
      const markers: google.maps.Marker[] = [];
      alerts.forEach((item: IAlert, id: number) => {
        const marker = new google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: mapInstance,
          icon: {
            url: iconPerType[item.type],
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16),
          },
        });

        // Create and display the info window
        const infoContent = `<div><strong>${item.title}</strong><br>${item.description}</div>`;
        createInfoWindow(marker, infoContent);

        // Add Action to Individual Marker
        marker.addListener("click", () => {
          setSelectedMarker(item);
        });
        cardRefs.current[id] = null;
        markers.push(marker);
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markerCluster = new MarkerClusterer({ map: mapInstance, markers });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, createInfoWindow, cardRefs, setSelectedMarker]);

  return (
    <GoogleMapReact
      key={JSON.stringify(alerts)}
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={californiaCenter}
      defaultZoom={zoom}
      onGoogleApiLoaded={({ map }) => setMapInstance(map)}
      options={mapOptions}
      yesIWantToUseGoogleMapApiInternals={true}
    />
  );
};

export default Map;
