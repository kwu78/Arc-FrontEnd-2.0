import { Image } from "./image";
import {Button} from 'react-bootstrap';
import React, { useState, useContext, useEffect } from "react";
import AddPost from './addPost';
import Layout from "react-photo-gallery";
import { photos } from "./photos";
import Axios from "axios";

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 500) columns = 2;
  if (containerWidth >= 900) columns = 3;
  if (containerWidth >= 1500) columns = 4;
  return columns;
}


export function Gallery(props){
  const [addState,setAddState]=useState(false);
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn==true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user.username);
      };
    })
  },[]);
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
              : 'Loading...'}
          </div>
        </div>

        <div>
    {/* <Layout photos={photos} columns={columns} direction="column" /> */}
    </div>
        
      </div>
      
      
    </div>
    <AddPost show={addState} 
          onHide={()=>setAddState(false)}/>
    </div>
    
  )
}
