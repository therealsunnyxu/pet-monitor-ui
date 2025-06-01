import { Contrast, DarkMode, LightMode } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeEnum, selectDarkModeState, toggle } from "../../features/darkModeSlice";

function DarkModeButton() {
    const darkMode = useSelector(selectDarkModeState);
    const dispatch = useDispatch();
    const [currentIcon, setCurrentIcon] = useState(handleSwitchIcons(darkMode));

    function updateDocumentDarkMode(darkMode?: DarkModeEnum) {
        document.documentElement.classList.toggle(
            "dark",
            darkMode === DarkModeEnum.DARK || (darkMode === DarkModeEnum.SYSTEM && window.matchMedia("(prefers-color-scheme: dark)").matches)
        )
    }

    useEffect(() => {
        updateDocumentDarkMode(darkMode);
        setCurrentIcon(handleSwitchIcons(darkMode));
    }, [darkMode]);

    function handleSetDark() {
        dispatch(toggle());
    }

    function handleSwitchIcons(darkModeSetting?: DarkModeEnum) {
        switch (darkModeSetting) {
            case DarkModeEnum.LIGHT:
                return (<LightMode />);
            case DarkModeEnum.DARK:
                return (<DarkMode />);
            default:
                return (<Contrast />);
        }
    }

    return (
        <button className="dark-mode-button text-black dark:text-white fill-current hover:outline-black hover:outline-1 dark:hover:outline-white focus:outline-2" onClick={handleSetDark}>
            {currentIcon}
        </button>
    );
}

export default DarkModeButton;