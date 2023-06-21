import Items from './Items'
import './Items.css';

export default function List({ data, filterStatus }) {
  return (

    <div className='list-cont light'>
{/* ----------------------------------tab buttons added below------------- */}
      <div className='tabs light'>
        <button className='btn btn-all light '>All Jobs</button>
        <button className='btn btn-favorite deActive-tab light'>Favorite</button>
      </div>
      <div className='tab-view'>
        <div className='loader'>
          <Items data={data} filterStatus={filterStatus} />
        </div>
        {/*-------------------------- Favorites active tab ------------------  */}
        <div className='favorite deActive-tab'>
        </div>

      </div>
    </div>

  )
}
