// components/Navbar.tsx
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>GoalPredict</div>
      <div>Profile | Leaderboard</div>
    </nav>
  )
}
