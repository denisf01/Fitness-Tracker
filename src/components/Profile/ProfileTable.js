import Card from "../Card/Card";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import WeightData from "./WeightData";

const ProfileTable = (props) => {
  return (
    <section>
      <Card>
        <h1 style={{ textAlign: "center" }}>{props.title}</h1>
        <ul>
          {props.data.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>No records</h3>
          ) : (
            props.data.map((el) => {
              return (
                <WeightData
                  id={el.id}
                  key={el.id}
                  weight={el.weight}
                  date={el.date}
                />
              );
            })
          )}
          <div style={{ textAlign: "center" }}>
            <Button onClick={props.addHandler}>
              <AddIcon />
            </Button>
          </div>
        </ul>
      </Card>
    </section>
  );
};

export default ProfileTable;
