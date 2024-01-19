import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Fetches all the data based on request.
export const getData = async (searchText, month, pageNumber, pageSize) => {
  const params = {
    search: searchText,
    month: month,
    page: pageNumber,
  };

  try {
    const res = await axios.get(`${apiUrl}/list`, { params });
    return res;
  } catch(error) {
    console.log(error);
    return null;
  }
};

// Fetches bar chart data.
export const getBarChartData = async (month) => {
  const params = {
    month: month,
  };

  try {
    const res = await axios.get(`${apiUrl}/statistics`, { params });
    return res;
  } catch(error) {
    console.log(error);
    return null;
  }
};

// Fetches statics data.
export const getStatistics = async (month) => {
  const params = {
    month: month,
  };

  try {
    const res = await axios.get(`${apiUrl}/bar-chart`, { params })
    return res;
  } catch(error) {
    return null;
  }
};
