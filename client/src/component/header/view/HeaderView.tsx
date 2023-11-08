import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import style from "./HeaderView.module.scss";
import { Paper } from "@mui/material";
import { getStorage } from "../../../utils/Auth/Auth";
import { ProfileMenu } from "./ProfileMenu";
import { UserProfile } from "./UserProfile";
import { useSelector } from "react-redux";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

export const HeaderView = () => {
  const { refresh } = useSelector((data: any) => data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const menuId = "primary-search-account-menu";
  const User = getStorage("user_profile");
  const mobileMenuId = "primary-search-account-menu-mobile";
  const userImage = refresh?.data?.data?.userImage;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Paper component="form" className={style.HeaderSearchBar}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search.." }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/product/cart")}
            >
              <Badge badgeContent={0} color="error">
                <CartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                setAnchorEl(e.currentTarget)
              }
              color="inherit"
            >
              <img
                src={userImage}
                className={style.ProfileIcon}
                onClick={(e) => e.preventDefault()}
                height={40}
                width={40}
                alt="User profile"
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                setAnchorEl(e.currentTarget)
              }
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <UserProfile
        OnAnchorEL={anchorEl}
        setOnAnchorEL={setAnchorEl}
        setOnProfileMenu={setProfileMenu}
      />
      <ProfileMenu
        onProfileMenu={profileMenu}
        setOnProfileMenu={setProfileMenu}
      />
    </Box>
  );
};
