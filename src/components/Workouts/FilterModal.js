import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import Context from "../../store/context";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
export default function FilterModal(props) {
  const ctx = useContext(Context);
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const handleClose = () => {
    props.close();
  };
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = () => {
    props.onSubmit(input);
    props.close();
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <FormControl style={{ marginTop: "5px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t("exercises")}
            </InputLabel>
            <Select
              value={input}
              label={t("exercises")}
              onChange={inputChangeHandler}
            >
              {ctx.exercises.map((exercise) => {
                return (
                  <MenuItem
                    key={Math.random().toString()}
                    value={exercise.name}
                  >
                    {exercise.name}
                  </MenuItem>
                );
              })}
            </Select>
            <br />
            <Button
              onClick={() => {
                props.onSubmit(null);
                setInput(null);
                props.close();
              }}
            >
              {t("removeFilter")}
            </Button>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Trans i18nKey={"actionButtons"}>
            <Button onClick={handleClose}></Button>
            <Button onClick={handleSubmit}></Button>
          </Trans>
        </DialogActions>
      </Dialog>
    </div>
  );
}
