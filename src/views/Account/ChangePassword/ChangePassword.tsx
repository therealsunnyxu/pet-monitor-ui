import { FormEvent } from "react";
import "../../../components/Forms/Forms.css";
import Input from "../../../components/Forms/Input";
import BaseView from "../../BaseView/BaseView";

function ChangePassword() {
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement === false) {
            return;
        }

        let formData = new FormData(event.target);
        return;
    }
    return (
        <BaseView pageName="Password" backTo="/account" backToText="Account">
            <form id="change-password" onSubmit={handleSubmit} className="text-black dark:text-white w-full max-w-xl flex flex-col gap-4">
                <fieldset>
                    <label htmlFor="old-password">Old Password</label>
                    <Input type="password" id="old-password" name="old-password" />
                </fieldset>
                <fieldset>
                    <label htmlFor="new-password">New Password</label>
                    <Input type="password" id="new-password" name="new-password" />
                </fieldset>
                <fieldset>
                    <label htmlFor="confirm-new-password">Confirm New Password</label>
                    <Input type="password" id="confirm-new-password" name="confirm-new-password" />
                </fieldset>
                <button className="bg-white dark:bg-zinc-800 border-1 border-zinc-500 active:bg-zinc-300 dark:active:bg-black mt-8">Submit</button>
            </form>
        </BaseView>
    );
}

export default ChangePassword;