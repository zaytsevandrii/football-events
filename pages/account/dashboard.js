import DashboardEvent from "@/components/DashboardEvent"
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import styles from "@/styles/Dashboard.module.scss"
import { useRouter } from "next/router"

export default function dashboard({ events, token }) {
    const router = useRouter()
    const deleteEvent = async (id) => {
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error.message)
            } else {
                router.reload()
            }
        }
    }
    return (
        <Layout>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>
                {events.map((evt) => (
                    <DashboardEvent key={evt.id} evt={evt} deleteEvent={deleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/api/events`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const { data } = await res.json()

    return {
        props: {
            events: data,
            token,
        },
    }
}
