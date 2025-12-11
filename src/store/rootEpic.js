import { registerFarmEpic, submitReportEpic } from "./farmEpics";

import { combineEpics } from "redux-observable";

export const rootEpic = combineEpics(registerFarmEpic, submitReportEpic);
