// import * as React from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Box,
//   CssBaseline,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PersonIcon from "@mui/icons-material/Person";
// import PhotoIcon from "@mui/icons-material/Photo";
// import SecurityIcon from "@mui/icons-material/Security";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import { useEffect } from "react";
// import Toaster from "../components/Toaster";

// const drawerWidth = 240;

// export default function AccountLayout(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

//   useEffect(() => {
//     // If no token, redirect to login page
//     if (!token) {
//       navigate('/login',{replace:true});
//       return;
//     }
//   },[navigate,token])
//   const drawer = (
//     <div>
//       <Toolbar>
//         <Typography variant="h6">Account</Typography>
//       </Toolbar>
//       <Divider />

//       <List>
//         <ListItem disablePadding>
//           <ListItemButton component={NavLink} to="profile">
//             <ListItemIcon><PersonIcon /></ListItemIcon>
//             <ListItemText primary="Profile" />
//           </ListItemButton>
//         </ListItem>

//         <ListItem disablePadding>
//           <ListItemButton component={NavLink} to="photo">
//             <ListItemIcon><PhotoIcon /></ListItemIcon>
//             <ListItemText primary="Photo" />
//           </ListItemButton>
//         </ListItem>

//         <ListItem disablePadding>
//           <ListItemButton component={NavLink} to="security">
//             <ListItemIcon><SecurityIcon /></ListItemIcon>
//             <ListItemText primary="Security" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton component={NavLink} to="PurchasedCourses">
//             <ListItemIcon><BarChartIcon /></ListItemIcon>
//             <ListItemText primary="PurchasedCourses" />
//           </ListItemButton>
//         </ListItem>

//         <Divider sx={{ my: 1 }} />

//         <ListItem disablePadding>
//           <ListItemButton component={NavLink} to="DeleteAccount">
//             <ListItemIcon><DeleteIcon color="error" /></ListItemIcon>
//             <ListItemText primary="Delete Account" />
//           </ListItemButton>
//         </ListItem>

//       </List>
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//       <Box sx={{ display: "flex" }} >
//         <Toaster/>
//         <CssBaseline />

//         {/* TOP BAR */}
//         <AppBar 
//           position="fixed"
//           sx={{
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//             ml: { sm: `${drawerWidth}px` },
//             bgcolor: "#309255",
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: { sm: "none" } }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap>
//               User Dashboard
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         {/* SIDEBAR */}
//         <Box
//           component="nav"
//           sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         >
//           {/* Mobile */}
//           <Drawer
//             container={container}
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>

//           {/* Desktop */}
//           <Drawer
//             variant="permanent"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: drawerWidth,
//               },
//             }}
//             open
//           >
//             {drawer}
//           </Drawer>
//         </Box>

//         {/* CONTENT */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//             width: { sm: `calc(100% - ${drawerWidth}px)` },
//           }}
//         >
//           <Toolbar />
//           <Outlet />
//         </Box>
//       </Box>
//   );
// }

import React, { useEffect } from "react";
import Navbar from "../common/navbar/Navbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUser, FaCamera, FaLock, FaShoppingCart, FaTrashAlt } from "react-icons/fa"; // Using react-icons for the sidebar icons
import Toaster from "../components/Toaster";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
const AccountLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    // If no token, redirect to login page
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, token]);
  // Function to add active class to the current route
  const getActiveClass = ({ isActive }) => isActive ? "bg-[#a2ebbe] " : "hover:bg-[#a2ebbe]";
  const isLoading = useSelector(state=>state.loader.isLoading);
  return (
    <>
    {isLoading?
    <Loader/>
    :
    <div className="flex gap-15 flex-col items-center min-h-screen bg-gray-100">
      {/* navbar */}
      <Navbar/>
      <main className="flex lg:flex-row lg:w-[80%] w-[-webkit-fill-available] flex-col border border-[#ddd]">
        <Toaster/>
        <div className="lg:w-64 bg-white-600 text-white p-5 space-y-8 md:border-r border-[#ddd]">
          <h2 className="text-2xl font-bold text-center text-green-600">Account</h2>
          <div className="space-y-4">
            <NavLink
              to="profile"
              className={({ isActive }) =>`flex text-[#1f2124] items-center gap-2 p-2 rounded-lg ${getActiveClass({ isActive })}`}
            >
              <FaUser />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="photo"
              className={({ isActive }) =>`flex text-[#1f2124] items-center gap-2 p-2 rounded-lg ${getActiveClass({ isActive })}`}
            >
              <FaCamera />
              <span>Photo</span>
            </NavLink>
            <NavLink
              to="security"
              className={({ isActive }) =>`flex text-[#1f2124] items-center gap-2 p-2 rounded-lg ${getActiveClass({ isActive })}`}
            >
              <FaLock />
              <span>Security</span>
            </NavLink>
            <NavLink
              to="PurchasedCourses"          
              className={({ isActive }) =>`flex text-[#1f2124] items-center gap-2 p-2 rounded-lg ${getActiveClass({ isActive })}`}
            >
              <FaShoppingCart />
              <span>Purchased Courses</span>
            </NavLink>
            <NavLink
              to="DeleteAccount"
              className={({ isActive }) =>`flex text-[#1f2124] items-center gap-2 p-2 rounded-lg ${getActiveClass({ isActive })}`}
            >
              <FaTrashAlt />
              <span>Delete Account</span>
            </NavLink>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 lg:p-8 p-8 pb-28">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-green-600">User Dashboard</h1>
          </div>

          {/* Main Content */}
          <Outlet />
        </div>
      </main>
      {/* Sidebar */}
    </div>
    }
    </>
  );
};

export default AccountLayout;

