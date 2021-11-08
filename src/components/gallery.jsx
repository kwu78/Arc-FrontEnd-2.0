
import { Button } from 'react-bootstrap';
import React, { useState, useContext, useEffect } from "react";
import Comment from "./comment";
import ImageList from "@mui/material/ImageList";
import ImageListItem from '@mui/material/ImageListItem';
import Axios from "axios";



export function Gallery(props) {
  const [commentState, setCommentState] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const[sentEntry,setSentEntry]=useState([]);

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
