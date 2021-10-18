export const Image = ({ title, largeImage, smallImage }) => {
  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>
        {' '}
        <a
          href="/login"           
        >
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
          <img
            style={{minWidth:"100%", height:"400px"}}
            src={smallImage}
            className='img-responsive'
            alt={title}
          />{' '}
        </a>{' '}
      </div>
    </div>
  )
}