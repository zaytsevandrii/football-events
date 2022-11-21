import Image from 'next/image'
import styles from '@/styles/EventItem.module.scss'
import Link from 'next/link'

export default function EventItem({event,id}) {
    const img = event?.image?.data[0]?.attributes
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image alt='football events' priority src={img?.formats?.thumbnail?.url?img.url:'/images/event-default.png'} width={187} height={110}/>
        </div>

        <div className={styles.info}>
            <span>
                {event.date} at {event.time}
            </span>
            <h3>{event.name}</h3>
        </div>

        <div className={styles.link}>
            <Link className='btn' href={`/events/${id}`}>Details</Link>
        </div>
    </div>
  )
}
