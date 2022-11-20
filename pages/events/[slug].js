import Layout from "../../components/Layout"
import Image from 'next/image'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.scss'
import Link from "next/link"
import {FaPencilAlt,FaTimes} from 'react-icons/fa'

export default function EventPage({event}) {
const deleteEvent = ()=>{
    console.log('Delete')
}
    return <Layout>
        <div className={styles.event}>
            <div className={styles.controls}>
                <Link href={`/events/edit/${event.id}`}>
                    <FaPencilAlt/>Edit Event
                </Link>
                <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes/>Delete Event</a>
            </div>

            <span>
                {event.date} at {event.time}
            </span>
            <h1>{event.name}</h1>
            {event.image && (
                <div className={styles.image}>
                    <Image className={styles.image2} src={event.image} alt='football events' width={960} height={600}/>
                </div>
            )}

            <h3>Participants:<span className={styles.font}> {event.participants} </span></h3>
            <h3>Description:</h3>
            <p>{event.description}</p>
            <h3>Venue: <span className={styles.font}>{event.venue}</span></h3>
            <p style={{fontSize:'18px'}}>{event.address}</p>
<br />
                <Link href='/events'>
                    {'<'} Go Back
                </Link>
        </div>
         </Layout>
}


export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()

    const paths = events.map(event=>({
        params:{slug:event.slug}
    }))

    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({params:{slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const event = await res.json()


    return{
        props:{
            event: event[0]
        },
        revalidate:1
    }
}

/* export async function getServerSideProps({query:{slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const event = await res.json()


    return{
        props:{
            event: event[0]
        },
    }
}  */