import { useContext } from "react";
import { AuthStore } from "./authStore";
import { StoreContext } from "./storeContext";

export const useStore = (): AuthStore => useContext(StoreContext);