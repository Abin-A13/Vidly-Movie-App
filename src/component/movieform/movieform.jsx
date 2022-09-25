import Joi from "joi-browser";
import React from "react";
import { getGenere } from "../../services/genereService";
import {
  getMovieById,
  // deleteMovie,
  saveMovie
} from "../../services/movieServices";
import Form from "../login/form";

class MovieForm extends Form {
  state = {
    data: { title: "",  genre: "", StonumberInStock: "", dailyRentalRate: "" },
    geners: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(10),
  };
  async populateGeneres() {
    const { data: geners } = await getGenere();
    this.setState({ geners });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params._id;
      if (movieId === "new") return;
      const { data: movie } = await getMovieById(movieId);
      console.log(movie);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGeneres();
    await this.populateMovies();
  }
  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre["_id"],
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Movie Form</h1>
          {this.renderInput("title", "name")}
          {this.renderSelect("genre", "Genere", this.state.geners)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderBtn("save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
