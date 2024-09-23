import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/apiService';
import PaginationItems from './PaginationItems'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './GameList.css'

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  
  const getGames = async () => {
    try {
      const gamesData = await fetchGames();
      setGames(gamesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getGames();
  }, []);
  
  if (loading) {
    return (
      <Container fluid className="text-center" data-bs-theme="dark">
        <Spinner animation="border" variant="light" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error fetching games: {error.message}</p>
        <button onClick={() => getGames()}>Retry</button>
      </div>
    );
  }
  
  const totalItems = games.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = games.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => { setCurrentPage(page)};
  
    return (
      <Container>
        <Row className="justify-content-center">
          {currentGames.map(game => (
            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card className="game-card">
                  <Card.Img variant="top" src={game.thumbnail} alt={game.title} loading="lazy" />
                  <div className="game-card-overlay">
                      <h5>{game.title}</h5>
                      <p>{game.short_description}</p>
                  </div>
              </Card>
            </Col>
          ))}
        </Row>
        <PaginationItems 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange} />
      </Container>
    );
  }

export default GameList;