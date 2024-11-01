import { BoundSlice } from "@/interfaces/slice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createGameSlice } from "./gameSlice";

const useBoundStore = create<BoundSlice>()(
  devtools((...a) => ({
    ...createGameSlice(...a),
  })),
);

export default useBoundStore;
