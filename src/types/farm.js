// Define possible flock types as constants
export const FlockTypes = {
  LAYERS: "Layers",
  BROILERS: "Broilers",
  BREEDERS: "Breeders",
  FREE_RANGE: "Free Range",
};

// Farm object example
export const createFarm = ({
  id,
  farmName,
  ownerName,
  location,
  flockType,
  initialBirdCount,
  startDate,
  createdAt,
}) => ({
  id,
  farmName,
  ownerName,
  location,
  flockType,
  initialBirdCount,
  startDate,
  createdAt,
});

// Daily report object example
export const createDailyReport = ({
  id,
  farmId,
  date,
  eggsCollected,
  feedUsed,
  mortality,
  createdAt,
}) => ({
  id,
  farmId,
  date,
  eggsCollected,
  feedUsed,
  mortality,
  createdAt,
});

// Farm registration payload example
export const createFarmRegistrationPayload = ({
  farmName,
  ownerName,
  location,
  flockType,
  initialBirdCount,
  startDate,
}) => ({
  farmName,
  ownerName,
  location,
  flockType,
  initialBirdCount,
  startDate,
});

// Daily report payload example
export const createDailyReportPayload = ({
  farmId,
  date,
  eggsCollected,
  feedUsed,
  mortality,
}) => ({
  farmId,
  date,
  eggsCollected,
  feedUsed,
  mortality,
});

// Farm with reports
export const createFarmWithReports = (farm, reports) => ({
  ...farm,
  reports,
});
