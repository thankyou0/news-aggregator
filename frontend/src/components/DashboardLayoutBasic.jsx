import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom';
// Import the feed image properly
import feedImg from '../images/feed1.png'; // Make sure this path is correct

const NAVIGATION = [
  { title: 'My Feed', icon: 'feedImg', path: '/myfeed' }, // We will handle the custom image separately
  { title: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { kind: 'divider' },
  { title: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { title: 'Sales', icon: <DescriptionIcon />, path: '/sales' },
  { title: 'Traffic', icon: <DescriptionIcon />, path: '/traffic' },
  { title: 'Integrations', icon: <LayersIcon />, path: '/integrations' },
];

const SidebarNavigation = () => {
  const [open, setOpen] = useState(false); // State to control sidebar visibility
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => setOpen(state); // Open/close the sidebar

  return (
    <>
      {/* Sidebar toggle button (three vertical lines) wrapped in a toolbar to align with the navbar */}
      <Toolbar>
        <IconButton
          onClick={toggleDrawer(!open)}
          sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Permanent Drawer - icons always visible */}
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          width: open ? 240 : 60, // Width changes based on open/closed state
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60, // Control the drawer width
            boxSizing: 'border-box',
            transition: 'width 0.3s ease', // Smooth transition effect
          },
        }}
      >
        <Toolbar />
        <List>
          {NAVIGATION.map((item, index) =>
            item.kind === 'divider' ? (
              <Divider key={index} />
            ) : (
              <ListItem
                button
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <Tooltip title={!open ? item.title : ''} placement="right">
                  <ListItemIcon>
                    {/* Check if the item is 'My Feed' to use the custom feed image */}
                    {item.icon === 'feedImg' ? (
                      <img src={feedImg} alt="feed icon" style={{ width: 24, height: 24 }} />
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                </Tooltip>
                {open && <ListItemText primary={item.title} />}
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default SidebarNavigation;
