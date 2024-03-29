import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./Dashboard.module.css";
import { useContext } from "react";
import Context from "../../store/context";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export default function TotalTable(props) {
  const { t } = useTranslation();
  const ctx = useContext(Context);
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Trans i18nKey={"dashboardTable"}>
              <TableCell
                style={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                }}
              ></TableCell>
            </Trans>
          </TableRow>
        </TableHead>
        <TableBody>
          {ctx.workouts.length === 0 && (
            <TableRow>
              <TableCell />
              <TableCell align={"center"}>{t("empty")}</TableCell>
            </TableRow>
          )}
          {props.data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.totalNum}</TableCell>
              <TableCell>{row.totalTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
