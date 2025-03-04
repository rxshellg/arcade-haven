import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const PaginationItems = ({ totalPages, currentPage, onPageChange }) => {
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        const addItem = (page) => {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}
                    onKeyPress={(e) => e.key === 'Enter' && onPageChange(page)}
                    tabIndex="0"
                >
                    {page}
                </Pagination.Item>
            );
        };

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                addItem(i);
            }
        } else {
            addItem(1);
            if (currentPage > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                addItem(i);
            }

            if (currentPage < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            addItem(totalPages);
        }

        return items;
    };

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

PaginationItems.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginationItems;