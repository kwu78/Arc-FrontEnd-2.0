
import * as React from 'react';
import { useState,useEffect, useContext } from "react";
import { AutoFixOffSharp, Logout } from '@mui/icons-material';
import {Container, Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import Axios from "axios";



const style = {
    margin: 0,
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,
    zIndex: 1,
    position: 'fixed',
  }
  

function Navigate(props) {
console.log(props.user);
console.log(props.loggedIn)
const[errorMessage,setErrMessage]=useState('');
function Logout(){
  
  Axios.get('/api/logout');
}
function search(){
  
  let search=document.getElementById('search').value;
  console.log("searched");
  Axios.post('/posts',search).then(function(response){
    if(response.data.status=="error"){
      setErrMessage(response.data.error);
      console.log(response.data.error);
    }else{
      setErrMessage('');
    }
    console.log(response.data);
  });

 
}
 return (
    
  <Navbar style = {style} bg="dark" expand="lg" variant="dark" 
    >
  <Container >
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
        id='search'
      />
      <Button  variant="outline-light" onClick={search} style={{marginTop:"7%"}}>Search</Button>
      </Form>
    
    </Navbar.Collapse>
    
  </Container>
</Navbar>
  
 );
 }

export default Navigate;