import { Container, Title, Text } from "../../styles/Styles.styles";
import '../../index.css'
import { cities } from "../../assets/cities";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Home = () => {
  const mapAPI: string = process.env.REACT_APP_MAP_API!;
  mapboxgl.accessToken = mapAPI;
  const mapContainer = useRef(null);
  let lng: number=-97.92977429999999
  let lat: number=38.0608445;
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
          className: 'popup',
          offset: 25,
          closeButton: false,
          maxWidth: "fit-content",
        }).setHTML(`<div>${target}</div>`)
      )
      .addTo(map);
    return mapMarker;
  };

  useEffect(() => {
    const map = createMap();

    cities.map((item) => {
      if (item.longitude && item.latitude) {        
         createMarker(
              [item.longitude, item.latitude],
              "rgb(115, 127, 233)",
              0.8,
              item.city,
              map
            );}
        return item;
    });
  }, []);

  return (
    <>
      <Container height="80px" align="flex-end" >
        <Title>U.S. cities</Title>
      </Container>
      <Container height="450px">
        <div ref={mapContainer} className="map-container" />{" "}
      </Container>
      <Container justify="flex-start">
        <Text marginLeft="200px">Info</Text>
      </Container>
    </>
  );
};

export default Home;
