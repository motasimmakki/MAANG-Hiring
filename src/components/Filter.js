import React from 'react'
import data from '../../src/data.json';
import { useState } from 'react';

export default function Filter({filteredData, filterData, filterStatus}) {
  const [company, setCompany] = useState("maang");
  const [historyData, setHistoryData] = useState([]);

  const disableDelete = (event) => {
    // Disable 'delete' key.
    if(event.keyCode === 46) {
      event.preventDefault();
    }
  }

  const filterByKeyword = (event) => {
    // Preventing reload over 'delete' key.
    if(event.keyCode === 46) {
      return;
    }
    let keyword = event.target.value;
    // console.log(event.target.value);
    if(!keyword.length) {
      if(company === "maang") {
        filterData(data);
      } else {
        let newData = {}
        newData[company] = data[company];
        filterData(newData);
      }
      setHistoryData([]);
    } else {
      // Tracking backspace search history.
      if(event.keyCode === 8) {
        filterData(historyData.at(historyData.length-1));
        historyData.pop();
      } else {
        setHistoryData([...historyData, filteredData]);
        let newData = {};
        Object.keys(filteredData).map((company) => {
          let job_title = [], job_posting = [], job_location = [], job_link = [];
          filteredData[company].job_title.filter((title, idx) => {
                if(title.toLowerCase().includes(keyword.toLowerCase())) {
                  job_title.push(filteredData[company].job_title[idx]);
                  job_location.push(filteredData[company].job_location[idx]);
                  if(filteredData[company].job_posting) {
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
          if(job_posting.length) {
            newData[company] = {...newData[company], job_posting};
          }
        });
        // console.log(newData);
        filterData(newData);
      }
    }
  }

  const filterByCompany = (event) => {
    document.querySelector('.search-bar').value = '';
    filterStatus(true);
    let selectedCompany = event.target.value;
    setCompany(selectedCompany);
    if(selectedCompany === "maang") {
      filterData(data);
    } else {
      let newData = {}
      newData[selectedCompany] = data[selectedCompany];
      filterData(newData);
    }
  }

  return (
    <div className='filter-cont'>
        <div className='search-bar-cont'>
          <input className='search-bar' placeholder='Search by title...' onKeyDown={disableDelete} onKeyUp={filterByKeyword}></input>
        </div>
        <div className='dropdown-cont'>
          <select className='dropdown filter-company' value={company} onChange={filterByCompany}>
            <option value="maang">MAANG</option>
            <option value="meta" className='meta-dropdown'>Meta</option>
            <option value="apple">Apple</option>
            <option value="amazon">Amazon</option>
            <option value="netflix">Netflix</option>
            <option value="google">Google</option>
            <option value="adobe">Adobe</option>
          </select>
          <select className='dropdown filter-location'>
            <option value="" className=''>. . .</option>
          </select>
        </div>
    </div>
  )
}
