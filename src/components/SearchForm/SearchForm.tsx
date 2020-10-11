import React, { useState } from "react";
import "./SearchForm.css";

interface InputProps {
  placeholder: string;
  onSubmitSearchText: (searchText: string) => void;
}

const FilterForm: React.FC<InputProps> = (props) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    props.onSubmitSearchText(val);
  };

  return (
    <form>
      <input
        type="text"
        placeholder={props.placeholder}
        value={searchText}
        onChange={handleSearchTextChange}
      />
    </form>
  );
};

export default FilterForm;
