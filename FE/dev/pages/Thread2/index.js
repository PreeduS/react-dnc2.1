import React from 'react';
import {connect} from 'react-redux';

//actions
import {loadComments } from './actions/comments';

import Comments from './containers/Comments';
import Content from './components/Content';
import LoaderHoc from '~/commons/components/LoaderHoc';
const CommentsHoc = LoaderHoc(Comments);

import * as styles from './styles/Thread';


class Thread extends React.Component {
    componentDidMount(){
        const threadId = 1;
        this.props.loadComments(threadId);
    }
    render() {
        const {comments} = this.props;
        const isLoading = Object.keys(comments.data).length > 0;
        return (
            <styles.ThreadWrapper>
                <Content />
                <CommentsHoc loading = {isLoading} />
            </styles.ThreadWrapper>
        );
    }
}


const mapStateToProps = state =>( {
    comments: state.CommentsReducer.comments
});
const mapDispatchToProps = dispatch => ({
    loadComments: threadId =>
        dispatch(() => loadComments(threadId)(dispatch))

});

export default connect(mapStateToProps, mapDispatchToProps)(Thread);