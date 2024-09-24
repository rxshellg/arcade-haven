import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import PaginationItems from '../components/PaginationItems';
import './PlayNowPage.css'

const PlayNowPage = () => {
    const [iframes] = useState([
        { id: 1, src: 'https://cdn.htmlgames.com/SushiMasterMatch3/', title: 'Sushi Master - Match3' },
        { id: 2, src: 'https://cdn.htmlgames.com/ABCTiles/', title: 'ABC Tiles' },
        { id: 3, src: 'https://cdn.htmlgames.com/PyramidSolitaire-GreatPyramid/', title: 'Pyramid Solitaire - Great Pyramid' },
        { id: 4, src: 'https://cdn.htmlgames.com/EscapeRoom-HomeEscape/', title: 'Escape Room - Home Escape' },
        { id: 5, src: 'https://cdn.htmlgames.com/WaterSort/', title: 'Water Sort' },
        { id: 6, src: 'https://cdn.htmlgames.com/JapanJong/', title: 'JapanJong' },
        { id: 7, src: 'https://cdn.htmlgames.com/NinjaBreakout/', title: 'Ninja Breakout' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const currentIframe = iframes[currentPage - 1]
    const totalPages = iframes.length;
    const handlePageChange = (page) => { setCurrentPage(page)};

    return (
        <div className="pageContainer">
            <NavBar />
            <div className='outsideContainer'>
            <div className='gameContainer'>
                {currentIframe && (
                    <iframe 
                        key={currentIframe.id} 
                        src={currentIframe.src} 
                        title={currentIframe.title} 
                        style={{ width: '100%', height: '700px', border: 'none' }} 
                    />
                )}
                <PaginationItems
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} 
                />
            </div></div>
        </div>
    );
};

export default PlayNowPage;