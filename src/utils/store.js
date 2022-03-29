import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../caracteristiques/movies";

export default configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
