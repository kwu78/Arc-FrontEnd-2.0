import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Navigation from "./components/navigate";
import Add from "./components/add";
import Drawer from "./components/drawer";
import Axios from "axios";

import "./App.css";



export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
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
      {/* <Navigation /> */}
      <Navigation user={loggedInUser} loggedIn={isLoggedIn}/>
      <Gallery data={landingPageData.Gallery}/>
      <Add />
      <Drawer />
      
      
    </div>
    
  );
};

export default Home;
