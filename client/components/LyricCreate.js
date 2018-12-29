import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { hashHistory } from 'react-router';
import { query } from '../queries/getSong';

class LyricCreate extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            content : ``
        }
    }
    onSubmit(e){
        e.preventDefault();
        const path = `/song/${this.props.id}`
        console.log("id passed", this.state.content, this.props.id )
        this.props.mutate({
            variables : { content : this.state.content, songId: this.props.id },
            refetchQueries: [{ query }]
        }).then(() => {
            this.setState({ content : ''});
            // hashHistory.push(path);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label>Add a new Lyrics...</label>
                    <input 
                        onChange={event => this.setState({ content : event.target.value })}
                        value={this.state.content}
                    />
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content : String, $songId: ID){
        addLyricToSong(content: $content, songId : $songId) {
            id
            lyrics{
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);