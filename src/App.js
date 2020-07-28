import React from "react";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import MoviesList from "./MoviesList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <MoviesList />
      </Provider>
    </div>
  );
}

export default App;
