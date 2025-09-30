import Form from 'react-bootstrap/Form';

const Derivacion = () =>{
    return(
        <Form.Select aria-label="Default select example">
            <option>Seleccionar Area</option>
            <option value="1">Gerencia</option>
            <option value="2">Sector de Casos</option>

        </Form.Select>
    )
}

export default Derivacion;