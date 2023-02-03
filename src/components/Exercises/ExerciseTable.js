import Card from "../Card/Card";
import Exercise from "./Exercise";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
const ExerciseTable = (props) => {
  const { t } = useTranslation();
  return (
    <section>
      <Card>
        <h1 style={{ textAlign: "center" }}>{props.title}</h1>
        <ul>
          {props.data.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>{t("empty")}</h3>
          ) : (
            props.data.map((el) => {
              return (
                <Exercise
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  edit={props.editHandler}
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

export default ExerciseTable;
