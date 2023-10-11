import { BACKEND_URL } from "./config.js";

export async function getQuestion(diff) {
    let items = await fetch(`${BACKEND_URL}/${diff}`).then((r) => r.json());
    // console.log(items[0]);
    
    return items[0];
}

export async function getRank(){
    let rank = await fetch(`${BACKEND_URL}/rank`).then((r) => r.json());
    return rank;

}

export async function createItem(item) {
  console.log(item);
  await fetch(`${BACKEND_URL}/rank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}