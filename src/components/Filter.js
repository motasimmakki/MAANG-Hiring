import React from 'react'
import data from '../../src/data.json';
import { useState } from 'react';

export default function Filter({filteredData, filterData, filterStatus}) {
  const [company, setCompany] = useState("maang");

  const filterByKeyword = (event) => {
    console.log(event.target.value);
  }

  const filterByCompany = (event) => {
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
          <input className='search-bar' placeholder='Search by title...' onKeyUp={filterByKeyword}></input>
        </div>
        <div className='dropdown-cont'>
          <select className='dropdown filter-company' value={company} onChange={filterByCompany}>
            <option value="maang">MAANG</option>
            <option value="meta" className='meta-dropdown'>Meta</option>
            <option value="apple">Apple</option>
            <option value="amazon">Amazon</option>
            <option value="netflix">Netflix</option>
            <option value="google">Google</option>
          </select>
          <select className='dropdown filter-location'>
            <option value="" className=''>. . .</option>
          </select>
        </div>
    </div>
  )
}
