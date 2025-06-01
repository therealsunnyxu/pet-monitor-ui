import { NavLink } from "react-router";
import BackButton from "./BackButton";
import DarkModeButton from "./DarkModeButton";
import "./TopBar.css";
function TopBar(props: {
    header?: string,
    backTo?: string,
    backToText?: string
}) {
    return (
        <nav className="top-bar bg-white dark:bg-zinc-800">
            <div className="flex flex-row justify-center items-center w-full max-w-2xl relative">
                {props.backTo !== undefined && props.backTo.length > 0 ? <BackButton to={props.backTo} text={props.backToText} /> : <></>}
                <NavLink to="/" className="flex h-[44px] justify-center items-center max-w-fit p-2">
                    <span className="text-black dark:text-white text-xl">
                        {props.header !== undefined ? props.header : "Pet Cam"}
                    </span>
                </NavLink>
                <DarkModeButton />
            </div>
        </nav>
    );
}

export default TopBar;