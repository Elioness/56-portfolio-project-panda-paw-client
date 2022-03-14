import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { selectUser } from "./selectors";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export function tablesFetched(data) {
  return {
    type: "user/getAllTables",
    payload: data,
  };
}

export function reservationsFetched(data) {
  return {
    type: "user/getAllReservations",
    payload: data,
  };
}

export function createNewReservationSuccess(newReservation) {
  return {
    type: "user/createNewReservationSuccess",
    payload: newReservation,
  };
}

export function reservationsAndUsersFetched(data) {
  return {
    type: "user/reservationsAndUsersFetched",
    payload: data,
  };
}

export function allUsersFetched(data) {
  return {
    type: "user/getAllUsers",
    payload: data,
  };
}

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function deletedReservation(id) {
  return {
    type: "user/deletedReservation",
    payload: id,
  };
}

export function patchedAccountBlocked(data) {
  return {
    type: "user/patchAccountBlocked",
    payload: data,
  };
}

//POST new Reservation
export const postNewReservation = (date, tableId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response_newReservation = await axios.post(
        `${apiUrl}/reservation/newReservation`,
        {
          date: date,
          tableId: tableId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //console.log("post new story", response);
      dispatch(createNewReservationSuccess(response_newReservation.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//DELETE a reservation
export function deleteReservation(id) {
  return async function deleteStoryThunk(dispatch, getState) {
    try {
      const { token } = selectUser(getState());
      const response = await axios.delete(`${apiUrl}/reservation/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("This reservation has been deleted", response);

      dispatch(deletedReservation(id));
    } catch (e) {
      console.log(e.message);
    }
  };
}

//PATCH new AccountBlocked
export const patchAccountBlocked = (accountBlocked) => {
  return async (dispatch, getState) => {
    try {
      const { token, accountBlocked } = selectUser(getState());

      const response_accountBlocked = await axios.update(
        `${apiUrl}/users/accountBlocked`,
        {
          accountBlocked: !accountBlocked,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //console.log("post new story", response);
      dispatch(patchedAccountBlocked(response_accountBlocked.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//GET endpoints
//Get token for isAdmin
export default async function fetchPosts(dispatch, getState) {
  const response = await axios.get(`${apiUrl}/table`);

  const { token } = selectUser(getState());
  //console.log("tables w reservations fetched", response.data);
  dispatch(tablesFetched(response.data));

  const response_reservations = await axios.get(`${apiUrl}/reservation`);
  dispatch(reservationsFetched(response_reservations.data));

  const response_reservationsAndUsers = await axios.get(
    `${apiUrl}/reservation/allReservations`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  //console.log(" User with reservations", response_reservationsAndUsers);
  dispatch(reservationsAndUsersFetched(response_reservationsAndUsers.data));

  const response_allUsers = await axios.get(`${apiUrl}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(allUsersFetched(response_allUsers.data));
}
