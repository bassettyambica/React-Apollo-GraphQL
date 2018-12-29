import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {

    handleLikesCount(likes, id){
        this.props.mutate({
            variables : { id },
            optimisticResponse : {
                __typename : 'Mutation',
                likeLyric: {
                    id : id,
                    __typename: "LyricType",
                    likes : likes++
                }
            }
        }).then(() => {
        });
    }

    render () {
        const {lyrics} = this.props;
        console.log("lyrics", lyrics);
        return (
            <ul className="collection">
                {lyrics.map(lyric => {
                    return ( 
                    <li className="collection-item" key={lyric.id}>
                        {lyric.content}
                        <div className="vote-box">
                            <i onClick={() => this.handleLikesCount(lyric.likes, lyric.id)} className="material-icons">thumb_up</i>
                            {lyric.likes}
                        </div>
                    </li>)
                })}
            </ul>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id : ID){
        likeLyric(id : $id){
            id
            likes
        }
    }
`;


export default graphql(mutation)(LyricList);