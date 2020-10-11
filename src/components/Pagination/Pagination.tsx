import React from "react";
import "./Pagination.css";
import { PaginationType } from "../../utils/dataTypes";
import Button from "../Button/Button";

interface InputProps {
  pagination: PaginationType;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<InputProps> = (props) => {
  const totalPages = Math.ceil(
    props.pagination.totalItems / props.pagination.limit
  );

  console.log("totalPages", totalPages);
  console.log("props.pagination?.page", props.pagination?.page);

  const handlePageChange = (newPage: number) => {
    console.log("newPage", newPage);
    if (props.onPageChange) {
      props.onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <div className="buttonWrapper">
        <Button
          buttonText="Prev"
          isDisabled={props.pagination?.page === 0}
          onClick={() =>
            props.pagination?.page > 0
              ? handlePageChange(props.pagination?.page - 1)
              : null
          }
        />
      </div>
      <div className="buttonWrapper">
        <Button
          buttonText="Next"
          isDisabled={props.pagination?.page === totalPages - 1}
          onClick={() =>
            props.pagination?.page < totalPages - 1
              ? handlePageChange(props.pagination?.page + 1)
              : null
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
