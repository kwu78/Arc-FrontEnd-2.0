import { Image } from "./image";
import { Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from "react";
import Layout from "react-photo-gallery";
import Comment from "./comment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from '@mui/material/ImageListItem';
import Axios from "axios";

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}


export function Gallery(props) {
  const [commentState, setCommentState] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    setCommentState(true);
    console.log(commentState);
  };
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
              <p1>
                GALLERY
              </p1>
              <br></br>
              <br></br>
              <br></br>
              <p>
                To help an artist gather and give genuine critique anonymously from other artists<br></br>in order to replenish creativity and create better art
              </p>
            </div>

            <div className='row'>
              <div className='portfolio-items'>
                {props.data
                  ? props.data.map((d, i) => (
                    <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                      <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} loggedIn={isLoggedIn} />
                    </div>
                  ))
                  : 'Loading...'
                }
             
                {/* <img width="32%" src={"data:image/png;base64, "+props.image[0].image}></img> */}
              </div>
            </div>

            <div>
            <ImageList variant="masonry" cols={3} gap={8}>
                  {props.image.map((entry) => (
                    /*console.log(entry.image);*/

                    <ImageListItem key={entry.image}>
                      {props.loggedIn ? <a onClick={handleClick} ><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a> :
                        <a href='/login'><img width="100%" src={"data:image/png;base64, " + entry.image}></img></a>}
                      {/* <Comment show={commentState} src={"data:image/png;base64, "+entry.image}
                         onHide={()=>setCommentState(false)}/> */}
                    </ImageListItem>

                  ))
                  }
                </ImageList>
            </div>

          </div>


        </div>
        <Comment show={commentState}
          onHide={() => setCommentState(false)} />

      </div>

    )
  } else {
    return <div>Hi</div>
  }
}
