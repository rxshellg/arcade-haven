import React from 'react';
import PropTypes from 'prop-types';
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

LoadingAndErrorStates.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default LoadingAndErrorStates;