import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import { parseCookies } from "@/helpers/index"
import {FaImage} from 'react-icons/fa'
import styles from "@/styles/Form.module.scss"
import { useRouter } from "next/router"
import Link from "next/link"
import Modal from "@/components/Modal"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import ImageUpload from "@/components/ImageUpload"

export default function EditEventPage({event,token}) {
    const id=event.id
    const [imagePrev,setImagePrev] = useState(
        event.attributes.image.data?event.attributes.image.data[0].attributes.formats.thumbnail.url:null
    )
    const [showModal,setShowModal] = useState(false)
    const [values, setValues] = useState({
        name: event.attributes.name,
        participants: event.attributes.participants,
        venue: event.attributes.venue,
        address: event.attributes.address,
        date: event.attributes.date,
        time: event.attributes.time,
        description: event.attributes.description,
    })
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const emptyFields = Object.values(values).some(value=>value==='')

        if(emptyFields){
          toast.error('Fill the fields')
        }

        const res = await fetch(`${API_URL}/api/events/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`,
          },
          body: JSON.stringify({
            data:{
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
            router.push(`/events/${id}`)
          }
         
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async(e)=>{
        const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
        const {data} = await res.json()
        setImagePrev(data.attributes.image.data[0].attributes.formats.thumbnail.url)
        setShowModal(false)
    }
    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Edit Event</h1>
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

        <input type='submit' value='Edit Event' className='btn' />
            </form>

        <h2>Event image</h2>
        {imagePrev? <Image alt={event.attributes.name} src={imagePrev} height={100} width={170}/>:<div>
            <p>No image uploaded</p>
        </div>}
        <div>
            <button onClick={()=>setShowModal(true)} className="btn-secondary"><FaImage/> Set Image</button>
        </div>

       { <Modal show={showModal} onClose={()=>setShowModal(false)}>
            <ImageUpload evtId={id} imageUploaded={imageUploaded}/>
        </Modal>}
        </Layout>
    )
}

export async function getServerSideProps({params:{id},req}){
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`)
    const {data} = await res.json()
    const {token} = parseCookies(req)
    return{
        props:{
            event: data,
            token
        },
    }
}