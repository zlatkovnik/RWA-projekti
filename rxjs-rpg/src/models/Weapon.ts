import { WEAPON_PATH, WEAPON_COUNT_PATH } from "../util/paths";

export interface IWeapon {
  id: number;
  name: string;
  attack: number;
  cost: number;
}

export async function fetchWeapon(id: number): Promise<IWeapon> {
  return fetch(WEAPON_PATH + `/${id}`).then((res) => res.json());
}

export async function fetchAllWeapons(): Promise<IWeapon[]> {
  return fetch(WEAPON_PATH).then((res) => res.json());
}

export async function fetchWeaponCount(): Promise<number> {
  return fetch(WEAPON_COUNT_PATH)
    .then((res) => res.json())
    .then((data) => data.count);
}
