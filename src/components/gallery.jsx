
import { Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from "react";
import Comment from "./comment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from '@mui/material/ImageListItem';
import Axios from "axios";
import styled from 'styled-components';

const ButtonS = styled.button`
font-size: 15;
background:none;
color: white;
border:none;
margin:10;
padding:0;
cursor: pointer;
`;
const ButtonToggle = styled(ButtonS)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
const types = ['Drawing', 'Photography'];


export function Gallery(props) {
  const [commentState, setCommentState] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const[sentEntry,setSentEntry]=useState([]);
  const [active, setActive] = useState(types[0]);

  function clickMe(event, entry){
    // event.preventDefault();   
    setCommentState(true);
    setSentEntry(entry);

}
  useEffect(() => {
    Axios.get("/api/login").then((response) => {
      if (response.data.loggedIn == true) {
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user.username);
      };
    })
  }, []);
  if (props.image.length != 0) { console.log(props.image[0]) }

  if (props.image.length != 0) {
    return (
      <div>
        <div id='portfolio' className='text-center'>
          <div className='container'>
            <div className='section-title'>
              <p>
                GALLERY
              </p>
              <br></br>
              <br></br>
              <br></br>
              <p>
                To help an artist gather and give genuine critique anonymously from other artists<br></br>in order to replenish creativity and create better art
              </p>
            </div>
            <div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <ButtonGroup>
                {types.map(type => (
                  <ButtonToggle
                    variant="outline-light"
                    key={type}
                    active={active === type}
                    onClick={() => setActive(type)}
                  > 
                  {type}
                  </ButtonToggle>
                ))}
                </ButtonGroup>
                </div>
                <p>
                </p>
            <div>
            <ImageList variant="masonry" cols={3} gap={8}>
                  {props.image.map((entry) => (                    
                    <ImageListItem key={entry.image}>
                      {props.loggedIn ? <a onClick={(e) => {clickMe(e, entry)}} ><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a> :
                        <a href='/login'><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a>}
                    </ImageListItem>
                  ))
                  }
                </ImageList>
            </div>
          </div>
        </div>
        <Comment show={commentState} onShow={() => setCommentState(true)}
          onHide={() => setCommentState(false) } entry={sentEntry} />

      </div>

    )
  } else {
    return <div>Hi</div>
  }
}
