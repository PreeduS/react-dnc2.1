import React from 'react';
import {connect} from 'react-redux';

import UserSection from '../components/UserSection';
//import {getUser} from '~/commons/selectors';
//import {userStatus} from '~/commons/constants';

//import LoaderHoc from '~/commons/components/LoaderHoc';
//const UserSectionHoc = LoaderHoc(UserSection);

class UserHeader extends React.Component {
    
    render(){
        //const {user} = this.props;
        //const isInitialPending = user.initialLoginStatus === userStatus.pending;
        //if(isInitialPending){
            //return <div>loading initial</div>
        //}
        //<UserSection />

        //const {loginStatus, logoutStatus} = this.props.user;
        //const isPending = loginStatus === userStatus.pending || logoutStatus === userStatus.pending;
        //loading = {isPending || isInitialPending}
        //<UserSectionHoc loading = {false} />
        return(
            <UserSection />
        );
    }
}
/*
const mapStateToProps = state=> ({
    user:getUser(state)
});
*/
export default UserHeader;
//export default connect(mapStateToProps, null)(UserHeader);