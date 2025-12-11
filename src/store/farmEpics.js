import { catchError, delay, mergeMap } from "rxjs/operators";
import {
  registerFarmFailure,
  registerFarmStart,
  registerFarmSuccess,
  submitReportFailure,
  submitReportStart,
  submitReportSuccess,
} from "./farmSlice";

import { of } from "rxjs";
import { ofType } from "redux-observable";

const API_DELAY = 600;

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Register farm epic - creates a new farm
export const registerFarmEpic = (action$) =>
  action$.pipe(
    ofType(registerFarmStart.type),
    mergeMap((action) => {
      const newFarm = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };

      return of(registerFarmSuccess(newFarm)).pipe(delay(API_DELAY));
    }),
    catchError((error) =>
      of(registerFarmFailure(error.message || "Failed to register farm"))
    )
  );

// Submit report epic - creates a new daily report
export const submitReportEpic = (action$) =>
  action$.pipe(
    ofType(submitReportStart.type),
    mergeMap((action) => {
      const newReport = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
      };

      return of(submitReportSuccess(newReport)).pipe(delay(API_DELAY));
    }),
    catchError((error) =>
      of(submitReportFailure(error.message || "Failed to submit report"))
    )
  );
