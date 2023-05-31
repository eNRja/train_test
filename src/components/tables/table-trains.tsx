import { useDispatch, useSelector } from "../../hooks/hooks";
import { TTrain } from "../../services/reducers/table-trains";
import { showTrain } from "../../services/actions/table-trains";
import style from "./table.module.css";

export default function TableTrains() {
  const dispatch = useDispatch();
  const { trains } = useSelector((state) => state.tableTrains);

  const pushOnTrain = (train: TTrain) => {
    dispatch(showTrain(train));
  };

  return (
    <div className={style.Table}>
      <h2>Поезда</h2>
      <div className={style.TableHeader}>
        <p className={style.TableText}>Название</p>
        <p className={style.TableText}>Описание</p>
      </div>
      <div className={style.TableList}>
        {trains &&
          trains.map((element) => (
            <button
              className={style.TableTrain}
              onClick={() => pushOnTrain(element)}
              key={element.name}
            >
              <p className={style.TableTrainText}>{element.name}</p>
              <p className={style.TableTrainText}>{element.description}</p>
            </button>
          ))}
      </div>
    </div>
  );
}
