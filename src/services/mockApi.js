import { map, switchMap } from "rxjs/operators";
import { of, throwError, timer } from "rxjs";

// Simulated delay for API calls
const API_DELAY = 800;

// In-memory storage
let farms = [];
let dailyReports = [];

// Generate unique ID
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Simulate network delay
const withDelay = (data) => {
  return timer(API_DELAY).pipe(map(() => data));
};

// POST /api/farms - Register a new farm
export const registerFarm = (payload) => {
  const newFarm = {
    id: generateId(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  farms = [...farms, newFarm];

  return withDelay(newFarm);
};

// GET /api/farms - Get all farms
export const getFarms = () => {
  return withDelay([...farms]);
};

// GET /api/farms/:id - Get a single farm
export const getFarmById = (farmId) => {
  const farm = farms.find((f) => f.id === farmId);
  return withDelay(farm);
};

// POST /api/farms/:farm_id/daily-report - Submit daily report
export const submitDailyReport = (payload) => {
  const farm = farms.find((f) => f.id === payload.farmId);

  if (!farm) {
    return timer(API_DELAY).pipe(
      switchMap(() => throwError(() => new Error("Farm not found")))
    );
  }

  const newReport = {
    id: generateId(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  dailyReports = [...dailyReports, newReport];

  return withDelay(newReport);
};

// GET /api/farms/:farm_id/daily-reports - Get reports for a farm
export const getReportsByFarm = (farmId) => {
  const reports = dailyReports.filter((r) => r.farmId === farmId);
  return withDelay(reports);
};

// GET /api/daily-reports - Get all reports
export const getAllReports = () => {
  return withDelay([...dailyReports]);
};

// Initialize with some demo data
export const initializeDemoData = () => {
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

  // Generate 7 days of reports for each farm
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
      eggsCollected: 0, // Broilers don't lay eggs
      feedUsed: 400 + Math.floor(Math.random() * 80),
      mortality: Math.floor(Math.random() * 8),
      createdAt: date.toISOString(),
    });
  }

  farms = demoFarms;
  dailyReports = demoReports;
};

// Initialize demo data on import
initializeDemoData();
