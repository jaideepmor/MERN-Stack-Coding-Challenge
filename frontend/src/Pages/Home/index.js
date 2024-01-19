import React, { useEffect, useState } from "react";
import DataTable from "../../Components/DataTable";
import "./style.css";
import { Dropdown, InputGroup, Form, Button } from "react-bootstrap";
import DataCard from "../../Components/DataCard";
import DataGraph from "../../Components/DataGraph";
import {
  getBarChartData,
  getData,
  getStatistics,
} from "../../Services/DataService";

const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 },
];

function Home() {
  const [selectedMonth, setselectedMonth] = useState(null);
  const [pageSize, setpageSize] = useState(10);
  const [pageNumber, setpageNumber] = useState(1);
  const [searchText, setsearchText] = useState(null);
  const [barChartData, setbarChartData] = useState();
  const [statisticsData, setstatisticsData] = useState();
  const [tableData, settableData] = useState();

  // Searches data from API.
  const SearchData = () => {
    settableData(getData(searchText, selectedMonth, pageNumber, pageSize));
  };

  // Fetch data everyTime pageNumberChanges changes.
  useEffect(() => {
    settableData(getData(searchText, selectedMonth, pageNumber, pageSize));
  }, [pageNumber]);

  // Fetch data everyTime month  changes.
  useEffect(() => {
    setbarChartData(getBarChartData(selectedMonth));
    setstatisticsData(getStatistics(selectedMonth));
  }, [selectedMonth]);

  return (
    <div className="table-container">
      <div className="vertical-flex division ">
        <div className="horizantal-flex justify-space-between">
          <InputGroup className="mb-3 search-bar">
            <Form.Control
              placeholder="Search Transactions"
              aria-label="Search Transactions"
              aria-describedby="basic-addon2"
              onChange={(e) => setsearchText(e.target.value)}
            />
            <Button
              variant="primary"
              id="button-addon2"
              onClick={() => SearchData()}
            >
              Search
            </Button>
          </InputGroup>

          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Select Month
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {months.map((month, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={(e) => setselectedMonth(month.number)}
                  >
                    {month.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {tableData && (
          <div className="table-division">
            <DataTable data={tableData} />

            <div className="horizantal-flex justify-space-between">
              <div>
                <p>Page No : {pageNumber}</p>
              </div>
              <div>
                <ul className="horizantal-list">
                  <li>
                    <button
                      className="button"
                      onClick={() =>
                        pageNumber && setpageNumber(pageNumber - 1)
                      }
                    >
                      previous
                    </button>
                  </li>
                  <li>
                    <button
                      className="button"
                      onClick={() => setpageNumber(pageNumber + 1)}
                    >
                      next
                    </button>
                  </li>
                </ul>
              </div>
              <div>Page Size : {pageSize}</div>
            </div>
          </div>
        )}
      </div>

      {statisticsData && (
        <div className="vertical-flex division">
          <div>
            <h4>Statistics - {selectedMonth}</h4>
          </div>
          <div className="horizantal-flex justify-center">
            <DataCard data={statisticsData} />
          </div>
        </div>
      )}

      {barChartData && (
        <div className="vertical-flex division">
          <div>
            <h4>Bar Chart Stats - {selectedMonth}</h4>
          </div>
          <div className="horizantal-flex justify-center">
            <DataGraph data={barChartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
