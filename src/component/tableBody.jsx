import React, { Component } from 'react';
import Like from "./likes";
import _ from "lodash"
import auth from '../services/authService';

class TableBody extends Component {
    renderCell = (item, column) => {
      if(column.content) return column.content(item)
      return _.get(item, column.path)
    }
    createKey = (item,col) =>{
      return item._id + (col.path || col.key);
    }
    render() { 
        let { coloums,items,onLike,onDelete } = this.props
        return (
            <tbody>
              {items.map((movie) => (
                <tr key={movie._id}>
                  {coloums.map(col =><td key={this.createKey(movie,col)}>{this.renderCell(movie,col)}</td> )}
                  <td>
                    <Like
                      key={movie._id}
                      liked={movie.liked}
                      onToggle={() => onLike(movie) }
                    ></Like>
                  </td>
                  <td>
                   {auth.getCurrentUser() ? <button
                      onClick={() => onDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button> : null}
                  </td>
                </tr>
              ))}
            </tbody>
        );
    }
}
 
export default TableBody;