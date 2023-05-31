import style from "./table.module.css";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useForm } from "../../hooks/useForm";
import { postTrains } from "../../services/actions/table-trains";
import { FormEvent, useMemo } from "react";

export default function TableTrain() {
  const validation = document.querySelectorAll("input");
  const error: boolean[] = [];
  const { train } = useSelector((state) => state.tableTrains);
  const [values, handleChange] = useForm<[]>([]);
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newSpeedLimits = train?.speedLimits.map((element) => {
      for (let key in values) {
        if (key === element.name) {
          element.speedLimit = +values[key];
        }
      }
      return element;
    });

    newSpeedLimits?.sort((a, b) => a.speedLimit - b.speedLimit);
    const newTrain = train && {
      name: train.name,
      description: train.description,
      speedLimits: newSpeedLimits,
    };

    dispatch(postTrains(newTrain));
  };

  validation.forEach((item) => {
    error.push(item.checkValidity());
  });

  const checkValidity = useMemo(() => {
    const checkBool = error.filter(Boolean);
    if (checkBool.length !== error.length) {
      return true;
    }
    return false;
  }, [error]);

  return (
    <>
      {train && (
        <div className={style.Table}>
          <h2>Ограничения по скорости</h2>
          <h2 className={style.TableTitle}>{train.name}</h2>
          <div className={style.TableHeader}>
            <p className={style.TableText}>Название</p>
            <p className={style.TableText}>Ограничение скорости</p>
          </div>
          <form className={style.TableList} onSubmit={handleSubmit}>
            {train?.speedLimits.map((element) => (
              <div className={style.TableInputTrain} key={element.name}>
                <p className={style.TableTrainText}>{element.name}</p>
                <input
                  key={element.name}
                  name={element.name}
                  className={style.TableInput}
                  defaultValue={element.speedLimit}
                  value={values[element.speedLimit]}
                  required
                  type="number"
                  step="1"
                  min="0"
                  onChange={handleChange}
                />
              </div>
            ))}
            {checkValidity && (
              <span className={style.TableError}>
                только положительные целые числа
              </span>
            )}
            <button type="submit" className={style.TableButton}>
              Сохранить
            </button>
          </form>
        </div>
      )}
    </>
  );
}
