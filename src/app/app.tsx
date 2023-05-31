import { useEffect } from "react";
import style from "./app.module.css";
import { getTrains } from "../services/actions/table-trains";
import { useDispatch, useSelector } from "../hooks/hooks";
import Modal from "../components/modal/modal";
import TableTrains from "../components/tables/table-trains";
import TableTrain from "../components/tables/table-train";

export default function App() {
  const dispatch = useDispatch();
  const { trains } = useSelector((state) => state.tableTrains);

  useEffect(() => {
    dispatch(getTrains());
  }, [dispatch]);

  if (!trains) {
    return <p className={style.AppLoader}>Загрузка...</p>;
  } else {
    return (
      <>
        <div className={style.App}>
          <TableTrains />
          <TableTrain />
        </div>
        <Modal />
      </>
    );
  }
}
