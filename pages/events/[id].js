import Layout from "../../components/Layout"
import Image from "next/image"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.scss"
import Link from "next/link"
import { FaPencilAlt, FaTimes } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"
import { useContext } from "react"
import AuthContext from "@/context/AuthContext"

export default function EventPage({ event }) {
    const router = useRouter()
    const img = event.attributes.image.data ? event.attributes.image.data[0].attributes : "/images/event-default.png"
    /* const img = event?.attributes?.image?.data[0]?.attributes */
    const deleteEvent = async (e) => {
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/api/events/${event.id}`, {
                method: "DELETE",
            })

            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error.message)
            } else {
                router.push("/events")
            }
        }
    }
    const { user } = useContext(AuthContext)
    return (
        <Layout>
            <div className={styles.event}>
                {user && (
                    <div className={styles.controls}>
                        <Link href={`/events/edit/${event?.id}`}>
                            <FaPencilAlt />
                            Edit Event
                        </Link>

                        {
                            <a href="#" className={styles.delete} onClick={deleteEvent}>
                                <FaTimes />
                                Delete Event
                            </a>
                        }
                    </div>
                )}
                <ToastContainer />
                <span>
                    {event?.attributes?.date} at {event?.attributes?.time}
                </span>
                <h1>{event?.attributes?.name}</h1>
                {img && (
                    <div className={styles.image}>
                        <Image
                            className={styles.image2}
                            priority
                            src={img.url ? img.formats.medium.url : img}
                            alt="football events"
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <h3>
                    Participants:<span className={styles.font}> {event?.attributes?.participants} </span>
                </h3>
                <h3>Description:</h3>
                <p>{event?.attributes?.description}</p>
                <h3>
                    Venue: <span className={styles.font}>{event?.attributes?.venue}</span>
                </h3>
                <p style={{ fontSize: "18px" }}>{event?.attributes?.address}</p>
                <br />
                <Link href="/events">{"<"} Go Back</Link>
            </div>
        </Layout>
    )
}

/* export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`)
    const {data} = await res.json()

    const paths = data.map(event=>({
        params:{id:event.id}
    }))

    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({params:{id}}){
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    const {data} = await res.json()

    return{
        props:{
            event: data
        },
        revalidate:1
    }
} */

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    const { data } = await res.json()

    return {
        props: {
            event: data,
        },
    }
}
