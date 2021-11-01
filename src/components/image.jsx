import { propTypes } from "react-bootstrap/esm/Image";
import Comment from "./comment";
export const Image = ({ title, largeImage, smallImage, loggedIn}) => {
  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>
        {' '}
      {loggedIn?
        <a
         
          
          title={title}
          data-lightbox-gallery='gallery1'          
        >
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
          <img
            // style={{minWidth:"100%", height:"400px"}}
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </a>: <a
          
          href='/login' 
          title={title}
          data-lightbox-gallery='gallery1'          
        >
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
          <img
            // style={{minWidth:"100%", height:"400px"}}
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </a>}{' '}
      </div>
    </div>
  )
}