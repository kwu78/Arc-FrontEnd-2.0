import React, { useState,useEffect, useContext } from "react";
import Modal from 'react-bootstrap/Modal';

import {Button, Form, Figure} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";

function Comment() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLiked, setLikeState] = useState(false);
  function handleClicked(){
    setLikeState(!isLiked);
  }
 
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>
    <div id="myModal" >
    <Modal  show={show} size="lg" animation={false} onHide={handleClose} centered >
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Figure>
        <Figure.Image
          width={400}
          height={300}
          alt="171x180"
          src="img/portfolio/05-large.jpg"
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
        
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  </>
  )
}

export default Comment;
