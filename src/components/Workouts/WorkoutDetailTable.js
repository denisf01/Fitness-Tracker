import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  stableSort,
  getComparator,
  createData,
} from "../../constants/functions";
import { headCells } from "../../constants/workoutInputs";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useContext, useState } from "react";
import FilterModal from "./FilterModal";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewWorkoutModal from "./NewWorkoutModal";
import Context from "../../store/context";
import { useTranslation } from "react-i18next";

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const ctx = useContext(Context);
  const { numSelected, filter, addWorkout, selected, parentId } = props;
  const { t } = useTranslation();
  const filterHandler = () => {
    filter();
  };
  const deleteHandler = () => {
    ctx.deleteWorkoutDetail(parentId, selected);
  };
  let title;
  if (ctx.workouts.length !== 0)
    title =
      ctx.workouts[ctx.workouts.findIndex((el) => el.id === parentId)].name;
  else title = "";
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t("selected")}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}

          <Button onClick={() => addWorkout()}>
            <AddIcon />
          </Button>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip>
          <IconButton onClick={filterHandler}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function WorkoutDetailTable(props) {
  const ctx = useContext(Context);
  const { t } = useTranslation();
  const [order, setOrder] = React.useState("asc");
  const [openFilter, setOpenFilter] = useState(false);
  const [openAddWorkout, setOpenAddWorkout] = useState(false);

  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [filter, setFilter] = useState(null);
  const { parentId } = props;
  const rowsPerPage = 5;
  const rows =
    ctx.workouts.length !== 0
      ? ctx.workouts[
          ctx.workouts.findIndex((el) => el.id === parentId)
        ].details.map((workout) => {
          return createData(
            workout.id,
            workout.exerciseName,
            workout.time,
            workout.weight,
            workout.reps,
            workout.rpe
          );
        })
      : [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const closeHandler = () => {
    setOpenFilter(false);
    setOpenAddWorkout(false);
  };

  const submitHandler = (option) => {
    setFilter(option);
  };
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <FilterModal
        title={t("filterTitle")}
        text={t("filterText")}
        label={t("exercises")}
        open={openFilter}
        close={closeHandler}
        onSubmit={submitHandler}
      />
      <NewWorkoutModal open={openAddWorkout} close={closeHandler} />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          addWorkout={() => setOpenAddWorkout(true)}
          filter={() => {
            setOpenFilter(true);
          }}
          numSelected={selected.length}
          selected={selected}
          parentId={parentId}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(
                rows.filter((row) => (!!filter ? row.name === filter : true)),
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const hours = Math.floor(row.time / 3600);
                  let tmp = row.time - hours * 3600;
                  const minutes = Math.floor(tmp / 60);
                  tmp = tmp - minutes * 60;
                  const seconds = tmp;
                  const time =
                    ("0" + hours).slice(-2) +
                    ":" +
                    ("0" + minutes).slice(-2) +
                    ":" +
                    ("0" + seconds).slice(-2);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        {!!row.time ? time : ""}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {!!row.weight ? row.weight : ""}
                      </TableCell>
                      <TableCell align="right">
                        {!!row.num ? row.num : ""}
                      </TableCell>
                      <TableCell align="right">
                        {!!row.rpe ? row.rpe : ""}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={
            rows.filter((row) => (!!filter ? row.id === filter : true)).length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
