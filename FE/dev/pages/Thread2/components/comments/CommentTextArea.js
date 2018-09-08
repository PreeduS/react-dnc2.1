import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {textareaStatus} from '../../constants';

import {getComments, geTextarea} from '../../selectors';
//import CommentsReducer from '../reducers/CommentsReducer';

import Button from '~/commons/components/Button';
import * as styles from '../../styles/CommentTextArea';

class CommentTextArea extends React.Component {
    constructor(){
        super();
        this.resizeTextarea = this.resizeTextarea.bind(this);
        this.addCommentOrReply = this.addCommentOrReply.bind(this);
        this.getTextareaValue = this.getTextareaValue.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.prevHeight = null;

    }

    resizeTextarea(el){
        let elem = el.target;
        elem.style.height = 'auto';
        elem.style.height = elem.scrollHeight;
    }
    onChange(el){
        this.props.onChange(el);
    }

    addCommentOrReply(){
        const textareaValue = this.getTextareaValue();
        this.props.onSubmit(textareaValue);
    }
    getTextareaValue(){
        const {id, textarea} = this.props;
        const textareaValue = (textarea[id] && textarea[id].value) || '';
        return textareaValue;
    }

    render() {
        const {id, isReply, isVisible, onSubmit, textarea} = this.props;
        const currentStatus = (textarea[id] && textarea[id].status) || null;
        const isPending = currentStatus === textareaStatus.pending;
        const isError = currentStatus === textareaStatus.rejected;   //'error';
        const textareaValue =  this.getTextareaValue();

        const isSubmitDisabled = textareaValue.trim().length === 0 || isPending;
        const label = isReply ? 'Add Reply' : 'Add Comment';

        if(!isVisible){  return <div></div>;  }

        return(
            <styles.CommentTextAreaWrapper>
                <textarea
                    disabled = {isPending}
                    onChange = {e=> {this.resizeTextarea(e); this.onChange(e);} }
                    value = {textareaValue}>
                </textarea>
                <br />

                <Button
                    onClick = {this.addCommentOrReply}
                    disabled = {isSubmitDisabled}
                    inlineStyles = {'border-top:0px !important;border-top-left-radius: 0px;border-top-right-radius: 0px;'}
                    loading = {isPending}
                    width = {isReply ? 100 : 120}
                >
                {label}
                </Button>
                {isError && <styles.Error>An error occurred</styles.Error>}

            </styles.CommentTextAreaWrapper>
        );
    }
}
CommentTextArea.propTypes = {
    id: PropTypes.number.isRequired,
    comments: PropTypes.object.isRequired,
    textarea: PropTypes.object.isRequired,
    isReply: PropTypes.bool.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}


const mapStateToProps = state =>( {
    comments: getComments(state),
    textarea: geTextarea(state)
});

export default connect(mapStateToProps, null)(CommentTextArea);
