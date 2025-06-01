import { ReactElement } from 'react';
import { NavLink, useMatch } from "react-router";
import './BottomBar.css';

function BottomIcon(props: {
    to: string,
    unselected: ReactElement,
    selected: ReactElement,
    className?: string,
    text?: string
}) {
    const modifier = props.to === "/" ? "" : "/*";
    const match = useMatch(props.to + modifier)
    const darkModeText = "text-black dark:text-white";
    return (
        <NavLink to={props.to} className={`${(isActive: boolean) => isActive ? "active" : ""} flex flex-col justify-center items-center min-w-[60px] grow-1 p-2 border-b-2 ${match ? "border-black dark:border-white" : "border-transparent"}`}>
            {match ? props.selected : props.unselected}
            <span className={`${darkModeText} ${match ? "font-bold" : ""}`}>{props.text}</span>
        </NavLink>
    );
}

export default BottomIcon;