import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import style from "./HeaderView.module.scss";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { removeStorage } from "../../../utils/Auth/Auth";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  OnAnchorEL?: any;
  setOnAnchorEL?: any;
  setOnProfileMenu?: any;
}
export const UserProfile = (props: UserProfileProps) => {
  const navigate = useNavigate();
  const { OnAnchorEL, setOnAnchorEL, setOnProfileMenu } = props;
  const menuId = "primary-search-account-menu";
  const isMenuOpen = Boolean(OnAnchorEL);

  const handleMenuClose = () => {
    setOnAnchorEL(null);
    setOnProfileMenu(false);
  };
  const handleUserProfile = (e: React.MouseEvent<HTMLElement>) => {
    handleMenuClose();
    setOnProfileMenu(Boolean(e.currentTarget));
  };

  return (
    <Menu
      anchorEl={OnAnchorEL}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className={style.tested}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      </div>
      <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem
        onClick={async () => {
          setOnProfileMenu(false);
          await removeStorage();
          navigate("/login");
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );
};
