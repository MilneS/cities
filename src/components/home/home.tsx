import { Container } from "../../styles/Container.styles";

const Home = () => {
  return (
    <>
      <Container height='100px' align='flex-end' bgColor='rgb(177, 238, 217)'><p>Banner</p> </Container>
      <Container height='400px'>Map </Container>
      <Container justify='flex-start'><p>Info</p> </Container>
    </>
  );
};

export default Home;
