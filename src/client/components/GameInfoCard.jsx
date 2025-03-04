import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameInfoCard = ({ icon, title, content }) => (
    <Card className="mb-3" style={{height: '122px', backgroundColor: "#0c062e", color: "#B6A9AF", border: "1px solid lightgray"}}>
        <Card.Body>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={icon} className="me-2" />
                <div>
                    <h6>{title}</h6>
                    <p>{content}</p>
                </div>
            </div>
        </Card.Body>
    </Card>
);

GameInfoCard.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default GameInfoCard;