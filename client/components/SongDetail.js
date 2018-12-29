import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { query } from '../queries/getSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {

    constructor(props) {
        super(props); 
    }

    render() {
        const { song } = this.props.data;

        if(!song) { return <div>Loading...</div> }
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate id={this.props.routeParams.id}/>
            </div>
        )
    }

}

export default graphql(query, { options : (props) => { return { variables : { id : props.routeParams.id } } } })(SongDetail);