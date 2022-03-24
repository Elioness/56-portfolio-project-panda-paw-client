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

export function userEmissionsFetched(data) {
  return {
    type: "user/userEmissionsFetched",
    payload: data,
  };
}

export function submitNewTranspoFootprint(data) {
  return {
    type: "user/submitNewTranspoFootprint",
    payload: data,
  };
}

export function submitNewElecFootprint(data) {
  return {
    type: "user/submitNewElecFootprint",
    payload: data,
  };
}

export function submitNewPlantOffset(data) {
  return {
    type: "user/submitNewEPlantOffset",
    payload: data,
  };
}

export function updatedUserGoal(newGoal) {
  return {
    type: "user/updatedUserGoal",
    payload: newGoal,
  };
}

//POST new Transpo
export const postNewTranspoFootprint = ({
  title,
  footBikeDistance,
  trainDistance,
  carDistance,
  planeDistance,
  footBikeDays,
  trainDays,
  carDays,
  planeDays,
}) => {
  console.log("what is title?", title);
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response_newTranspoFootprint = await axios.post(
        `${apiUrl}/user/submitEmissionTranspo`,
        {
          title: title,
          footBikeDistance: footBikeDistance,
          trainDistance: trainDistance,
          carDistance: carDistance,
          planeDistance: planeDistance,
          footBikeDays: footBikeDays,
          trainDays: trainDays,
          carDays: carDays,
          planeDays: planeDays,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("post new", response_newTranspoFootprint);
      dispatch(submitNewTranspoFootprint(response_newTranspoFootprint.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//POST new Elec
export const postNewElecFootprint = ({ consumption }) => {
  console.log("what is consumption?", consumption);
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response_newElecFootprint = await axios.post(
        `${apiUrl}/user/submitEmissionElectricity`,
        {
          consumption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("post new", response_newElecFootprint);
      dispatch(submitNewElecFootprint(response_newElecFootprint.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//POST new Plant
export const postNewPlantOffset = ({ plants }) => {
  console.log("what is consumption?", plants);
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response_newPlantOffset = await axios.post(
        `${apiUrl}/user/submitPlantOffset`,
        {
          plants,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("post new", response_newPlantOffset);
      dispatch(submitNewPlantOffset(response_newPlantOffset.data));
    } catch (error) {
      console.log(error);
    }
  };
};

//GET endpoints
export default function fetchUserEmissions() {
  return async function thunk(dispatch, getState) {
    const { token } = selectUser(getState());

    const response_userEmission = await axios.get(`${apiUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(userEmissionsFetched(response_userEmission));
  };
}

//Patch user goal
export const updateGoal = (newGoal) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
      const response = await axios.patch(
        `${apiUrl}/user/${newGoal}`,
        {
          goal: newGoal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(updatedUserGoal(response.data));
    } catch (error) {
      if (error.message) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};
