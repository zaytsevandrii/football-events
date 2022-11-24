import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.scss"
import { useState } from "react"

export default function ImageUpload({ evtId, imageUploaded, values }) {
    const [image, setImage] = useState(null)
    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'api::event.event')
        formData.append('refId', evtId)
        formData.append('field', 'image')
    
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        })
    
        if (res.ok) {
          imageUploaded()
        }
      }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    )
}
