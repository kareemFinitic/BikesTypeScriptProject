
import { api } from "./axios";

export async function getBikes() {
    let res = await api.get("search?location=Munich");
    if (res) return res.data;
    else return false;
}

