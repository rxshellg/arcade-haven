import React, { useEffect, useState } from 'react';

const EmbededGame = ({ gameUrl }) => {
    const [iframeError, setIframeError] = useState(false);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const handleIframeError = () => {
        setIframeError(true);
    };

    useEffect(() => {
        const checkIframeUrl = async (url) => {
            try {
                const response = await fetch(proxyUrl + url, { method: 'HEAD' });
                const xFrameOptions = response.headers.get('X-Frame-Options');
                if (xFrameOptions && (xFrameOptions === 'DENY' || xFrameOptions === 'SAMEORIGIN')) {
                    setIframeError(true);
                }
            } catch (error) {
                console.error('Error checking iframe URL:', error);
                setIframeError(true);
            }
        };

        if (gameUrl) {
            checkIframeUrl(gameUrl);
        }
    }, [gameUrl]);

    if (iframeError) {
        return null;
    }

    return (
        <iframe
            src={gameUrl}
            width="800"
            height="600"
            title="Game"
            style={{ border: "none" }}
            onError={handleIframeError}
        ></iframe>
    );
};

export default EmbededGame;