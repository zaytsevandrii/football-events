
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem'
import Link from 'next/link'
const PER_PAGE=4

export default function EventsPage({events,page,total}) {
  const lastPage = Math.ceil(total.data.length / PER_PAGE)
  console.log(total.data.length)
  return (
    <Layout>
     
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to Show</h3>}

      {events.map(event=>(
        <EventItem event={event.attributes} id={event.id}  key={event.id}>{event.id}</EventItem>
      ))}

      {page>1&&(
        <Link className='btn-secondary' href={`/events?page=${page-1}`}>Prev</Link>
      )}
      {page<lastPage&&(
        <Link className='btn-secondary' href={`/events?page=${page+1}`}>Next</Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps({query:{page=1}}){
  const start = +page===1?0:(+page-1)*PER_PAGE
//Fetch totalCount
const resAll = await fetch (`${API_URL}/api/events?populate=*`)
  const dataAll = await resAll.json()


  const res = await fetch (`${API_URL}/api/events?populate=*&sort=date&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`)
  const {data} = await res.json()


  return {
    props:{events:data,page:+page,total:dataAll},
  
  }
}

/* export async function getStaticProps(){
  const res = await fetch (`${API_URL}/api/events?populate=*&sort=date`)
  const {data} = await res.json()


  return {
    props:{events:data},
    revalidate:1
  }
} */
