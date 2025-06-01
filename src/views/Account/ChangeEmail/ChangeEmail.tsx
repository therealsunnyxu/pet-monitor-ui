
import { FormEvent } from "react";
import "../../../components/Forms/Forms.css";
import Input from "../../../components/Forms/Input";
import BaseView from "../../BaseView/BaseView";

function ChangeEmail() {
    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement === false) {
            return;
        }

        let formData = new FormData(event.target);
        return;
    }
    return (
        <BaseView pageName="Email" backTo="/account" backToText="Account">
            <form id="change-email" onSubmit={handleSubmit} className="text-black dark:text-white w-full max-w-xl flex flex-col gap-4">
                <fieldset>
                    <label htmlFor="old-email">Old Email</label>
                    <Input type="text" id="old-email" name="old-email" />
                </fieldset>
                <fieldset>
                    <label htmlFor="new-email">New Email</label>
                    <Input type="text" id="new-email" name="new-email" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <Input type="password" id="password" name="password" />
                </fieldset>
                <button className="bg-white dark:bg-zinc-800 border-1 border-zinc-500 active:bg-zinc-300 dark:active:bg-black mt-8">Submit</button>
            </form>
        </BaseView>
    );
}

export default ChangeEmail;