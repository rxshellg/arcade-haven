import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchGames } from '../utils/apiService';
import PaginationItems from '../components/PaginationItems';
import LoadingAndErrorStates from '../components/LoadingAndErrorStates';
import NavBar from '../components/NavBar';
import './Homepage.css';

const Homepage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 16;

  const getGames = async () => {
    try {
      const gamesData = await fetchGames();
      setGames(gamesData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredGames.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => { setCurrentPage(page) };

  return (
    <>
      <NavBar />
      <LoadingAndErrorStates loading={loading} error={error} onRetry={getGames} />
      {!loading && !error && (
        <Container>
          <Form className="mb-3 mt-5">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className='searchBar'
              />
            </Form.Group>
          </Form>
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
            onPageChange={handlePageChange}
          />
        </Container>
      )}
    </>
  );
};

export default Homepage;