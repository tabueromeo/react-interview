// Store/configureStore.js

import { createStore } from "redux";
import toggleactionReducer from "./Reducers/moviesReducer";

export default createStore(toggleactionReducer);
