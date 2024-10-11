import { IUser } from "@/types/user/user.types";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<IUser | null>("user", null);