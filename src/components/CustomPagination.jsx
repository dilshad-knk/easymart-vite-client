import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination({ totalPages, onPageChange,currentPage }) {
  const [startIndex, setStartIndex] = useState(1); 


  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleNextPrevious = (direction) => {
    const increment = direction === 'next' ? 5 : -5; 
    const newStartIndex = Math.max(1, startIndex + increment);
    setStartIndex(newStartIndex);
  };

 
  const renderPaginationLinks = () => {
    const links = [];
    const totalPagesToShow = Math.min(totalPages - startIndex + 1, 5); //ensures it wont show more pages than totoal pages

    for (let i = startIndex; i < startIndex + totalPagesToShow; i++) { 
      links.push(
        <Pagination.Item
          key={i}
          active={i === currentPage} 
          onClick={() => handlePageChange(i)} 
        >
          {i}
        </Pagination.Item>
      );
    }

    return links;
  };

  return (
    <Pagination className='justify-content-center'>
      {/* Previous Button */}
      <Pagination.Prev onClick={() => handleNextPrevious('previous')} disabled={startIndex === 1} />

      {/* Render Pagination Links */}
      {renderPaginationLinks()}

      {/* Next Button */}
      <Pagination.Next onClick={() => handleNextPrevious('next')} disabled={startIndex + 5 > totalPages} />
    </Pagination>
  );
}

export default CustomPagination;
