import {
  Container,
  Title,
  Text,
  Select,
  Label,
} from "../../styles/Styles.styles";
import "../../index.css";
import { cities } from "../../assets/cities";
import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { Interface } from "readline";

const Home = () => {
  interface CityItem {
    city: string;
    growth_from_2000_to_2013: string;
    latitude: number;
    longitude: number;
    population: string;
    rank: string;
    state: string;
  }
  const cityItem={
    city: "",
    growth_from_2000_to_2013: "",
    latitude: 0,
    longitude: 0,
    population: '',
    rank: '',
    state: '',
  }
  const [cityInfo, setCityInfo] = useState<CityItem>(cityItem);
  const [cityClicked, setCityClicked] = useState<boolean>(false);

  const mapAPI: string = process.env.REACT_APP_MAP_API!;
  mapboxgl.accessToken = mapAPI;
  const mapContainer = useRef(null);
  let lng: number = -97.92977429999999;
  let lat: number = 38.0608445;
  const zoom: number = 3.5;

  const createMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    return map;
  };

  const createMarker = (
    lngLat: [number, number],
    color: string,
    scale: number,
    city: string,
    item: CityItem,
    map: mapboxgl.Map
  ) => {
    const mapMarker = new mapboxgl.Marker({
      color: color,
      scale: scale,
    })
      .setLngLat(lngLat)
      .setPopup(
        new mapboxgl.Popup({
          className: "popup",
          offset: 25,
          closeButton: false,
          maxWidth: "fit-content",
        }).setHTML(`<div>${city}</div>`)
      )
      .addTo(map);
    mapMarker.getElement().addEventListener("click", () => {
      setCityClicked(true);
      setCityInfo(item);
    });
    return mapMarker;
  };

  const [minValue, setMinValue] = useState<string>("0");
  const [maxValue, setMaxValue] = useState<number>(0);
  const getValue = (e: React.MouseEvent<HTMLOptionElement>) => {
    setMinValue(e.currentTarget.value);
    e.currentTarget.value === "1" && setMaxValue(50000);
    e.currentTarget.value === "50000" && setMaxValue(100000);
    e.currentTarget.value === "100000" && setMaxValue(150000);
    e.currentTarget.value === "150001" && setMaxValue(300000);
  };

  useEffect(() => {
    const map = createMap();
    cities.map((item) => {
      if (
        Number(item.population) > Number(minValue) &&
        Number(item.population) < maxValue
      ) {
        createMarker(
          [item.longitude, item.latitude],
          "rgb(115, 127, 233)",
          0.8,
          item.city,
          item,
          map
        );
      }
      return item;
    });
  }, [minValue]);

  return (
    <>
      <Container height="80px" align="center" justify="flex-end">
        <Title>U.S. cities</Title>
      </Container>
      <Container height="450px">
        <div ref={mapContainer} className="map-container" />
      </Container>
      <Container width="100%" position="absolute">
        <Text width="98%" fontSize="12px" marginTop="0px" paddingLeft="30px">
          2013 data
        </Text>
      </Container>
      <Container justify="flex-start" align="flex-start" margin="20px 200px">
        <Container direction="row" margin="20px 0px">
          <Label htmlFor="citiesSelect">Filter by population:</Label>
          <Select id="citiesSelect" defaultValue="" onChange={getValue}>
            <option value="" disabled hidden>
              Select
            </option>
            <option value="1">Under 50000</option>
            <option value="50000">50000 - 100000</option>
            <option value="100000">100000 - 150000</option>
            <option value="150001">Above 150000</option>
          </Select>
        </Container>

        {cityClicked && (
          <Container align="left">
            <Title color="rgb(27, 27, 27)" marginTop="30px">
              {cityInfo.city}, {cityInfo.state}
            </Title>
            <Text paddingRight="0px" marginTop="0px">
              Population: {cityInfo.population} inhabitants
              <br />
              Growth/3 yrs: {cityInfo.growth_from_2000_to_2013}
            </Text>
          </Container>
        )}
      </Container>
    </>
  );
};

export default Home;
