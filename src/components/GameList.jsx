import React, { useEffect, useState } from 'react';
import { fetchGames } from '../services/apiService';
import PaginationItems from './PaginationItems'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingAndErrorStates from './LoadingAndErrorStates'
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
      setError(null)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getGames();
  }, []);
  
  const totalItems = games.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = games.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => { setCurrentPage(page)};
  
  return (
    <>
      <LoadingAndErrorStates loading={loading} error={error} onRetry={getGames} />
      {!loading && !error && (
        <Container>
          <Row className="justify-content-center">
            {currentGames.map(game => (
              <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Link to={`/game/${game.id}`}>
                  <Card className="game-card">
                    <Card.Img variant="top" src={game.thumbnail} alt={game.title} loading="lazy" />
                    <div className="game-card-overlay">
                      <h5>{game.title}</h5>
                      <p>{game.short_description}</p>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <PaginationItems
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange} />
        </Container>)}
      </>
    );
  }

export default GameList;