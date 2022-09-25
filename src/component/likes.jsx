import React, { Component } from 'react';

class Like extends Component {
    render() { 
        let clasess = "fa fa-heart"
        if(!this.props.liked)  clasess += '-o'

        return <i style={{cursor:"pointer"}} onClick={this.props.onToggle} className={clasess} aria-hidden="true"></i>;
    }
}
 
export default Like;