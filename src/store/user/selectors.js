export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const selectTables = (reduxState) => reduxState.user.tables;

export const selectReservations = (reduxState) => reduxState.user.reservations;

export const selectReservationsWithUsers = (reduxState) =>
  reduxState.user.reservationsWithUser;

export const selectAllUser = (state) => state.user.users;

export const selectIsAccountBlocked = (state) => state.user.accountBlocked;
