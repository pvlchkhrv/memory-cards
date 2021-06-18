import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../c1-main/m2-bll/store";
import {logOutTC} from "../a1-login/login-reducer";
import {RequestStatusType} from "../../../c1-main/m2-bll/app-reducer";
import {authMe, changeProfile} from './profile-reducer';

export const ProfileContainer: React.FC<{}> = () => {
    debugger
    const dispatch = useDispatch();
    const {name, avatar, email} = useSelector<AppRootStateType, any>(state => state.profile.profileData)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // const [nameValue, setNameValue] = useState(name);
    const [avatarValue, setAvatarValue] = useState(avatar);

    useEffect(() => {
        dispatch(authMe());
    }, [name])

    // if (!isAuth) {
    //     return <Redirect to={PATH.LOGIN}/>
    // }

    const changeAvatarHandler = (avatarLink: string) => {
        setAvatarValue(avatarLink)
    }

    // const onChangeProfileName = (newName: string) => {
    //     setNameValue(newName)
    // }

    const onChangeNameHandler = (newName: string) => {
        dispatch(changeProfile(newName));
    }

    const onLogoutClickHandler = () => {
        dispatch(logOutTC());
    }


    return (
        <Profile
            nameValue={name}
            avatarValue={avatar}
            email={email}
            onAvatarChange={changeAvatarHandler}
            onNameChange={onChangeNameHandler}
            onLogoutClick={onLogoutClickHandler}
        />
    )
}
