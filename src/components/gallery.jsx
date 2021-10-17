import { Image } from "./image";
import plus from './../plus.png';
import {Button} from 'react-bootstrap';
import React, { useState, useContext } from "react";
import AddPost from './addPost';

export function Gallery(props){
  const [addState,setAddState]=useState(false);
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
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div>
        </div>
        
      </div>
      
      
    </div>
    <AddPost show={addState} 
          onHide={()=>setAddState(false)}/>
    </div>
    
  )
}
