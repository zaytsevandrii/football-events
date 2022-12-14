
import Layout from '../components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem'
import Link from 'next/link'

export default function Home({events}) {
  return (
    <Layout>
     
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to Show</h3>}

      {events.map(event=>(
        <EventItem event={event.attributes} id={event.id}  key={event.id}>{event.id}</EventItem>
      ))}

      {events.length>0 && (
        <Link href='/events'>View All Events</Link>
      )}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch (`${API_URL}/api/events?populate=*&sort=date`)
  const {data} = await res.json()


  return {
    props:{events:data.slice(0,3)},
    revalidate:1
  }
}
