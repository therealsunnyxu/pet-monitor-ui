import { ChevronRight, Email, Password } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { CSRFHeaders } from "../../components/Forms/CSRFHeaders";
import { AutoLoginEnum, setAutoLogin } from "../../features/autoLoginSlice";
import { selectUsername } from "../../features/publicDetailsSlice";
import BaseView from "../BaseView/BaseView";
import "./Account.css";
function Account() {
    const username = useSelector(selectUsername);
    const dispatch = useDispatch();
    const [currUsername, setCurrUsername] = useState(username);

    useEffect(() => {
        setCurrUsername(username);
    }, [username])
    async function handleLogOut() {
        await fetch("https://pet-monitor-api.therealsunnyxu.com/auth/logout", {
            method: 'POST',
            credentials: "include",
            headers: new CSRFHeaders()
        });
        dispatch(setAutoLogin(AutoLoginEnum.UNAUTHENTICATED));
    }

    return (
        <BaseView pageName="Account" className="text-black dark:text-white gap-4 w-full max-w-2xl left-1/2 -translate-x-1/2">
            <section className="account-section text-start">
                <h2 className="text-xl">Welcome, {currUsername}</h2>
            </section>
            <section className="account-section choices bg-white dark:bg-zinc-800">
                <NavLink to="/account/email" className="account-choice rounded-t-[1rem]">
                    <div className="account-choice-icon"><Email /><h2>Email</h2></div>
                    <div className="account-choice-nav">
                        <span className="hidden sm:inline">Change Email</span>
                        <ChevronRight />
                    </div>
                </NavLink>
                <hr />
                <NavLink to="/account/password" className="account-choice rounded-b-[1rem]">
                    <div className="account-choice-icon"><Password /><h2>Password</h2></div>
                    <div className="account-choice-nav">
                        <span className="hidden sm:inline">Change Password</span>
                        <ChevronRight />
                    </div>
                </NavLink>
            </section>
            <button className="bg-red-500 w-full my-8 active:bg-red-900 text-white" onClick={handleLogOut}>Log Out</button>
        </BaseView>
    );
}

export default Account;