import React, { useState,useEffect, useContext } from "react";
import {Modal,FloatingLabel,Form,Row,Col,ToggleButton,ButtonGroup,Container} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";
import addPost from "./addPost.css"


function AddPost(props){
  const [artType,setartType]=useState('artwork');
  const [photoURL,setPhotoURL]=useState(null);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('')
  const history=useHistory();


  const [selectedImage, setSelectedImage] = useState();
  const removeSelectedImage = () => {setSelectedImage();};
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };


  // constructor(props){
  //   super(props)
  //   this.state = {file: null}
  //   this.handleChange = this.handleChange.bind(this)
  //   }
    // handleChange(event) {
    //   this.setState({
    //     file: URL.createObjectURL(event.target.files[0])
    //   })
    // }

  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn==true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user);
      };
    })
  },[]);
  const type=[
    {id:'1',value:'artwork'},
    {id:'2',value:'photography'}
  ]

  function uploadImage(e){
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }
  function upload(){

    let post={
      title:document.getElementById('photoID').value,
      description:document.getElementById('description').value,
      artType:artType,
      photoURL:photoURL,
      userinfo:loggedInUser
    }
    console.log(post);
    Axios.post('/posts',post).then(function(response){
      console.log(response);

    });
    props.onHide();
    history.push("/");
  }
    return (
    <Modal
    {...props}
    size="lg"
    animation={false}
    centered
  >
  <Container>
    <Row>
      <Col>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" >
              Add A New Post
            </Modal.Title>
          </Modal.Header>

            <h4>Upload Your Art Here</h4>
      </Col>
      <Col>
      <FloatingLabel  controlId="floatingTextarea" label="Title" className="mb-3">
        <Form.Control id='photoID' as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      </Col>
    </Row>
    <Row>
      <Col>
        <ButtonGroup className="mb-2">
        {type.map((choice) => (
          <ToggleButton
          key={choice.id}
          id={`radio-${choice.id}`}
          type="radio"
          variant='outline-primary'
          name="artType"

          value={choice.value}
          checked={artType === choice.value}
          onChange={(e) => setartType(e.currentTarget.value)}
        >
          {choice.value}
          </ToggleButton>
            ))}
        </ButtonGroup>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingTextarea2" label="Description">
          <Form.Control
            id='description'
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
      </Col>
    </Row>
    <Row>
      <fieldset>
        <Form.Group as={Col} className="mb-3">
            <Form.Check
              type="radio"
              label="Upload an Artwork"
              name="artwork"
              id="artwork"
            />
            <Form.Check
              type="radio"
              label="Upload a Photography"
              name="photography"
              id="photography"
            />
            </Form.Group>
      </fieldset>
    </Row>
    <div claaName = "container">
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
          {selectedImage && (
            <div className = "preview">
              <img
                src={URL.createObjectURL(selectedImage)}
                className = "image"
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} className = "delete">
                Remove This Image
              </button>
            </div>
          )}
    </div>

    <Row>
      <Col>
              <Button onClick={props.onHide}>Close</Button>
      </Col>
      <Col md = 'auto'>
              <Button onClick={upload} type='submit'>Upload</Button>
      </Col>
    </Row>
  </Container>
   </Modal>);
}
export default AddPost;
