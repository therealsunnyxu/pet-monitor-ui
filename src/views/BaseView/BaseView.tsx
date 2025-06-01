import { ReactNode } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import TopBar from "../../components/TopBar/TopBar";
import "./BaseView.css";
function BaseView(props: {
    pageName?: string,
    children?: ReactNode,
    className?: string,
    id?: string,
    backTo?: string,
    backToText?: string,
    bottomBar?: boolean
}) {
    return (
        <div className="w-full h-full m-0 p-0">
            <TopBar header={props.pageName} backTo={props.backTo} backToText={props.backToText} />
            <main className={`base-view absolute top-[91px] left-0 flex flex-col w-full justify-start items-center p-8 ${props.className ?? ''}`}>
                {props.children}
            </main>
            {props.bottomBar === false ? <></> : <BottomBar />}
        </div>
    );
}

export default BaseView;