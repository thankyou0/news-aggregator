import React, { useContext } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { ThemeContext } from '../context/ThemeContext';
import feedImgDark from '../images/feed_dark.png'; // Dark mode feed image
import feedImgLight from '../images/feed_light.png'; // Light mode feed image
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import following_light from '../images/following_light.png';
import following_dark from '../images/following_dark.png';


const NAVIGATION = [
  { title: 'Home', icon: <HomeRoundedIcon />, path: '/' },
  { title: 'Feed', icon: 'feedImg', path: '/myfeed' }, // Custom image for "My Feed"
  { title: 'Following', icon: 'followingImg', path: '/providers/following' }, // Custom image for "Following"
  { title: 'Bookmark', icon: <BookmarkRoundedIcon />, path: '/bookmark' }, // Custom image for "My Feed"
  { kind: 'divider' },
  { title: 'Account', icon: <AccountCircleRoundedIcon />, path: '/account' },
];

const SidebarNavigation = ({ open, setOpen }) => {
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => setOpen(state); // Toggle sidebar open/close
  const feedImg = mode === 'light' ? feedImgDark : feedImgLight;
  const followingImg = mode === 'light' ? following_light : following_dark;
  return (
    <>
      {/* Sidebar toggle button */}
      <Toolbar>
        <IconButton
          onClick={toggleDrawer(!open)}
          sx={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1300,
            backgroundColor: mode === 'dark' ? '#333' : '#fff',
            color: mode === 'dark' ? '#fff' : '#333',
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#555' : '#eee', // Subtle hover effect
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          width: open ? 240 : 60, // Adjust width based on state
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            background: mode === 'light'
              ? 'linear-gradient(to bottom, #373737 4.93%, #ffffff 4.93%)' // Gradient for dark mode
              : 'linear-gradient(to bottom, #ffffff 4.93%, #000000 4.93%)', // Gradient for light mode
            color: mode === 'dark' ? '#fff' : '#000',
            transition: 'width 0.3s ease, background-color 0.3s ease', // Smooth transition
            // boxShadow: '2px 0 5px rgb(215, 215, 25)', // Subtle shadow for depth
            // boxShadow: `${mode === 'light' ? '2px 0 5px rgba(0, 0, 0, 0.2)' : '2px 0 5px rgb(255, 255, 255)'}`, // Adjust shadow based on theme
            border: "2px solid blue",
          },
        }}
      >
        <Toolbar />
        <List>
          {NAVIGATION.map((item, index) =>
            item.kind === 'divider' ? (
              <Divider key={index} sx={{ borderColor: mode === 'dark' ? '#444' : '#ddd' }} /> // Adjust divider color
            ) : (
              <ListItem
                button="true"
                key={item.title}
                onClick={() => navigate(item.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: mode === 'dark' ? '#333' : '#eee', // Hover effect for items
                  },
                  padding: '10px 16px',
                  marginBottom: '4px', // Small space between items
                  borderRadius: '8px', // Rounded item edges
                  transition: 'background-color 0.3s ease', // Smooth hover transition
                  cursor: 'pointer', // Show pointer on hover
                }}
              >
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemIcon
                    sx={{
                      color: mode === 'dark' ? '#fff' : '#000', // Adjust icon color based on theme
                      minWidth: 0, // Align icons closer to text
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon === 'feedImg' ? (
                      <img src={feedImg} alt="feed icon" style={{ width: 24, height: 24 }} /> // Use the custom feed image
                      ) : item.icon === 'followingImg' ? <img src={followingImg} alt="following icon" style={{ width: 24, height: 24 }}/> : (
                      item.icon
                    )}
                  </ListItemIcon>
                </Tooltip>
                {open && (
                  <ListItemText
                    primary={item.title}
                    sx={{
                      color: mode === 'dark' ? '#fff' : '#000', // Adjust text color based on theme
                      marginLeft: '8px', // Small spacing between icon and text
                      fontWeight: 500,
                    }}
                  />
                )}
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default SidebarNavigation;