import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';
import styles from './Dashboard.module.css';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';
import { 
    BrowserRouter,
    Routes,
    Route,
    } from 'react-router-dom';

interface DashboardProps {
userUsername: string
setIsLoggedIn: (value: boolean) => void
}

export default function Dashboard({
userUsername,
setIsLoggedIn
}: DashboardProps) {
return (
    <BrowserRouter>
    <div className={styles.container}>
        <Header
        setIsLoggedIn={setIsLoggedIn}
        userUsername={userUsername}
        />
        <main className={styles.main_section}>
        <Sidebar />
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/watchlater' element={<WatchLater />} />
            <Route path='*' />
        </Routes>
        </main>
    </div>
    </BrowserRouter>
)
}