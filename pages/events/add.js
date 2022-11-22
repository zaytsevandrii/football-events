import Layout from "../../components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.scss"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function add() {
    const [values, setValues] = useState({
        name: "",
        participans: "",
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

        const res = await fetch(`${API_URL}/events`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        if(!res.ok){
          toast.error('Something went wrong')
        }else{
          const {event} = await res.json()
          router.push(`events/${event.slug}`)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
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
            <label htmlFor='participans'>Participans</label>
            <input
              type='text'
              name='participans'
              id='participans'
              value={values.participans}
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
