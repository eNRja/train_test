import { trains } from "../database/database";
import { TTrain } from "../services/reducers/table-trains";

export async function getApiTrains() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return trains;
}

export async function postApiTrains(trainChangedSpeed: TTrain[]) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (trainChangedSpeed) {
    return {success: true};
  } 
  return {success: false};
}
