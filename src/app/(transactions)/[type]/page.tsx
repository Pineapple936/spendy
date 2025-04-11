"use client"
import { useRouter, notFound } from 'next/navigation';
import { useState, useEffect, use } from "react";
import style from "./index.module.css";
import { PurchaseHistoryItem, Category } from "@/interface";
import Successful from '@/components/Successful';
import ButtonBack from '@/components/ButtonBack';
import { parseEventDateTime, renderFormatTime, renderBackgroud } from '@/utils';

export default function Income({ params }: { params: Promise<{ type: "income" | "expense" }> }) {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [timer, setTimer] = useState<number | null>(null);
    const { type: action }: { type: string } = use(params);
    const links: string[] = ["income", "expense"];
    const date: Date = new Date();

    useEffect(() => {
        return () => {
            if(timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    if(!links.includes(action)) {
        return notFound();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.currentTarget;

        const data: PurchaseHistoryItem = {
            money: Number((form.elements.namedItem("money") as HTMLInputElement).value),
            category: (form.elements.namedItem("category") as HTMLSelectElement).value,
            description: (form.elements.namedItem("description") as HTMLInputElement).value,
            date: (form.elements.namedItem("date") as HTMLInputElement).value.split("-").reverse().join("."),
            time: (form.elements.namedItem("time") as HTMLInputElement).value
        };

        if(action === "expense" && data.money > 0) {
            data.money *= -1;
        }

        const historyString = localStorage.getItem("history");
        const array: PurchaseHistoryItem[] = historyString ? JSON.parse(historyString) : [];
        array.unshift(data);
        array.sort((a: PurchaseHistoryItem, b: PurchaseHistoryItem) => parseEventDateTime(b) - parseEventDateTime(a));
        localStorage.setItem("history", JSON.stringify(array));

        setShowSuccess(true);
        setTimer(
                window.setTimeout(() => {
                router.push("/");
            }, 1500)
        );
    };

    return (
        <div className={renderBackgroud("/" + action)}>
            <div className={`${style.container} padding-block spawn-page`}>
                <div className={style.header}>
                    <ButtonBack />
                    <p>{action[0].toUpperCase() + action.slice(1)}</p>
                </div>
                <div className={style.block}>
                    <form onSubmit={handleSubmit}>
                        <p className="opacity">How Much?</p>
                        <span>$</span>
                        <input type="number" name="money" placeholder={"Enter the amount"} required/>
                        <div className={style.descriptionTransaction}>
                            <select name="category" required>
                                    <option value="" hidden>Category</option>
                                    { Object.keys(Category).map(key =>
                                        <option value={key} key={key}>{key}</option>
                                    ) }
                                </select>
                                <input type="text" placeholder="Description" name="description" required/>
                                <input type="date" name="date" defaultValue={`${date.getFullYear()}-${renderFormatTime(date.getMonth() + 1)}-${renderFormatTime(date.getDate())}`} required/>
                                <input type="time" name="time" defaultValue={`${renderFormatTime(date.getHours())}:${renderFormatTime(date.getMinutes())}`} required/>
                                <button className="click" type="submit">Continue</button>
                        </div>
                    </form>
                </div>
                {showSuccess && <Successful text={"added"} />}
            </div>
        </div>
    );
}
