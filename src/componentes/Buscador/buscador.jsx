import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Buscador = () =>{
    return(
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Buscar gestión</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Buscar gestion con dni y estado</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Panel Superviores</Navbar.Brand>
        </Container>
      </Navbar>

    </>
    )
}

export default Buscador;