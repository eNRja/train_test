import { useEffect } from "react";
import style from "./app.module.css";
import { getTrains } from "../services/actions/table-trains";
import { useDispatch, useSelector } from "../hooks/hooks";
import Table from "../components/table/table";
import Modal from "../components/modal/modal";

export default function App() {
  const dispatch = useDispatch();
  const { trains } = useSelector((state) => state.tableTrains);

  useEffect(() => {
    dispatch(getTrains());
  }, [dispatch]);

  if (!trains) {
    return <h2 className={style.App}>Загрузка...</h2>;
  } else {
    return (
      <>
        <div className={style.App}>
          <Table disabled={false} trains={trains} />
          <Table disabled={true} trains={trains} />
        </div>
        <Modal />
      </>
    );
  }
}
