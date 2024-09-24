import React from 'react';
import { Accordion } from 'react-bootstrap';

const AdditionalGameInfo = ({ game }) => {
    const { release_date, status, minimum_system_requirements } = game;
    
    return (
        <Accordion>
                <Accordion.Header>Release Date</Accordion.Header>
                <Accordion.Body>
                    <p>{release_date}</p>
                </Accordion.Body>
                <Accordion.Header>Status</Accordion.Header>
                <Accordion.Body>
                    <p>{status}</p>
                </Accordion.Body>
                <Accordion.Header>Minimum System Requirements</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        <li>OS: {minimum_system_requirements.os}</li>
                        <li>Processor: {minimum_system_requirements.processor}</li>
                        <li>Memory: {minimum_system_requirements.memory}</li>
                        <li>Graphics: {minimum_system_requirements.graphics}</li>
                        <li>Storage: {minimum_system_requirements.storage}</li>
                    </ul>
                </Accordion.Body>
        </Accordion>
    );
};

export default AdditionalGameInfo;