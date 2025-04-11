"use client"
import style from "./index.module.css";

export default function Successful({ text }: {text: string}) {
    return (
        <div className={`${style.block} center`}>
            <div className={`${style.card} center`}>
                <i className='bx bxs-check-circle'></i>
                <p>Transaction has been successfully {text}</p>
            </div>
        </div>
    );
}
