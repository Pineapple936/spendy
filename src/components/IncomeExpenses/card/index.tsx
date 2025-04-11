import style from "./index.module.css";

export default function Card({name, value}: { name: "Income" | "Expense", value: number }) {
    return (
        <div className={`${style.block} ${name === "Income"? "background-color-income": "background-color-expense"} center`}>
            <img src={`/${name.toLowerCase()}.svg`} alt={name} />
            <div className={style.text}>
                <p>{name}</p>
                <p>${value}</p>
            </div>
        </div>
    );
};
