import Link from "next/link"
import styles from "../styles/Header.module.scss"
import Search from "./Search"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"
import AuthContext from "@/context/AuthContext"
import { useContext } from "react"

export default function Header() {
    const { user, logout } = useContext(AuthContext)
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Football Events</Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href="/events">Events</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link href="/events/add">Add Event</Link>
                            </li>
                            <li>
                                <Link href="/account/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={()=>logout()} className="btn-secondary btn-icon">
                                    <FaSignOutAlt/>Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="btn-secondary btn-icon" href="/account/login">
                                    <FaSignInAlt />
                                    login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
