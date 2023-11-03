import { Badge, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import style from "./HeaderView.module.scss";
import { getStorage, removeStorage } from "../../../utils/Auth/Auth";
import { userProfileAction } from "./HeaderView.Reducer";
import { useAppDispatch } from "../../../Store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface UserProfileProps {
  onProfileMenu?: boolean;
  setOnProfileMenu?: any;
}
export const ProfileMenu = (props: UserProfileProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onProfileMenu, setOnProfileMenu } = props;
  const { refresh } = useSelector((data: any) => data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userName = getStorage("user_name");
  const userProfile = getStorage("user_profile");
  const menuId = "primary-search-account-menu";
  const user = refresh?.data?.data;

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOnProfileMenu(false);
  };

  const [imgFile, setImgFile] = useState<any>();
  function handleChange(e:any) {
      console.log(e.target.files);

      setImgFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={onProfileMenu || false}
      onClose={handleMenuClose}
    >
      <div
        style={{
          width: "270px",
          height: "400px",
          textAlign: "center",
        }}
      >
        <Badge
          component="label"
          htmlFor="contained-button-file"
          color="secondary"
          badgeContent={<CreateRoundedIcon fontSize="small" />}
          className={style.HeaderUserProfileBody}
        >
          <div
            className={style.HeaderUserProfile}
            onClick={(e) => e.preventDefault()}
          >
            <img
              src={imgFile || user?.userImage}
              className={style.HeaderUserProfile}
              onClick={(e) => e.preventDefault()}
            />
          </div>
        </Badge>
        <div>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={(val: any) =>{
              dispatch(userProfileAction({ userImage: val.target.files[0] }));
              setImgFile(URL.createObjectURL(val.target.files[0]))}
            }
          />
        </div>
        <Typography sx={{ marginTop: "25px" }}>
          {user?.name || userName}
        </Typography>
        <div style={{ marginTop: "60px" }}>
          <Divider />
          <MenuItem onClick={() => setOnProfileMenu(false)}>Account</MenuItem>
          <Divider />
          <MenuItem onClick={() => setOnProfileMenu(false)}>Language</MenuItem>
          <Divider />
          <MenuItem
            onClick={async () => {
              setOnProfileMenu(false);
              await removeStorage();
              navigate("/login");
            }}
          >
            Log out
          </MenuItem>
        </div>
      </div>
    </Menu>
  );
};
