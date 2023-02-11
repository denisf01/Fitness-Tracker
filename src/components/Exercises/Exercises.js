import classes from "./Exercises.module.css";
import { useContext, useState } from "react";
import ExerciseInput from "../Modal/ModalInput";
import Context from "../../store/context";
import ExerciseTable from "./ExerciseTable";
import { useTranslation } from "react-i18next";
const Exercises = (props) => {
    const { t } = useTranslation();
    const ctx = useContext(Context);
    const [isInput, setIsInput] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [exerciseId, setExerciseId] = useState(null);
    const [editName, setEditName] = useState("");
    const addExerciseHandler = () => {
        setIsInput(true);
    };
    const closeHandler = () => {
        setIsInput(false);
        setIsEdit(false);
    };
    const editHandler = (id) => {
        setExerciseId(id);
        const index = ctx.exercises.findIndex((el) => el.id === id);
        setEditName(ctx.exercises[index].name);
        setIsEdit(true);
    };
    return (
        <div className={classes.background}>
            <ExerciseInput
                id={"input"}
                label={t("exerciseName")}
                text={t("exerciseText")}
                title={t("exerciseTitle")}
                open={isInput}
                onSubmit={ctx.addExercise}
                close={closeHandler}
            />
            <ExerciseInput
                exerciseId={exerciseId}
                editName={editName}
                id={"edit"}
                onSubmit={ctx.editExercise}
                label={t("exerciseName")}
                text={t("newExerciseText")}
                title={t("newExerciseTitle")}
                open={isEdit}
                close={closeHandler}
            />
            <div className={classes.exercises}>
                <ExerciseTable
                    data={ctx.exercises}
                    editHandler={editHandler}
                    addHandler={addExerciseHandler}
                    title={t("exercises")}
                />
            </div>
        </div>
    );
};

export default Exercises;
