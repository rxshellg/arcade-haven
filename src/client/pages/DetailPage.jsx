import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { faGamepad, faDesktop, faUser } from '@fortawesome/free-solid-svg-icons';

import NavBar from "../components/NavBar";
import { fetchGameDetails } from "../utils/apiService";
import LoadingAndErrorStates from "../components/LoadingAndErrorStates";
import GameInfoCard from "../components/GameInfoCard";
import ScreenshotCarousel from "../components/ScreenshotCarousel";
import AdditionalGameInfo from "../components/AdditionalGameInfo";
import "./DetailPage.css"

const DetailPage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGameDetails = useCallback(async () => {
        try {
            const data = await fetchGameDetails(id);
            setGame(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [id]);
    
    useEffect(() => {
        getGameDetails();
    }, [getGameDetails]);

    return (
        <div className="pageContainer">
            <NavBar />
            <LoadingAndErrorStates loading={loading} error={error} onRetry={getGameDetails} />
            {!loading && !error && game ? (
                <div className="contentContainer">
                    <div className="smallContentContainer">
                        <img src={game.thumbnail} alt={game.title} className="img-fluid mb-2" style={{ width: '100%', }}/>
                        <AdditionalGameInfo game={game}/>
                    </div>
                    <div className="bigContentContainer">
                    <Container fluid>
                            <Row>
                            <Col md={4} className="gameInfoCards">
                                <GameInfoCard icon={faGamepad} title="Genre" content={game.genre} />
                                <GameInfoCard icon={faDesktop} title="Platform" content={game.platform} />
                                <GameInfoCard icon={faUser} title="Publisher" content={game.publisher} />
                            </Col>
                            <Col>
                                {game.screenshots && game.screenshots.length > 0 ? (
                                    <ScreenshotCarousel screenshots={game.screenshots} />
                                ) : (
                                    <p>No screenshots available for this game.</p>
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <h1>{game.title}</h1>
                                <p>{game.description}</p>
                            </Col>
                        </Row>
                    </Container>
                </div></div>
            ) : loading ? (
                <Spinner animation="border" variant="primary" />
            ) : null}
        </div>
    );
};

export default DetailPage;