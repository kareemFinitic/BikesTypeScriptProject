/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// import style 
import styled from "styled-components";
// import package 
import moment from "moment";
// import pagination 
import Pagination from "./Pagination.tsx";
// import custom hook 
import useHome from "../../hooks/useHome.ts";

interface BikeTheft {
  large_img: string;
  title: string;
  description: string;
  year: string;
  date_stolen: number;
  location_found: string | null;
}

const BikeHome: React.FC = () => {

  //  custom hook 
  const [
    bikeThefts,
    loading,
    error,
    setDate,
    handlePageChange,
    currentPage,
    totalPages,
    setSearchTerm,
    searchTerm,
  ] = useHome();

  const rowList = bikeThefts?.map((theft: BikeTheft, index: number) => (
    <BikeItem key={index}>
      <div>
        {theft.large_img ? (
          <img src={theft?.large_img} alt="Bike" />
        ) : (
          <img
            alt="No Bike"
            title="No image"
            className="no-image"
            src="https://tse1.mm.bing.net/th?id=OIP.wfIoICr_DJ00Kvboxi6dTQHaEr&pid=Api&P=0&h=220"
          />
        )}
      </div>
      <div>
        <h3>{theft?.title}</h3>
        <p>{theft?.description}</p>
        <p>Theft Date: {theft?.year}</p>
        <p>
          Report Date:
          {moment.unix(theft?.date_stolen).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        <p>
          Location:
          {theft.location_found !== null
            ? theft.location_found
            : "No Location Found"}
        </p>
      </div>
    </BikeItem>
  ));

  return (
    <Container>
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="Filter by case title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterInput
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </FilterContainer>

      {loading && <LoadingState>Loading...</LoadingState>}
      {error && <ErrorState>Error: {error}</ErrorState>}
      {!loading && !error && bikeThefts?.length === 0 && (
        <EmptyState>No results found.</EmptyState>
      )}
      {!loading && !error && bikeThefts?.length > 0 && (
        <>
          <TotalCases>Total Cases: {bikeThefts?.length}</TotalCases>
          {rowList}
          <BikeList></BikeList>

          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </Container>
  );
};

export default BikeHome;

const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
`;

const LoadingState = styled.p`
  font-size: 16px;
`;

const ErrorState = styled.p`
  font-size: 16px;
`;

const EmptyState = styled.p`
  font-size: 16px;
`;

const FilterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const FilterInput = styled.input`
  width: 480px;
  padding: 10px;
  border: 1px solid orange;
`;
const TotalCases = styled.p`
  font-size: 16px;
`;

const BikeList = styled.div`
  margin-top: 20px;
`;

const BikeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #ccc;
  padding: 30px;
  margin-bottom: 10px;

  img {
    width: 30%;
    height: 30%;
  }
`;
