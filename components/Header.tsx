import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import Typography from '@material-ui/core/Typography';

const Header = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">
                    <div style={{ cursor: 'pointer' }}>
                        <Image src="/header/logo.png" width={128} height={128} />
                    </div>
                </Link>
            </div>
            <div className={styles.main}>
                <Typography variant="h3" style={{ color:"white", textShadow: "2px 2px 2px gray" }}>축신</Typography>
                <Image src="/header/icon_3.png" width={100} height={100} />
                <Typography variant="h3" style={{ color:"white", textShadow: "2px 2px 2px gray" }}>병신</Typography>
                <Image src="/header/icon_25.png" width={100} height={100} />
            </div>
        </nav>
    )
}

export default Header
