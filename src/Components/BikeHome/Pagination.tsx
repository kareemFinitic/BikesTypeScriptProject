
import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, handlePageChange, currentPage }) => {
  return (
    <PaginationWrapper>
      {Array.from({ length: totalPages }).map((_, index) => (
        <PageButton
          key={index + 1}
          isActive={currentPage === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </PageButton>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

interface PageButtonProps {
  isActive: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  margin: 0 5px;
  padding: 8px 12px;
  background-color: ${(props) => (props.isActive ? '#3498db' : '#ecf0f1')};
  color: ${(props) => (props.isActive ? '#ffffff' : '#2c3e50')};
  border: 1px solid #bdc3c7;
  cursor: pointer;
`;
