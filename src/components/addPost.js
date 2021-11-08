import React, { useState,useEffect, useContext } from "react";
import {Modal,FloatingLabel,Form,Row,Col,ToggleButton,ButtonGroup,Container,InputGroup,ListGroup,FormControl} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {Button} from 'react-bootstrap';
import Axios from "axios";
import {useHistory} from "react-router-dom";
import addPost from "./addPost.css";
import { FilePond, File, registerPlugin,Create } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { toppings } from "./toppings";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
function AddPost(props){
  const [artType,setartType]=useState('artwork');
  const [photoURL,setPhotoURL]=useState(null);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('')
  const [files, setFiles] = useState([]);
  const history=useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const removeSelectedImage = () => {setSelectedImage();};
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };


    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };


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

  const cri = [
    {id:'1', value:'Color'},
    {id:'2', value:'Space'},
    {id:'3', value:'Light'},
    {id:'4', value:'Balance'},
    {id:'5', value:'Focus'}
  ]

  const [critique, setCritique] = useState(false);


  function uploadImage(e){
    setPhotoURL(URL.createObjectURL(e.target.files[0]));
  }


  function upload(){
   console.log(loggedInUser._id);
   console.log(files);
   console.log((document.getElementsByName("files")));

    let post={
      title:document.getElementById('photoID').value,
      description:document.getElementById('description').value,
      artType:artType,
      photoURL:photoURL,
      userinfo:loggedInUser._id,
      critique: cri,
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
      <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" >
            Add A New Post
          </Modal.Title>
        </Modal.Header>
    </Row>
    <Row>
      <Col>
            <h4>Upload Your Art Here</h4>
      </Col>
      <Col>
      <FloatingLabel  controlId="floatingTextarea" label="Title" className="mb-3">
        <Form.Control id='photoID' as="textarea" placeholder="Leave a comment here"/>
      </FloatingLabel>
      </Col>
    </Row>
    <Row>
      <Col>
      <Form.Group>
      <FilePond
          className = "filepond--item"
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={3}
          server="/posts"
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </Form.Group>
      </Col>
      <Col>
        <FloatingLabel controlId="floatingTextarea2" label="Description" id= "descrptionbox">
          <Form.Control
            id='description'
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
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
    </Row>
    <Row>
      <Col>
      </Col>
      <Col>
      <div className="container">
      <h3> Area to Critique </h3>
    <ButtonGroup className="mb-2">
      {cri.map((option)=>(
      <ToggleButton
        key={option.id}
        id={`checkbox-${option.id}`}
        type="checkbox"
        variant="outline-primary"
        name="critique"
        checked={critique === option.value}
        value={option.value}
        onChange={(e) => setCritique(e.currentTarget.value)}
      >
        {option.value}
      </ToggleButton>
      ))}
    </ButtonGroup>
      </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <Button id = 'close' onClick={props.onHide}>Close</Button>
      </Col>
      <Col md = 'auto'>
        <Button onClick={upload} type='submit'>Upload</Button>
      </Col>
    </Row>
  </Container>
   </Modal>);
}
export default AddPost;

// <fieldset>
//   <Form.Group as={Col} className="mb-3">
//       <Form.Check
//         type="radio"
//         label="Upload an Artwork"
//         name="artwork"
//         id="artwork"
//       />
//       <Form.Check
//         type="radio"
//         label="Upload a Photography"
//         name="photography"
//         id="photography"
//       />
//       </Form.Group>
// </fieldset>

// <ListGroup>
//
//   <ListGroup.Item> Area to Critique</ListGroup.Item>
//   <ListGroup.Item> area 1</ListGroup.Item>
//   <ListGroup.Item> area 2</ListGroup.Item>
// </ListGroup>


// <DropdownButton align="end" title="Area to Critique" id="dropdown-menu-align-end" variant="secondary">
// <DropdownButton align="end" title = "Artwork" id="dropdown-menu-align-end" variant="secondary">
//   <Dropdown.Item eventKey="1"> critique 1</Dropdown.Item>
//   <Dropdown.Item eventKey="2"> critique 2</Dropdown.Item>
//   <Dropdown.Item eventKey="3"> critique 3</Dropdown.Item>
//   <Dropdown.Item eventKey="4"> critique 4</Dropdown.Item>
//   <Dropdown.Divider />
//   <Dropdown.Item eventKey="5">Others</Dropdown.Item>
// </DropdownButton>
// <DropdownButton align="end" title="Photography" id="dropdown-menu-align-end" variant="secondary">
//   <Dropdown.Item eventKey="1"> critique 1</Dropdown.Item>
//   <Dropdown.Item eventKey="2"> critique 2</Dropdown.Item>
//   <Dropdown.Item eventKey="3"> critique 3</Dropdown.Item>
//   <Dropdown.Item eventKey="4"> critique 4</Dropdown.Item>
//   <Dropdown.Divider />
//   <Dropdown.Item eventKey="5">Other</Dropdown.Item>
// </DropdownButton>
//
// </DropdownButton>

// <div className="App">
//  <ul className="toppings-list">
//    {toppings.map(({name}, index) => {
//      return (
//        <li key={index}>
//          <div className="toppings-list-item">
//              <input
//                label="critique"
//                type="checkbox"
//                id={`custom-checkbox-${index}`}
//                name={name}
//                checked={checkedState[index]}
//                onChange={() => handleOnChange1(index)}
//              />
//              <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
//          </div>
//        </li>
//      );
//    })}
//  </ul>
// </div>
