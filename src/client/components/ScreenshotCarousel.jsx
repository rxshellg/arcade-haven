import React from "react";
import PropTypes from "prop-types";
import { Carousel } from "react-bootstrap";

const ScreenshotCarousel = ({ screenshots }) => (
    <Carousel>
        {screenshots.map((screenshot) => (
            <Carousel.Item key={screenshot.id}>
                <img
                    src={screenshot.image}
                    alt={`Screenshot of game`}
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
            </Carousel.Item>
        ))}
    </Carousel>
);

ScreenshotCarousel.propTypes = {
    screenshots: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ).isRequired,
};

export default ScreenshotCarousel;