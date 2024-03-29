import classes from "./Dashboard.module.css";
import React, { useContext } from "react";
import TotalTable from "./TotalTable";
import MyChart from "./WorkoutChart";
import Context from "../../store/context";
import { WeightChart } from "./WeightChart";

const Dashboard = () => {
  const ctx = useContext(Context);
  let fullData = ctx.workouts.map((workout) => {
    let totalNum = workout.details.length;
    let totalTime = 0;
    for (const f of workout.details) {
      totalTime += f.time;
    }
    return {
      name: workout.name,
      totalNum,
      totalTime: (totalTime / 3600).toFixed(2),
      id: Math.random().toString(),
    };
  });
  fullData = fullData.filter((el) => el.totalNum !== 0);

  return (
    <div className={classes.background}>
      <div className={classes.workouts}>
        <div
          style={
            ctx.workouts.length === 0
              ? { backgroundColor: "rgba(0,0,0,0)" }
              : {}
          }
          className={classes.chart}
        >
          <TotalTable data={fullData} />
          <MyChart data={fullData} />
        </div>
      </div>
      <div className={classes.weight}>
        <div className={classes.chart2}>
          <WeightChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
