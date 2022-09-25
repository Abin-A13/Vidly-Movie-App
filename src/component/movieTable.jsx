import React, { Component } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import {Link} from 'react-router-dom'


class MovieTable extends Component {
    coloum = [
      { path : "title", label : "Title", content: movie=> <Link  to={`/movies/${movie._id}`}>{movie.title}</Link> },
      { path : "genre.name", label : "Genre" },
      { path : "numberInStock", label : "Stock" },
      { path : "dailyRentalRate", label : "Rate" },
      { key : "like"},
      { key : "delete"}
    ]

    render() { 
        const { movies , onLike, onDelete,onSortitem,sortColumn } = this.props
        return (
            <table className="table">
            <TableHeader coloums={this.coloum} sortColumn={sortColumn} onSort={onSortitem}></TableHeader>
            <TableBody coloums={this.coloum} items={movies} onLike={onLike} onDelete={onDelete}></TableBody>
          </table>
        );
    }
}
 
export default MovieTable;