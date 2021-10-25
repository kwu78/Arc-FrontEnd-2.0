import { useState, useEffect } from "react";
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Navigation from "./components/navigate";
import Add from "./components/add";
import Drawer from "./components/drawer";
import Comment from "./components/comment";
import Axios from "axios";




export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = ({children}) => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isLoggedIn, setLoggedIn]=useState(false);
  const [loggedInUser,setLoggedInUser]=useState('');
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  useEffect(()=>{
    Axios.get("/api/login").then((response)=>{
      if(response.data.loggedIn===true){
        console.log(response.data.user);
        setLoggedIn(true);
        setLoggedInUser(response.data.user.username);
      };
    })
  },[]);


  return (
    <div>
      <Navigation user={loggedInUser} loggedIn={isLoggedIn}/>
      <Gallery data={landingPageData.Gallery}/>
      <Add />
      <Drawer />
      {/* <Comment /> */}
    </div>
    
  );
};

export default Home;
