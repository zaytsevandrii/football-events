
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
     
      <h1>Home page</h1>
      <Link href='/about'>Anout</Link>
    </Layout>
  )
}
