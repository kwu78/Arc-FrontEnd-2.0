import React, { useState,useEffect, useContext } from "react";
import Modal from 'react-bootstrap/Modal';

import {Button, Form, Figure} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";

function Comment(props) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [isLiked, setLikeState] = useState(false);
  function handleClicked(){
    setLikeState(!isLiked);
  }
 
  return (
    <>
    {/* <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button> */}
    
    <Modal {...props}  size="lg" animation={false}  centered >
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Figure>
        <Figure.Image
          width={400}
          height={300}
          alt="171x180"
          src="img/portfolio/03-large.jpg"
        />
        
        <Figure.Caption className='post-describe'>
        <h4>
          Description <br></br> Village, nature, watercolor
          </h4>
        </Figure.Caption>
      </Figure>
      <div className='toggle-like'>
      <Button variant="secondary" onClick={handleClicked}>
        {isLiked? "Unlike":"Like"}
      </Button>
      </div>
       <Form>
      <Form.Group className="mb-3" >
    <Form.Label>Comment</Form.Label>
    <Form.Control  />
      </Form.Group>
      <Button style={{marginLeft:"90%"}} variant="secondary" type="submit">
          Comment
        </Button>
     </Form>
      <Modal.Footer>
        
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
   
  </>
  )
}

export default Comment;
