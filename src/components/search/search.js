import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL, geoApiOptions } from "../../api";


const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
          `${GEO_API_URL}?minPopulation=100000&namePrefix=${inputValue}`,
          geoApiOptions
        )
          .then((response) => response.json())
          .then((response) => {
            const options = response.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }));
            return { options };
          })
          .catch((error) => {
            console.error(error);
            return { options: [] };
          });
      };
      
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return(
        <AsyncPaginate 
            placeholder = "Search for city..."
            debounceTimeout = {600}
            value = {search}
            onChange = {handleOnChange}
            loadOptions = {loadOptions}
        />
    )
}

export default Search;