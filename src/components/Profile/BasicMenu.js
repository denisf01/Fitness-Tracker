import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import FormDialog from "./Modal";
import { useTranslation } from "react-i18next";
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changePasswordHandler = () => {
    setIsPasswordChange(true);
  };
  const closeHandler = () => {
    setIsPasswordChange(false);
  };
  return (
    <div>
      <FormDialog
        label={"Password"}
        tilte={"Change password"}
        text={"Please enter a new password."}
        open={isPasswordChange}
        close={closeHandler}
      />
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon color={"action"} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={changePasswordHandler}>
          {t("changePassword")}
        </MenuItem>
      </Menu>
    </div>
  );
}
