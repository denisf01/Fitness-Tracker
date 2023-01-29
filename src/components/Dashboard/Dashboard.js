import classes from "./Dashboard.module.css";
import React from "react";
import TotalTable from "./TotalTable";
import MyChart from "./Chart";

const Dashboard = () => {
  return (
    <div className={classes.background}>
      <div className={classes.chart}>
        <TotalTable /> <br/> <br/>
        <MyChart />
      </div>
    </div>
  );
};

export default Dashboard;
