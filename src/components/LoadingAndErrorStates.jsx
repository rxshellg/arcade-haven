import React from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';

const LoadingAndErrorStates = ({ loading, error, onRetry }) => {
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
        <p>Error fetching data: {error}</p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    );
  }

    return null;
};

export default LoadingAndErrorStates;