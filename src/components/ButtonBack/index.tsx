import { useRouter } from 'next/navigation';
import style from "./index.module.css";

export default function ButtonBack() {
    const router = useRouter();

    return (
        <button className={`${style.back} click`} onClick={() => {router.back()}} aria-label="go back">
            <i className='bx bx-arrow-back' />
        </button>
    );
}
