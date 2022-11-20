import Link from 'next/link'
import styles from '../styles/Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; Football Events 2022</p>
        <p><Link href='/about'>About this project</Link></p>
    </footer>
  )
}
