import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.scss'
import {FaExclamationTriangle} from 'react-icons'
import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <Layout title='Page Not Found'>
        <div className={styles.error}>
            {/* <h1>404</h1> */}
            <Image src="/4042.jpg" alt="Vercel Logo" width={300} height={200} style={{marginTop:'-50px'}} />

            <h4>Sorry, there is nothing here</h4>
            <Link href='/'>Go Back Home</Link>
        </div>
    </Layout>
    
  )
}
