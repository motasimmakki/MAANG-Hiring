import React from 'react'
import data from '../../src/data.json';
import { useState } from 'react';

export default function Filter({ filteredData, filterData }) {
  const [company, setCompany] = useState("all_jobs");
  const [location, setLocation] = useState("all_locations");
  const [historyData, setHistoryData] = useState([]);

  const disableDelete = (event) => {
    // Disable 'delete' key.
    if (event.keyCode === 46) {
      event.preventDefault();
    }
  }

  const filterByKeyword = (event) => {
    // Preventing reload over 'delete' key.
    if (event.keyCode === 46) {
      return;
    }
    let keyword = event.target.value;
    // console.log(event.target.value);
    if (!keyword.length) {
      if (company === "maang") {
        filterData(data);
      } else {
        let newData = {}
        newData[company] = data[company];
        filterData(newData);
      }
      setHistoryData([]);
    } else {
      // Tracking backspace search history.
      if (event.keyCode === 8) {
        filterData(historyData.at(historyData.length - 1));
        historyData.pop();
      } else {
        setHistoryData([...historyData, filteredData]);
        let newData = {};
        Object.keys(filteredData).map((company) => {
          let job_title = [], job_posting = [], job_location = [], job_link = [];
          filteredData[company].job_title.filter((title, idx) => {
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
              job_title.push(filteredData[company].job_title[idx]);
              job_location.push(filteredData[company].job_location[idx]);
              if (filteredData[company].job_posting) {
                job_posting.push(filteredData[company].job_posting[idx]);
              }
              job_link.push(filteredData[company].job_link[idx]);
            }
          });
          newData[company] = {
            job_title,
            job_location,
            job_link
          };
          if (job_posting.length) {
            newData[company] = { ...newData[company], job_posting };
          }
        });
        // console.log(newData);
        filterData(newData);
      }
    }
  }

  const filterByCompany = (event) => {
    document.querySelector('.search-bar').value = '';
    let selectedCompany = event.target.value;
    setCompany(selectedCompany);
    if(selectedCompany === "all_jobs") {
      filterData(data);
    } else {
      let newData = {}
      if (selectedCompany === "maang") {
        for(let key in data) {
          if(key === "meta" || key === "apple" || key === "amazon" || key === "netflix" || key === "google") {
            newData[key] = data[key];
          }
        }
      } else {
        newData[selectedCompany] = data[selectedCompany];
      }
      filterData(newData);
    }
  }

  const filterByLocation = (event) => {
    document.querySelector('.search-bar').value = '';
    let selectedLocation = event.target.value;
    console.log(selectedLocation);
    setLocation(selectedLocation);
  }

  return (
    <div className='filter-cont'>
      <div className='search-bar-cont'>
        <input className='search-bar' placeholder='Search by title...' onKeyDown={disableDelete} onKeyUp={filterByKeyword}></input>
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className='dropdown-cont'>
        <div className='filter'>
          <i className="filter-icon fa  fa-list"></i>
          <select className='dropdown filter-company' value={company} onChange={filterByCompany}>
            <option value="all_jobs">All Jobs</option>
            <option value="maang">MAANG</option>
            <option value="meta">Meta</option>
            <option value="apple">Apple</option>
            <option value="amazon">Amazon</option>
            <option value="netflix">Netflix</option>
            <option value="google">Google</option>
            <option value="adobe">Adobe</option>
            <option value="oracle">Oracle</option>
          </select>
        </div>
        <div className='filter'>
          <i className="filter-icon fa fa-map-marker"></i>
          <select className='dropdown filter-location' value={location} onChange={filterByLocation}>
            {/* <option value="" className=''>. . .</option> */}
            <option value="all_locations">All Locations</option>
            <option value="remote">Remote</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="chennai">Chennai</option>
            <option value="pune">Pune</option>
            <option value="outside_india">Outside India</option>
          </select>
        </div>
      </div>
    </div>
  )
}
