import Image from 'next/image'
import styles from '@/styles/EventItem.module.scss'
import Link from 'next/link'

export default function EventItem({event}) {
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image alt='football events' src={event.image?event.image:'/images/event-default2.png'} width={187} height={110}/>
        </div>

        <div className={styles.info}>
            <span>
                {event.date} at {event.time}
            </span>
            <h3>{event.name}</h3>
        </div>

        <div className={styles.link}>
            <Link className='btn' href={`/events/${event.slug}`}>Details</Link>
        </div>
    </div>
  )
}
