import { FaUser } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Layout from "@/components/Layout"
import styles from "@/styles/AuthForm.module.scss"
import { useContext, useState } from "react"
import Link from "next/link"
import AuthContext from "@/context/AuthContext"

export default function RegisterPage() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const {register,error} = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(password!==passwordConfirm){
            toast.error('Password do not match')
            return
        }
        register({userName,email, password})
    }
    return (
        <Layout title="User Registration">
            <div className={styles.auth}>
                <h1>
                    <FaUser /> Register
                </h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <input type="submit" value='Login' className="btn"/>
                </form>
                <p>Already have an account? <Link href='/account/login'>Login</Link></p>
            </div>
        </Layout>
    )
}
