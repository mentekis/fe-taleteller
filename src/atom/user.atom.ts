import { IUser } from "@/types/user/user.types";
import { atom } from "jotai";

export const userAtom = atom<IUser | null>(null);