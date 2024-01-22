/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useEffect, useState } from "react";
// import API
import { getBikes } from "../Api/home";

interface BikeTheft {
  large_img: string;
  title: string;
  description: string;
  year: string;
  date_stolen: number;
  location_found: string;
}

const useHome = () => {
  // State
  const [bikeThefts, setBikeThefts] = useState<BikeTheft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [data, setData] = useState<BikeTheft[]>([]);
  const itemsPerPage = 10;

  // fetch data
  const fetchData = async () => {
    try {
      const response = await getBikes();
      setData(response.bikes);
      handlePagination(response.bikes);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // handle number page paginate
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePagination = (data: BikeTheft[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data?.slice(startIndex, endIndex);
    setBikeThefts(slicedData);
    setTotalPages(Math.ceil(data?.length / itemsPerPage));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    // Filter by partial case title
    const filteredByTitle = data?.filter((theft) =>
      theft.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    handlePagination(filteredByTitle);
  }, [searchTerm]);

  useEffect(() => {
    console.log("Date", date);
    const filteredDate = data?.filter(
      (item) => moment.unix(item?.date_stolen).format("YYYY-MM-DD") === date
    );
    handlePagination(filteredDate);
  }, [date]);

  console.log("Bikes", bikeThefts);

  return [
    bikeThefts,
    loading,
    error,
    setDate,
    handlePageChange,
    currentPage,
    totalPages,
    setSearchTerm,
    searchTerm,
  ] as const;
};

export default useHome;
