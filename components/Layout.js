import Head from "next/head"
import { useRouter } from "next/router"
import styles from '../styles/Layout.module.scss'
import Footer from "./Footer"
import Header from "./Header"
import Showcase from "./Showcase"

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header/>
            {router.pathname ==='/'&&<Showcase/>}
            <div className={styles.container}>{children}</div>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title: "Football Events | Find the most important football events",
    description: "Fint the lates Football events and other football news",
    keywords: "football, player, players, games",
}
