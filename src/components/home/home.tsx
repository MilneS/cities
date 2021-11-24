import { Container, Title, Text, Select, Label } from "../../styles/Styles.styles";
import "../../index.css";
import { cities } from "../../assets/cities";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Home = () => {
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
    target: string,
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
        }).setHTML(`<div>${target}</div>`)
      )
      .addTo(map);
    return mapMarker;
  };

  const getValue=(e: React.MouseEvent)=>{
    const g:any=e.target
console.log(g.value);

  }
  useEffect(() => {



    // const map = createMap();

    // cities.map((item) => {
    //   if (item.longitude && item.latitude) {
    //     createMarker(
    //       [item.longitude, item.latitude],
    //       "rgb(115, 127, 233)",
    //       0.8,
    //       item.city,
    //       map
    //     );
    //   }
    //   return item;
    // });
  }, []);

  return (
    <>
      <Container height="80px" align="center">
        <Title>U.S. cities</Title>
      </Container>
      <Container height="450px">
        {/* <div ref={mapContainer} className="map-container" /> */}
      </Container>
      <Container justify="flex-start" align="flex-start" margin="20px 200px">
        <Container direction="row">
          <Label htmlFor="citiesSelect">Filter by population:</Label>
          <Select id="citiesSelect" defaultValue="" onChange={getValue}>
            <option value="" disabled hidden>Select</option>
            <option value="0">Under 50000</option>
            <option value="100000">50000 - 100000</option>
            <option value="150000">100000 - 150000</option>
            <option value="150001">Above 150000</option>
          </Select>
        </Container>
        <Text>Info</Text>
      </Container>
    </>
  );
};

export default Home;
