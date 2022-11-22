
import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import EventItemS from '@/components/EventItemSearch'

export default function SearchPage({events}) {
    const router = useRouter()
  return (
    <Layout title='Search Results'>
     <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to Show</h3>}

      {events.map(event=>(
        <EventItemS event={event.attributes} id={event.id}  key={event.id}>{event.id}</EventItemS>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query:{term}}){

    const query = qs.stringify({
        filters: {
            name: {
              $contains: term,
            },
          },
        }, {
          encodeValuesOnly: true, // prettify URL
        });
       /*  _where:{
            _or:[
                {name_contains:term},
                {description_contains:term},
                {venue_contains:term},
            ]
        } */
   
  const res = await fetch (`${API_URL}/api/events?${query}`)
  const {data} = await res.json()


  return {
    props:{events:data},
  }
}
