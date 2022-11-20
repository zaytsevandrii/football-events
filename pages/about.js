import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'

export default function about() {
  return (
    <Layout title='About events'>
        <h1>About</h1>
        <p>This is an app to find the latest Football events</p>
        <p>Version: 1.0.0</p>
        <Link href='/'>Home</Link>
    </Layout>
  )
}
