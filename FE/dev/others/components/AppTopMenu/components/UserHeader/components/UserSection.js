import React from 'react';
import {connect} from 'react-redux';
//import styles from '../styles/UserSection.scss';
import * as styles from '../styles/UserSection';

import Dropdown from '~/commons/components/Dropdown';
import LoginForm from '../components/LoginForm';

import {getUser} from '~/commons/selectors';
import {userStatus} from '~/commons/constants';

//actions
import {login, logout} from '~/commons/actions/user';


import LoaderHoc from '~/commons/components/LoaderHoc';
const UserSectionHoc = LoaderHoc(styles.UserSectionContainer);

class UserSection extends React.Component {
    constructor(){
        super();
        this.state = {
            showDropdown:false,
            showStatus: false
        }
        this.dropdownButtonContainerRef = React.createRef(); 

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.dropdownBlur = this.dropdownBlur.bind(this);
        this.getStatusMessage = this.getStatusMessage.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

    }
    toggleDropdown(){
        const {user} = this.props;
        const isPending = user.loginStatus === userStatus.pending; //|| user.initialLoginStatus === userStatus.pending;
        if(isPending){return;}
        this.setState({showDropdown: !this.state.showDropdown});
    }
    dropdownBlur(e){
        const {user} = this.props;
        const isPending = user.loginStatus === userStatus.pending; //|| user.initialLoginStatus === userStatus.pending;
        if(isPending){return;}
        if( [...this.dropdownButtonContainerRef.current.children].indexOf(e.target) === -1  ){
            this.setState({showDropdown: false});
        }
    }
    login(username, password){      
        const {login} = this.props;
        login(username, password);
        this.setState({showStatus:true})
    }
    logout(){
        const {logout} = this.props;
        logout();
    }

    getStatusMessage(){
        const {user} = this.props;
        const loginStatus = user.loginStatus;   
        if(!this.state.showStatus){return '';}

        let status = '';
        if(loginStatus === userStatus.pending){
            status = 'Loading...'
        }else if(loginStatus === userStatus.fulfilled){
            status = 'Logged in successfully'
        }else if(loginStatus === userStatus.rejected){
            status = 'Wrong username of password'
        }
        return status;
    }


    componentDidUpdate(prevProps, prevState){
        const prevLoginStatus = prevProps.user.loginStatus;
        const loginStatus = this.props.user.loginStatus;

        if( prevLoginStatus === userStatus.pending &&
            loginStatus === userStatus.fulfilled &&
            this.state.showDropdown
        ){
            this.setState({showDropdown:false})
        }

        if( 
            !prevState.showDropdown &&
            this.state.showDropdown && (
                (prevLoginStatus === userStatus.fulfilled && loginStatus === userStatus.fulfilled) ||
                (prevLoginStatus === userStatus.rejected && loginStatus === userStatus.rejected)
            )
        ){
            this.setState({showStatus:false})
        }
    }

    
    render(){
        const {showDropdown} = this.state;
        const {user} = this.props;
        const {username} = user;
        const loggedIn = username !== null;
        const {loginStatus, initialLoginStatus, logoutStatus} = user;

        const isPendingLogin = loginStatus === userStatus.pending;
        const isPendingLogout = logoutStatus === userStatus.pending;   
        const isInitialPending = initialLoginStatus === userStatus.pending;

        const isPendingHoc = isPendingLogin || isPendingLogout || isInitialPending;

        const statusMessage = this.getStatusMessage();

        return(
            <styles.UserSection>
                <UserSectionHoc loading = {isPendingHoc} loader = {isInitialPending} label = {null}>
                    <styles.LeftContent></styles.LeftContent>
                    <styles.RightContent>
                        <div ref = {this.dropdownButtonContainerRef}>
                            <div onClick = {this.toggleDropdown}>{username || 'Login'}</div>
                            <div onClick = {this.toggleDropdown}>&#9662;</div>

                            {loggedIn && <div onClick = {this.logout}>logout</div>}
                        </div>
                    </styles.RightContent>
                </UserSectionHoc>
                
                <styles.DropDownContainer>
                    <Dropdown 
                        showDropdown = {showDropdown} 
                        onDropdownBlur = {this.dropdownBlur}
                    >
                        {!loggedIn && 
                            <LoginForm 
                                login = {this.login} 
                                disabled = {isPendingLogin}
                                statusMessage = {statusMessage}
                        />}
                        {loggedIn && 
                            <div>
                               Login menu
                            </div>
                        }
                    </Dropdown>
                </styles.DropDownContainer>
            </styles.UserSection>
        );
    }

}

const mapStateToProps = state=> ({
    user:getUser(state)
});
const mapDispatchToProps = (dispatch)=>({
    login: (username, password) => 
        dispatch(()=> login(username, password)(dispatch) )
    ,    
    logout: () =>{
        dispatch(()=> logout(dispatch) )
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(UserSection);
