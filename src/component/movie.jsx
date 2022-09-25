import React, { Component } from "react";
// import { getGenere } from "../services/fakeGenereService";
// import { getMovies } from "../services/fakeMovieService";
import paginator from "../utils/paginator";
import Filters from "./filter";
import MovieTable from "./movieTable";
import Paginator from "./paginationor";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./movieform/searchBox";
import { getGenere } from "../services/genereService";
import { getMovies, deleteMovie } from "../services/movieServices";
// import {toast} from 'react-toastify'

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenere();
    const genres = [{ _id: "", name: "All Generes" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genre: genres });
  }

  handleliked = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    // const orignalMovies = this.state.movies
    // let movies = orignalMovies.filter((mov) => mov._id !== movie._id);
    // this.setState({ movies: movies });

    deleteMovie(movie._id);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenre = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allmovies,
    } = this.state;
    let filtered = allmovies;
    if (searchQuery)
      filtered = allmovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allmovies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginator(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    let { length: count } = this.state.movies;
    let { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    if (count === 0) return <p>there is no movies</p>;
    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <Filters
            items={this.state.genre}
            selectedGenre={this.state.selectedGenre}
            onSelectitem={this.handleGenre}
          ></Filters>
        </div>
        <div className="col">
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <p>Showing {totalCount} from the databases</p>
            {user && <Link className="btn btn-primary" to="/movies/new"> Add Movies</Link>}
          <MovieTable
            movies={movies}
            sortColumn={sortColumn}
            onSortitem={this.handleSort}
            onLike={this.handleliked}
            onDelete={this.handleDelete}
          ></MovieTable>
          <Paginator
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Paginator>
        </div>
      </div>
    );
  }
}

export default Movies;
