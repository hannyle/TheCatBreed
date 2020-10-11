  // Some cats do not have full information
  export const getCatData = (data?: string | number) => {
    const noData = "Not available data";
    if (data) {
      return data;
    }
    return noData;
  };