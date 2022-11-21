import Layout from "../../components/Layout"
import Image from 'next/image'
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.scss'
import Link from "next/link"
import {FaPencilAlt,FaTimes} from 'react-icons/fa'

export default function EventPage({event}) {
    const img = event?.attributes?.image?.data[0]?.attributes
const deleteEvent = ()=>{
    console.log('Delete')
}
    return <Layout>
        <div className={styles.event}>
            <div className={styles.controls}>
               {/*  <Link href={`/events/edit/${event.id}`}>
                    <FaPencilAlt/>Edit Event
                </Link> */}
                <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes/>Delete Event</a>
            </div>

            <span>
                {event?.attributes?.date} at {event?.attributes?.time}
            </span>
            <h1>{event?.attributes?.name}</h1>
            {img && (
                <div className={styles.image}>
                    <Image className={styles.image2} priority src={img.formats.medium.url} alt='football events' width={960} height={600}/>
                </div>
            )}

            <h3>Participants:<span className={styles.font}> {event?.attributes?.participants} </span></h3>
            <h3>Description:</h3>
            <p>{event?.attributes?.description}</p>
            <h3>Venue: <span className={styles.font}>{event?.attributes?.venue}</span></h3>
            <p style={{fontSize:'18px'}}>{event?.attributes?.address}</p>
<br />
                <Link href='/events'>
                    {'<'} Go Back
                </Link>
        </div>
         </Layout>
}


export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`)
    const {data} = await res.json()

    const paths = data.map(event=>({
        params:{slug:event.attributes.slug}
    }))

    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps({params:{slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}?populate=*`)
    const {data} = await res.json()
console.log(data)

    return{
        props:{
            event: data
        },
        revalidate:1
    }
}

/* export async function getServerSideProps({params:{slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const {data} = await res.json()
    console.log(data)


    return{
        props:{
            event: data
        },
    }
}  */