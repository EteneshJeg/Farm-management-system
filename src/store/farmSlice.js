import { createSlice } from "@reduxjs/toolkit";

// Demo data initialization
const createDemoData = () => {
  const demoFarms = [
    {
      id: "demo-farm-1",
      farmName: "Green Valley Poultry",
      ownerName: "John Smith",
      location: { latitude: 40.7128, longitude: -74.006 },
      flockType: "Layers",
      initialBirdCount: 5000,
      startDate: "2024-01-15",
      createdAt: "2024-01-15T08:00:00Z",
    },
    {
      id: "demo-farm-2",
      farmName: "Sunrise Farms",
      ownerName: "Sarah Johnson",
      location: { latitude: 34.0522, longitude: -118.2437 },
      flockType: "Broilers",
      initialBirdCount: 8000,
      startDate: "2024-02-01",
      createdAt: "2024-02-01T08:00:00Z",
    },
  ];

  const today = new Date();
  const demoReports = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    demoReports.push({
      id: `report-1-${i}`,
      farmId: "demo-farm-1",
      date: dateStr,
      eggsCollected: 3500 + Math.floor(Math.random() * 500),
      feedUsed: 250 + Math.floor(Math.random() * 50),
      mortality: Math.floor(Math.random() * 5),
      createdAt: date.toISOString(),
    });

    demoReports.push({
      id: `report-2-${i}`,
      farmId: "demo-farm-2",
      date: dateStr,
      eggsCollected: 0,
      feedUsed: 400 + Math.floor(Math.random() * 80),
      mortality: Math.floor(Math.random() * 8),
      createdAt: date.toISOString(),
    });
  }

  return { farms: demoFarms, reports: demoReports };
};

const demoData = createDemoData();

const initialState = {
  farms: demoData.farms,
  reports: demoData.reports,
  loading: {
    farms: false,
    reports: false,
    submittingFarm: false,
    submittingReport: false,
  },
  error: {
    farms: null,
    reports: null,
    submittingFarm: null,
    submittingReport: null,
  },
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    // Fetch farms
    fetchFarmsStart(state) {
      state.loading.farms = true;
      state.error.farms = null;
    },
    fetchFarmsSuccess(state, action) {
      state.farms = action.payload;
      state.loading.farms = false;
    },
    fetchFarmsFailure(state, action) {
      state.loading.farms = false;
      state.error.farms = action.payload;
    },

    // Register farm
    registerFarmStart(state) {
      state.loading.submittingFarm = true;
      state.error.submittingFarm = null;
    },
    registerFarmSuccess(state, action) {
      state.farms.push(action.payload);
      state.loading.submittingFarm = false;
    },
    registerFarmFailure(state, action) {
      state.loading.submittingFarm = false;
      state.error.submittingFarm = action.payload;
    },

    // Fetch reports
    fetchReportsStart(state) {
      state.loading.reports = true;
      state.error.reports = null;
    },
    fetchReportsSuccess(state, action) {
      state.reports = action.payload;
      state.loading.reports = false;
    },
    fetchReportsFailure(state, action) {
      state.loading.reports = false;
      state.error.reports = action.payload;
    },

    // Submit daily report
    submitReportStart(state) {
      state.loading.submittingReport = true;
      state.error.submittingReport = null;
    },
    submitReportSuccess(state, action) {
      state.reports.push(action.payload);
      state.loading.submittingReport = false;
    },
    submitReportFailure(state, action) {
      state.loading.submittingReport = false;
      state.error.submittingReport = action.payload;
    },

    // Clear errors
    clearErrors(state) {
      state.error = {
        farms: null,
        reports: null,
        submittingFarm: null,
        submittingReport: null,
      };
    },
  },
});

export const {
  fetchFarmsStart,
  fetchFarmsSuccess,
  fetchFarmsFailure,
  registerFarmStart,
  registerFarmSuccess,
  registerFarmFailure,
  fetchReportsStart,
  fetchReportsSuccess,
  fetchReportsFailure,
  submitReportStart,
  submitReportSuccess,
  submitReportFailure,
  clearErrors,
} = farmSlice.actions;

export default farmSlice.reducer;
