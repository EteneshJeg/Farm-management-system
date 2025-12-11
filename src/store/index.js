import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import farmReducer from "./farmSlice";
import { rootEpic } from "./rootEpic";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    farm: farmReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

// No TypeScript types needed in JS
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
