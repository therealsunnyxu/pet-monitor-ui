import { Home, HomeOutlined, Person, PersonOutline } from "@mui/icons-material";
import './BottomBar.css';
import BottomIcon from "./BottomIcon";

function BottomBar() {

    const darkModeIcon = "text-black dark:text-white fill-current";
    return (
        <nav className="bottom-bar  flex">
            <ul className="w-full mx-8 max-w-2xl flex justify-center bg-white dark:bg-zinc-800 rounded-2xl overflow-clip px-4 py-2 text-sm">
                <li className="w-full">
                    <BottomIcon text="Home" to="/" unselected={<HomeOutlined className={darkModeIcon} />} selected={<Home className={darkModeIcon} />} />
                </li>
                <li className="w-full">
                    <BottomIcon text="Account" to="/account" unselected={<PersonOutline className={darkModeIcon} />} selected={<Person className={darkModeIcon} />} />
                </li>
            </ul>
        </nav>
    );
}

export default BottomBar;