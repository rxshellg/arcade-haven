import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameInfoCard = ({ icon, title, content }) => (
    <Card className="mb-3" style={{height: '122px'}}>
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

export default GameInfoCard;