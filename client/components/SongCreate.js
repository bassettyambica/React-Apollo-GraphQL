import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import { query } from '../queries/fetchSongs';

class SongCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title : ''
        }
    }

    onSubmit(e){
        e.preventDefault();
        this.props.mutate({
            variables : { title : this.state.title },
            refetchQueries: [{ query }]
        }).then(() => {
            hashHistory.push('/');
        });
    }


    render () {
        return (
            <div>
                <h5>Create a new song</h5>
                <Link to="/"> Back </Link>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label>Add a new Song</label>
                    <input 
                        onChange={event => this.setState({ title : event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title : String){
    addSong(title : $title) {
      id
      title
    }
  }
`;


export default graphql(mutation)(SongCreate);