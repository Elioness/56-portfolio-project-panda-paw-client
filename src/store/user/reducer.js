import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  tables: [],
  users: [],
  reservations: [],
  reservationsWithUser: [],
  accountBlocked: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "user/getAllTables":
      //console.log("tables", action.payload);
      return {
        ...state,
        tables: action.payload,
      };
    case "user/getAllReservations":
      //console.log("reservations", action.payload);
      return {
        ...state,
        reservations: action.payload,
      };

    case "user/createNewReservationSuccess":
      //console.log("users", action.payload);
      return {
        ...state,
        reservations: [...state.reservations, action.payload],
      };

    case "user/reservationsAndUsersFetched":
      //console.log("users and reservations payload", action.payload);
      return {
        ...state,
        reservationsWithUser: action.payload,
      };

    case "user/deletedReservation":
      console.log("reservationId", action.payload);
      const reservationId = action.payload;
      const reservations = state.reservationsWithUser;
      const reservationFiltered = reservations.filter(
        (reservation) => reservation.id !== reservationId
      );
      return {
        ...state,
        reservationsWithUser: reservationFiltered,
      };

    case "user/getAllUsers":
      return {
        ...state,
        users: action.payload,
      };

    case "user/patchAccountBlocked":
      return {
        ...state,
        accountBlocked: action.payload,
      };

    default:
      return state;
  }
}
