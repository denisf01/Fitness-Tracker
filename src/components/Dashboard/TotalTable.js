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

export default function TotalTable(props) {
  const ctx = useContext(Context);
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Total workouts</TableCell>
            <TableCell>Total time(h)</TableCell>
          </TableRow>
          {ctx.workouts.length === 0 && (
            <React.Fragment>
              <TableCell />
              <TableCell align={"center"}>No records</TableCell>
            </React.Fragment>
          )}
        </TableHead>
        <TableBody>
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
