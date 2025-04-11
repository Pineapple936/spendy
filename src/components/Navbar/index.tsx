"use client"
import Link from "next/link";
import { useState } from "react";
import style from "./index.module.css";

export default function Navbar() {
    const [showIcon, setShowIcon] = useState<boolean>(false);

    return (
        <nav className={`${style.block} center`}>
            <div className={`${style.buttonAdd} center`}>
                {showIcon && <div className={style.icons}>
                    <Link href="/income" className="click"><img src="/navbar/actions/income.svg" alt="income" /></Link>
                    <Link href="/expense" className="click"><img src="/navbar/actions/expense.svg" alt="expense" /></Link>
                        </div>}
                <input type="checkbox" id="showActions" onChange={() => {setShowIcon(value => !value)}} hidden/>
                <label className="click" htmlFor="showActions"><img src="/navbar/chooseAction.svg" alt="choose action" /></label>
            </div>
        </nav>
    );
}
