import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import { query } from '../queries/fetchSongs';

class SongList extends Component {

    deleteSong(e, id){
        e.preventDefault();
        this.props.mutate({
            variables : { id }
        }).then(() => {
            this.props.data.refetch();
        });
    }

    render() {
        if(this.props.data.loading) { return <div>Loading.....</div>}

        const songs = this.props.data.songs || [];
        return (
            <div>
                <ul className="collection">
                    {songs.map((song) => {
                        return <li key={song.id} className="collection-item">
                            <Link to={`/song/${song.id}`}>{song.title}</Link>
                            <i className="material-icons"  onClick={e => this.deleteSong(e, song.id)}>delete</i>
                        </li>
                    })}
                </ul>
                <Link 
                    to="/song/new"
                    className="btn-floating btn-large red right"
                > 
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
mutation DeleteSong($id : ID){
    deleteSong(id: $id) {
      id
    }
  }
`;


export default graphql(mutation)(
    graphql(query)(SongList)
);