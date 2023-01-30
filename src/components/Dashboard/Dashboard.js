import classes from "./Dashboard.module.css";
import React, { useContext } from "react";
import TotalTable from "./TotalTable";
import MyChart from "./Chart";
import Context from "../../store/context";

const Dashboard = () => {
  const ctx = useContext(Context);
  let fullData = ctx.exercises.map((exercise) => {
    let totalNum = 0;
    let totalTime = 0;
    for (const f of ctx.workouts) {
      if (exercise.name === f.name) {
        ++totalNum;
        totalTime += +f.time;
      }
    }
    return {
      name: exercise.name,
      totalNum,
      totalTime,
      id: Math.random().toString(),
    };
  });
  fullData = fullData.filter((el) => el.totalNum !== 0);

  return (
    <div className={classes.background}>
      <div className={classes.chart}>
        <TotalTable data={fullData} /> <br /> <br />
        <MyChart data={fullData} />
      </div>
    </div>
  );
};

export default Dashboard;
