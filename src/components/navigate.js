
import { AutoFixOffSharp, Logout } from '@mui/icons-material';
import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import Axios from "axios";

function navigate(props) {
console.log(props.user);
console.log(props.loggedIn)
function Logout(){
  props.loggedIn=false;
  Axios.get('/api/logout');
}
 return (
    
  <Navbar bg="dark" expand="lg" variant="dark" style={{margin:0}}>
  <Container>
    <Navbar.Brand className="bartitle" href="/">
      <img src="img/logowhite.png" width='35' height='35' style={{marginTop:"20%"}}/>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="pages-name">
        <Nav.Link href="/">Home</Nav.Link>
        {props.loggedIn?
          <Nav.Link onClick={Logout} href="/">Logout</Nav.Link>
        :
        <Nav.Link href="/login">Login</Nav.Link>
        }
        
      
        
      </Nav>
      <Form className="search-all d-flex">
      <FormControl
        style={{fontSize:"1.5rem", marginRight:"2%", marginTop:"7%"}}
        type="search"
        placeholder="Search"
        className="mr-2 search-box"
        aria-label="Search"
      />
      <Button variant="outline-light" style={{marginTop:"7%"}}>Search</Button>
    </Form>
    </Navbar.Collapse>
    
  </Container>
</Navbar>
  
 );
 }

export default navigate;