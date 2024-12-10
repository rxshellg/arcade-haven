import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('/api/leaderboards');
                const data = await response.json();
                setLeaderboardData(data);

                // Fetch current user data for highlighting
                const userResponse = await fetch('/auth/session');
                const userData = await userResponse.json();
                setCurrentUserId(userData.user.id);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <>
        <NavBar />
        <div className="outsideContainer">
        <div className="leaderboard-container">
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Total Reviews</th>
                        <th>Average Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map(entry => (
                        <tr key={entry.id} className={entry.user.id === currentUserId ? 'highlighted' : ''}>
                            <td>{entry.user.displayName}</td>
                            <td>{entry.totalReviews}</td>
                            <td>{entry.averageRating.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>
        </>
    );
};

export default Leaderboard;
