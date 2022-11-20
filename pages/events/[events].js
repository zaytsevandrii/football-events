import { useRouter } from "next/router"
import Layout from "../../components/Layout"

export default function EventPage() {
    const { query } = useRouter()
    return <Layout>Events {query.events}</Layout>
}
