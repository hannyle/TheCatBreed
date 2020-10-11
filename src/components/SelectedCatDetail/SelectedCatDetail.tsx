import React from "react";
import "./SelectedCatDetail.css";
import { CatType } from "../../dataTypes";
import { getCatData } from "../../utils/utils";
import Picture from "../Picture/Picture";
import Info from "../Info/Info";

interface InputProps {
  selectedCat: CatType;
  catImages: string[];
}

const SelectedCat: React.FC<InputProps> = (props) => {
  return (
    <div className="container">
      <div className="selectedCatDetail">
        <Info content={props.selectedCat.name.toUpperCase()} boldContent />
        <Info content={getCatData(props.selectedCat.description)} />
        <Info
          title="Origin"
          boldTitle
          content={getCatData(props.selectedCat.origin)}
        />
        <Info
          title="Characters"
          boldTitle
          content={getCatData(props.selectedCat.temperament)}
        />
        <Info
          title="Lifespan"
          boldTitle
          content={getCatData(props.selectedCat.life_span)}
        />
        <Info
          title="Adaptability"
          boldTitle
          content={getCatData(props.selectedCat.adaptability)}
        />
      </div>
      <div className="images">
        {props.catImages.map((img, index) => (
          <div key={index} className="imageWrapper">
            <Picture imgSrc={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCat;
