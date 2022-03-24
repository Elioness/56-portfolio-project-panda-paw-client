import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  userEmissions: [],
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

    case "user/userEmissionsFetched":
      //console.log("userEmission", action.payload);
      return {
        ...state,
        userEmissions: action.payload.data,
      };

    case "user/updatedUserGoal":
      console.log("updatedGoal", action.payload);
      return {
        ...state,
        goal: action.payload,
      };

    default:
      return state;
  }
}
