import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import styles from '@/styles/Dashboard.module.scss'

export default function dashboard({events}) {
  console.log(events)
  const deleteEvent = (id)=>{
    console.log(id)
  }
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3 >My Events</h3>
        {events.map(evt=>(
          <DashboardEvent key={evt.id} evt={evt} deleteEvent={deleteEvent}/>
        ))}
        </div>
    </Layout>
  )
}

export async function getServerSideProps({req}){
  const {token} = parseCookies(req)

  const res = await fetch(`${API_URL}/api/events`,{
    method: 'GET',
    headers: {
      Authorization:`Bearer ${token}`
    }
  })

  const {data} = await res.json()

  return{
    props:{events:data},
  }
}
