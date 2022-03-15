export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;
export const selectUserId = (state) => state.user.id;
export const selectUserEmissions = (state) => state.user.userEmissions;
export const selectTranspoFootprints = (state) =>
  state.user.userEmissions.transpoFootprints;
export const selectElectricityFootprints = (state) =>
  state.user.userEmissions.electricityFootprints;
export const selectPlantOffsets = (state) =>
  state.user.userEmissions.plantOffsets;
