// import { createStore } from "redux"; // there combineStore but we can use configureStore in toolkit
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { headerText: "Welcome to react App", loginCount: 0 };

const headerTitle = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateHeader(state, action) {
      state.headerText = action.payload.title;
      state.loginCount++;
    },
  },
});

// we can create another slice and add the reducer in the configure store
// we have to export the actions also

// without using redux toolkit pass the dataReducer in createStore
// const dataReducer = (state = initialValue, action) => {
//   switch (action.type) {
//     case "home":
//       return {
//         headerText: "Welcome to home page",
//         loginCount: state.loginCount + 1,
//       };
//     default:
//       return state;
//   }
// };

const dataStore = configureStore({
  reducer: headerTitle.reducer, // if u have multiple reducer we can use {header: headerTitle.reducer}
});

// this will create the action identifier
export const headerActions = headerTitle.actions;
export default dataStore;
