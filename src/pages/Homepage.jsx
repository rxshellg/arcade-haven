import NavBar from '../components/NavBar';
import GameList from '../components/GameList';

function Homepage() {
    return (
        <div className="pageContainer">
            <NavBar />
            <GameList />
        </div>
    )
}

export default Homepage;