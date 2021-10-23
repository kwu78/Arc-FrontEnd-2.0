import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import Nav from 'react-bootstrap';
import { Typography } from '@mui/material';

const style = {
    margin: 0,
    top: 35,
    right: 20,
    bottom: 'auto',
    left: 'auto',
    position: 'fixed', 
    zIndex: 2,
};


export default function TemporaryDrawer() {
    
    

  const [state, setState] = React.useState(false);
  const anchor = 'right';
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open});
  };

  const list = () => (
    
    <Box
      sx={{ width: 250, bgcolor:"#292929"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      paddingBottom="1600"
      paddingTop="50"
    >
    <List >
         <ListItemButton component="a" href="/">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>COMMENTED</Typography>} />
          </ListItemButton>
          <ListItemButton component="a" href="/">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>PINNED</Typography>} />
          </ListItemButton>
          <ListItemButton component="a" href="/">          
            <ListItemText disableTypography primary={<Typography type="body2" style={{ color: 'white', fontSize: '15px' }}>MY POSTS</Typography>} />
          </ListItemButton>
        
      </List>
    </Box>
  
  );

  return (
      
    <div>
        
        <React.Fragment>
         <Fab  size="md"  style={style} onClick={toggleDrawer(true)}>
         <MenuIcon />
         </Fab>
         
          <Drawer           
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}           
          >
            {list()}
          </Drawer>
         
        </React.Fragment>
     
    </div>
  );
}
