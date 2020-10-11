import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./MainPage.css";
import styled from "styled-components";
import { CatType, PaginationType } from "../../dataTypes";
import axiosConfig from "../../utils/axiosConfig";
import { device } from "../../deviceSize";
import CatDetail from "../CatDetail/CatDetail";
import Pagination from "../Pagination/Pagination";
import SearchForm from "../SearchForm/SearchForm";
import SelectedCat from "../SelectedCatDetail/SelectedCatDetail";
import Button from "../Button/Button";

const SearchFormContainer = styled.div`
  @media ${device.mobile} {
    flex-direction: column;
    align-items: center;
    & > * {
      margin: 1vh 0;
    }
  }

  @media ${device.tablet} {
    flex-direction: row;

    & > *:first-child {
      margin-right: auto;
    }

    & > *:last-child {
      margin-left: auto;
    }
  }
`;

const MainPage: React.FC = () => {
  // catList and original catList
  const [catList, setCatList] = useState<CatType[]>([]);
  const [origCatList, setOrigCatList] = useState<CatType[]>([]);
  // cat selected by user
  const [selectedCat, setSelectedCat] = useState<CatType | null>(null);
  // images of selected cat
  const [catImages, setCatImages] = useState<string[]>([]);
  // pagination for catList
  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    limit: 10,
    totalItems: 1,
  });

  // filters for page and limit item per page
  const [filters, setFilters] = useState({
    page: 0,
    limit: 10,
  });

  // Check if user is searching OR filtering something
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
    // get all the cat breeds
    async function getCatList() {
      try {
        const paramStr = queryString.stringify(filters);
        const response = await axiosConfig(`/breeds?${paramStr}`);
        const { data } = response;
        const resHeaders = response.headers;
        const limit = Number(resHeaders["pagination-limit"]);
        const page = Number(resHeaders["pagination-page"]);
        const totalItems = Number(resHeaders["pagination-count"]);
        setCatList(data); // set data for both catList and origCatList
        setOrigCatList(data);
        setPagination({ page, limit, totalItems });
      } catch (error) {
        console.log("Failed to get the cat list", error.message);
      }
    }
    getCatList();
  }, [filters]);

  // get cat breeds by searching
  const getCatByBreedName = async (breedName: string) => {
    if (breedName.length > 0) {
      setIsSearching(true);
      try {
        const response = await axiosConfig(`/breeds/search?q=${breedName}`);
        const { data } = response;
        setCatList(data);
      } catch (error) {
        console.log("Failed to search the cat breed", error.message);
      }
    } else {
      // set catList to origCatList if no breedName is searched anymore
      setIsSearching(false);
      setCatList(origCatList);
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const handleSearchCatBreed = (searchText: string) => {
    getCatByBreedName(searchText);
  };

  const handleFilterByOrigin = (filterText: string) => {
    const filteredCatList = origCatList.filter(
      (cat) =>
        cat && cat.origin?.toLowerCase().includes(filterText.toLowerCase())
    );
    setCatList(filteredCatList);
    filterText.length > 0 ? setIsFiltering(true) : setIsFiltering(false);
  };

  const handleSelectTheCat = async (breedId: string) => {
    try {
      const param = { limit: 3, breed_ids: breedId };
      const paramStr = queryString.stringify(param);
      const response = await axiosConfig(`/images/search?${paramStr}`);
      const images = response?.data.map((data: any) => data.url);
      setSelectedCat(response?.data[0]?.breeds[0]);
      setCatImages(images);
    } catch (error) {
      console.log("Failed to get the cat's images", error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedCat(null);
    setCatImages([]);
  };

  // Modal appears when a cat is selected
  const selectedCatModal = selectedCat && catImages && (
    <div className="selectedCatModal">
      <div className="selectedCatModalContent">
        <div className="selectedCatWrapper">
          <SelectedCat selectedCat={selectedCat} catImages={catImages} />
        </div>
        <div className="closeButtonWrapper">
          <Button buttonText="Close" onClick={handleCloseModal} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mainPageContainer">
      <SearchFormContainer className="searchFormContainer">
        <SearchForm
          placeholder="Search a cat breed..."
          onSubmitSearchText={handleSearchCatBreed}
        />
        <SearchForm
          placeholder="Filter by origin"
          onSubmitSearchText={handleFilterByOrigin}
        />
      </SearchFormContainer>
      <div className="catListContainer">
        <CatDetail catList={catList} selectTheCat={handleSelectTheCat} />
      </div>
      {catList.length > 0 && !isSearching && !isFiltering && (
        <div className="paginationContainer">
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
      )}
      {selectedCatModal}
    </div>
  );
};

export default MainPage;
