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
