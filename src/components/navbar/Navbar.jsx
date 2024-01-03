import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router";
import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUserOnLogout } from "../../features/Auth/authSlice";
import { useLocation } from "react-router-dom";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar({ signedIn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartLength } = useSelector((state) => state.cart);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("token"));
    setUserData(userData);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const touchBtn = (setting) => {
    if (setting && setting === "Logout") {
      localStorage.clear();
      dispatch(removeUserOnLogout({}));
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      {signedIn && (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Link to="/" style={{ textDecoration: "none", color: "#FFF" }}>
            <Typography
              variant="h6"
              noWrap
              component="span" // Use "span" instead of "a" for non-link behavior
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BuyMI
            </Typography>
          </Link>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={`${userData?.firstName || ""} ${userData?.lastName || ""}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: "50px" }}>
                  <Avatar alt={userData?.username} src={userData.image} />
                </IconButton>
              </Tooltip>
              {pathname != "/cart" && (
                <Link to="/cart">
                  <IconButton sx={{ p: 0, color: "white" }}>
                    <Box sx={{ display: "inline-block", marginRight: "15px" }}>Cart</Box> <ImCart />
                    {cartLength > 0 ? (
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          marginLeft: "10px",
                          backgroundColor: '#ff0000', // Red background color (customize as needed)
                          borderRadius: '50%', // Make it a circle
                          color: '#fff', // Text color
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '14px', // Customize font size
                        }}
                      >
                        {cartLength}
                      </div>
                    ) : (
                      ""
                    )}
                  </IconButton>
                </Link>
              )}

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu;
                      touchBtn(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
}
export default Navbar;
