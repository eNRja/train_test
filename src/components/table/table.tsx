import style from "./table.module.css";
import { useDispatch } from "../../hooks/hooks";
import { useForm } from "../../hooks/useForm";
import { postTrains } from "../../services/actions/table-trains";
import { TTrain } from "../../services/reducers/table-trains";
import { useEffect } from "react";

export default function Table({
  disabled,
  trains,
}: {
  disabled: boolean;
  trains: TTrain[];
}) {
  const dispatch = useDispatch();
  useEffect(() => {}, [trains]);
  const [values, handleChange] = useForm<[]>([]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newTrainsArr = [];
    for (let key in values) {
      const trainNumber = key.split(":")[0];
      const speedNumber = key.split(":")[1];
      for (let i = 0; trains && i < trains.length; i++) {
        if (trains[i].name === trainNumber) {
          newTrainsArr.push(trains[i]);
          const arrIndex = newTrainsArr.length - 1;
          newTrainsArr[arrIndex].speedLimits.map((speed) => {
            if (speed.name === speedNumber) {
              speed.speedLimit = +values[key];
            }
          });
        }
      }
    }
    const resultTrainsArr = Array.from(new Set(newTrainsArr));
    resultTrainsArr.map((train) => {
      train.speedLimits.sort((a, b) => a.speedLimit - b.speedLimit);
    });

    //дальше можно resultTrainsArr отправлять на сервер (только те данные которые менялись)
    const mergedArray = trains && [...trains, ...resultTrainsArr];
    const mergedArrayWithoutRepeat = Array.from(new Set(mergedArray));

    dispatch(postTrains(mergedArrayWithoutRepeat));
  };

  return (
    <div className={style.Table}>
      <form className={style.Form} onSubmit={handleSubmit}>
        <div className={style.TableInputs}>
          {trains.map((train) => (
            <div key={train.name} className={style.TableColumn}>
              <p className={style.TableName}>{train.name}</p>
              <div>
                <p className={style.TableName}>Лимиты:</p>
                {train.speedLimits.map((element) => (
                  <input
                    key={element.name}
                    className={style.TableSpeed}
                    type="number"
                    step="1"
                    min="0"
                    name={train.name + ":" + element.name}
                    defaultValue={element.speedLimit}
                    value={values[element.speedLimit]}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {!disabled && (
          <button type="submit" className={style.TableButton}>
            Сохранить
          </button>
        )}
      </form>
    </div>
  );
}
