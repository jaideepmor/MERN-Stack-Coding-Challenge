import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// Fetches all the data based on request.
export const getData = (searchText, month, pageNumber, pageSize) => {
  const params = {
    search: searchText,
    page: pageNumber,
  };

  axios
    .get(`${apiUrl}/list`, { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

// Fetches bar chart data.
export const getBarChartData = (month) => {
  const params = {
    month: month,
  };

  axios
    .get(`${apiUrl}/statistics`, { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

// Fetches statics data.
export const getStatistics = (month) => {
  const params = {
    month: month,
  };

  axios
    .get(`${apiUrl}/bar-chart`, { params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
