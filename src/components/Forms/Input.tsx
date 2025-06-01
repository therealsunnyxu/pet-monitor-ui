import "./Forms.css";

function Input(props: any) {
    return (
        <input className={`bg-white dark:bg-zinc-800 rounded-lg border-1 h-8 px-2 border-zinc-500 ${props.className}`} {...props}>
            {props.children}
        </input>
    )
}

export default Input;