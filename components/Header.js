import Link from "next/link"
import styles from "../styles/Header.module.scss"
import Search from "./Search"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Football Events</Link>
                </div>
                <Search/>
                <nav>
                    <ul>
                        <li>
                            <Link href="/events">Events</Link>
                        </li>
                        <li>
                            <Link href="/events/add">Add Event</Link>
                        </li>
                    </ul>
                </nav>
           
        </header>
    )
}
