import { ChevronLeft } from "@mui/icons-material";
import { NavLink } from "react-router";
import "./TopBar.css";
function BackButton(props: {
    to: string,
    text?: string
}) {
    return (
        <NavLink to={props.to} className={"back-button text-black dark:text-white"}>
            <ChevronLeft />
            <span>{props.text}</span>
        </NavLink>
    );
}

export default BackButton;