import React, { Component } from 'react';


class TableHeader extends Component {
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path)
          sortColumn.order = (sortColumn.order === 'asc' ) ? 'desc' : 'asc';
        else{
          sortColumn.path = path;
          sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn)
    }
    renderSortIcon = (coloum) =>{
        const { sortColumn } = this.props;
        if (coloum.path !== sortColumn.path) return null
        if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }
    render() { 
        const   { coloums } = this.props
        return ( <thead>
            <tr className='clickable'>
                {coloums.map(items => <th key={items.path || items.key} onClick={()=>this.raiseSort(items.path)} >{items.label}{this.renderSortIcon(items)}</th>)}
                
            </tr>
        </thead> );
    }
}
 
export default TableHeader;