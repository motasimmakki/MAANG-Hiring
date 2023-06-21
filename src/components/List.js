import Items from './Items'
import './Items.css';
import { useEffect } from 'react';

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
  return (
    <div className='list-cont light'id="list-cont">
      {/* ----------------------------------tab buttons added below------------- */}
      <div className='tabs light' id="tabs">
        <button className='btn btn-all light' id="all-btn">All Jobs</button>
        <button className='btn btn-favorite deActive-tab light' id="fav-btn">Interested</button>
      </div>
      <div className='tab-view'>
        <div className='loader'>
          <Items data={data} filterStatus={filterStatus} themeMode={themeMode} />
        </div>
        {/* -------------------------- Favorites active tab ------------------  */}
        <div className='favorite deActive-tab'></div>
      </div>
    </div>
  )
}
