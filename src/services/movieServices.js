import http from "./httpServices";
import config from "../config.json"

const endpoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(endpoint);
}

export function getMovieById(movId) {
  return http.get(endpoint + "/" + movId);
}

export function deleteMovie(movieId){
  return http.delete(endpoint + "/" +movieId);
}

export function saveMovie(movie){
  if(movie._id){
    const movies = {...movie}
    delete movies._id
    return http.put(endpoint+"/"+movie._id,movies)
  }
  return http.post(endpoint,movie)
}