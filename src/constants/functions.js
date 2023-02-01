export const sortDates = (el1, el2) => {
  const dateParts1 = el1.date.split("-");
  const dateParts2 = el2.date.split("-");
  console.log(dateParts2);
  if (+dateParts1[2] > +dateParts2[2]) return 1;
  if (+dateParts1[2] < +dateParts2[2]) return -1;
  if (+dateParts1[1] > +dateParts2[1]) return 1;
  if (+dateParts1[1] < +dateParts2[1]) return -1;
  if (+dateParts1[0] > +dateParts2[0]) return 1;
  if (+dateParts1[0] < +dateParts2[0]) return -1;
};

export function createData(id, name, time, weight, num, rpe) {
  return {
    id,
    name,
    time,
    weight,
    num,
    rpe,
  };
}

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
