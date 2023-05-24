export const apiKey: string = process.env.REACT_APP_API_KEY ?? "";

export const californiaCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

export const zoom = 8;

export const californiaBounds = {
  north: 42.0995169,
  south: 32.2343516,
  west: -124.482003,
  east: -114.031211,
};

export interface IThreshold {
  color: string;
  rangeColor: [number, number];
  range: [number, number];
}

export const LegendMapThresholds: IThreshold[] = [
  { color: "red", rangeColor: [9, 100], range: [90, 100] },
  { color: "orange", rangeColor: [7, 8], range: [70, 89] },
  { color: "yellow", rangeColor: [5, 6], range: [50, 69] },
  { color: "blue", rangeColor: [2, 4], range: [30, 49] },
  { color: "green", rangeColor: [1, 1], range: [10, 29] },
  { color: "transparent", rangeColor: [0, 0], range: [0, 9] },
];

export const mapOptions = {
  styles: [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#444444",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
        {
          hue: "#ff0000",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.icon",
      stylers: [
        {
          hue: "#ff2c00",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#ec4646",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          saturation: "-95",
        },
        {
          lightness: "73",
        },
        {
          gamma: "0.91",
        },
        {
          weight: "1.45",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          saturation: "24",
        },
      ],
    },
  ],
};
