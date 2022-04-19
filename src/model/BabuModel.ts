import { orange, red } from "@mui/material/colors";

export interface Babu {
  user: UserType;
  event: EventType;
}

export const UserType = {
  father: { id: "father", name: "おとうさん", bgColor: undefined },
  mother: { id: "mother", name: "おかあさん", bgColor: red["500"] },
  mother_grandma: { id: "mother_grandma", name: "おばあちゃん", bgColor: orange["500"] }
} as const;
export type UserType = typeof UserType[keyof typeof UserType];
export const UserTypeKeys = Object.keys(UserType) as (keyof typeof UserType)[];
const UserTypeArray = Object.entries(UserType).map(([_, value]) => ({ "id": value.id, "name": value.name }));


export const EventType = {
  pee: { id: "pee", name: "おしっこ" },
  poop: { id: "poop", name: "　うんち" },
  sleep: { id: "sleep", name: "おやすみ" },
  wake_up: { id: "wake_up", name: "おはよう" },
  mother_milk_left: { id: "mother_milk_left", name: "　ぱいL" },
  mother_milk_right: { id: "mother_milk_right", name: "　ぱいR" },
  milk: { id: "milk", name: "ミルク" }
} as const;

export type EventType = typeof EventType[keyof typeof EventType];
export const EventTypeKeys = Object.keys(EventType) as (keyof typeof EventType)[];
const EventTypeArray = Object.entries(EventType).map(([_, value]) => ({ "id": value.id, "name": value.name }));