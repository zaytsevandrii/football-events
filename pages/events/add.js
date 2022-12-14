import Layout from "../../components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.scss"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from "@/helpers/index"

export default function Add({token}) {
  const [id,setId] = useState('')
    const [values, setValues] = useState({
        name: "",
        participants: "",
        venue: "",
        address: "",
        date: "",
        time: "",
        description: "",
    })
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const emptyFields = Object.values(values).some(value=>value==='')

        if(emptyFields){
          toast.error('Fill the fields')
        }

        const res = await fetch(`${API_URL}/api/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({
            data:{
                id:id,
                name:values.name,
                venue:values.venue,
                address:values.address,
                date:values.date,
                time:values.time,
                participants:values.participants,
                description:values.description,
            }
          }),
        })

       
          const {event} = await res.json()
          if (!res.ok) {
            toast.error('Something Went Wrong')
          } else {
            router.push(`${id}`)
          }
         
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        setId(Math.floor(Math.random() * 50000))
    }
    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Add Event</h1>
            <ToastContainer/>
            <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label htmlFor='participants'>participants</label>
            <input
              type='text'
              name='participants'
              id='participants'
              value={values.participants}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    )
}


export async function getServerSideProps({req}){
  const {token} = parseCookies(req)


  return {
    props:{
      token
    }
  }
}