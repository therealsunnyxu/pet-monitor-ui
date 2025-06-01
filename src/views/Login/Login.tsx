import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { CSRFHeaders } from "../../components/Forms/CSRFHeaders";
import "../../components/Forms/Forms.css";
import Input from "../../components/Forms/Input";
import { AutoLoginEnum, setAutoLogin } from "../../features/autoLoginSlice";
import BaseView from "../BaseView/BaseView";

function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement === false) {
            return;
        }

        // If the user still has a refresh token on the server side,
        // this should let the user auto-login as long as they don't log out
        await fetch("https://pet-monitor-api.therealsunnyxu.com/token/refresh", {
            method: 'POST',
            credentials: "include",
            headers: new CSRFHeaders()
        })

        let formData = new FormData(event.target);
        let submit = await fetch("https://pet-monitor-api.therealsunnyxu.com/auth/login", {
            method: 'POST',
            body: formData,
            credentials: "include",
            headers: new CSRFHeaders()
        })
        if (submit.status >= 200 && submit.status <= 299) {
            setErrorMsg("");
            dispatch(setAutoLogin(AutoLoginEnum.AUTHENTICATED));
            return;
        }
        setErrorMsg(await submit.text());
        return;
    }
    return (
        <BaseView bottomBar={false}>
            <form id="login" onSubmit={handleSubmit} className="text-black dark:text-white w-full max-w-xl flex flex-col gap-4 h-full justify-center">
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <Input type="text" id="username" name="username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <Input type="password" id="password" name="password" />
                </fieldset>
                <fieldset id="remember-me-fieldset" className="gap-2 justify-start align-center">
                    <label htmlFor="remember_me" className="flex w-fit">Remember Me</label>
                    <input type="checkbox" id="remember_me" name="remember_me" className="flex w-fit" />
                </fieldset>
                <output name="error" className="h-4 text-red-500 font-bold">{errorMsg}</output>
                <button className="bg-white dark:bg-zinc-800 border-1 border-zinc-500 active:bg-zinc-300 dark:active:bg-black mt-8">Log In</button>
            </form>
        </BaseView>
    );
}

export default Login;