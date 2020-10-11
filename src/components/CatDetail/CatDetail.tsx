import React from "react";
import "./CatDetail.css";
import styled from "styled-components";
import { CatType } from "../../utils/dataTypes";
import { getCatData } from "../../utils/utils";
import { device } from "../../utils/deviceSize";
import Info from "../Info/Info";

interface InputProps {
  catList: CatType[];
  selectTheCat?: (breedId: string) => void;
}

const CatDetailWrapper = styled.div`
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5vw;
    row-gap: 1vh;
  }
`;

const CatDetail = styled.div`
  @media ${device.mobile} {
    margin: 1vh 0;
  }
`;

const CatDetailInfo: React.FC<InputProps> = (props) => {
  const handleClick = (breedId: string) => {
    if (props.selectTheCat) {
      props.selectTheCat(breedId);
    }
  };

  return (
    <CatDetailWrapper className="catDetailWrapper">
      {props.catList?.map(
        (cat) =>
          cat && (
            <CatDetail
              key={cat.id}
              className="catDetail"
              onClick={() => handleClick(cat.id)}
            >
              <Info content={cat.name.toUpperCase()} boldContent />
              <Info title="Origin" boldTitle content={getCatData(cat.origin)} />
              <Info
                title="Characters"
                boldTitle
                content={getCatData(cat.temperament)}
              />
            </CatDetail>
          )
      )}
    </CatDetailWrapper>
  );
};

export default CatDetailInfo;
