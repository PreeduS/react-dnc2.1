import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//actions
import {loadComments } from './actions/comments';

import Comments from './containers/Comments';
import Content from './components/Content';
import LoaderHoc from '~/commons/components/LoaderHoc';
const CommentsHoc = LoaderHoc(Comments);

import * as styles from './styles/Thread';


class Thread extends React.Component {
    componentDidMount(){
        //const threadId = this.props.thread.id;
        const threadId = this.props.match.params.id;
        this.props.loadComments(threadId);
    }
    render() {
        const {comments} = this.props;
        const isLoading = false;//Object.keys(comments.data).length === 0;//and loaderStatus === loaderStatus.pending;
        const threadId = this.props.match.params.id;
        return (
            <styles.ThreadWrapper>
                <Content threadId = {threadId}/>
                <CommentsHoc loading = {isLoading} threadId = {threadId}/>
            </styles.ThreadWrapper>
        );
    }
}

Thread.propTypes = {
    comments: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,
};

const mapStateToProps = state =>( {
    comments: state.CommentsReducer.comments,
    thread: state.ThreadReducer.thread
});
const mapDispatchToProps = dispatch => ({
    loadComments: threadId =>
        dispatch(() => loadComments(threadId)(dispatch))

});

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
