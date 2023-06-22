import InterestedItems from './InterestedItems';
import Items from './Items'
import './Items.css';
import { useEffect, useState } from 'react';

export default function List({ data, filterStatus, themeMode }) {
  // For change Theme.  
  useEffect(() => {
    const listCont_classes = document.getElementById('list-cont').classList;
    const tabs_classes = document.getElementById('tabs').classList;
    const all_btn_classes = document.getElementById('all-btn').classList;
    const fav_btn_classes = document.getElementById('fav-btn').classList;
    if(themeMode === "light") {
      listCont_classes.add('light');
      tabs_classes.add('light');
      all_btn_classes.add('light');
      fav_btn_classes.add('light');
    } else {
      listCont_classes.remove('light');
      tabs_classes.remove('light');
      all_btn_classes.remove('light');
      fav_btn_classes.remove('light');
    }
  }, [themeMode]);
  const [currTab, changeCurrTab] = useState("all-jobs");
  function changeTab(currTab) {
    // console.log(currTab)
    let all_btn = document.getElementById('all-btn');
    let fav_btn = document.getElementById('fav-btn');
    if(currTab.classList.contains('btn-all')) {
      changeCurrTab("all-jobs");
      all_btn.classList.remove('deActive-tab');
      all_btn.classList.add('active-tab');
      
      fav_btn.classList.remove('active-tab');
      fav_btn.classList.add('deActive-tab');
    } else {
      changeCurrTab("interested-jobs");
      all_btn.classList.remove('active-tab');
      all_btn.classList.add('deActive-tab');
      
      fav_btn.classList.remove('deActive-tab');
      fav_btn.classList.add('active-tab');
    }
  }
  // useEffect(() => {
  //   console.log(currTab);
  // }, [currTab]);
  const interestList = JSON.parse(localStorage.getItem("interestedJobs"));
  return (
    <div className='list-cont light'id="list-cont">
      {/* ----------------------------------tab buttons added below------------- */}
      <div className='tabs light' id="tabs">
        <button className='btn btn-all light active-tab' id="all-btn" onClick={(event) => changeTab(event.currentTarget)}>All Jobs</button>
        <button className='btn btn-favorite deActive-tab light' id="fav-btn" onClick={(event) => changeTab(event.currentTarget)}>Interested</button>
      </div>
      <div className='tab-view'>
        <div className='loader'>
          {
          (currTab === "all-jobs")? 
            <Items data={data} filterStatus={filterStatus} themeMode={themeMode}/>
          :
            (interestList && !Object.keys(interestList).length)?
              <p>No Job Marked as Interested</p>
            : 
              <InterestedItems/>
          }
        </div>
        {/* -------------------------- Favorites active tab ------------------  */}
        <div className='favorite deActive-tab'></div>
      </div>
    </div>
  )
}
