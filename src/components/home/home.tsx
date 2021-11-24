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

const Home = () => {
  const [cityInfo, setCityInfo] = useState<any>({});
  const [cityClicked, setCityClicked] = useState<boolean>(false);

  const mapAPI: string = process.env.REACT_APP_MAP_API!;
  mapboxgl.accessToken = mapAPI;
  const mapContainer = useRef(null);
  let lng: number = -97.92977429999999;
  let lat: number = 38.0608445;
  const zoom: number = 4;

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
    item: any,
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
      <Container height="80px" align="center">
        <Title>U.S. cities</Title>
      </Container>
      <Container height="450px">
        <div ref={mapContainer} className="map-container" />
      </Container>
      <Container justify="flex-start" align="flex-start" margin="20px 200px">
        <Container direction="row">
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
          <Text>
            In 2013, {cityInfo.city}, {cityInfo.state} counted{" "}
            {cityInfo.population} inhabitants. <br />
            From 2000 to 2013, the population grew by{" "}
            {cityInfo.growth_from_2000_to_2013}
          </Text>
        )}
      </Container>
    </>
  );
};

export default Home;
