import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from '@/styles/DashboardEvent.module.scss'
import Link from "next/link";

export default function DashboardEvent({evt,deleteEvent}){
    return(
        <div className={styles.event}>
            <h4>
                <Link href={`/events/${evt.id}`}>
                    {evt.attributes.name}
                </Link>
            </h4>
            <Link className={styles.edit} href={`/events/edit/${evt.id}`} ><FaPencilAlt/><span>Edit Event</span></Link>
            <Link href='#' className={styles.delete} onClick={()=>deleteEvent(evt.id)}><FaTimes/>Delete</Link>

        </div>
    )
}

