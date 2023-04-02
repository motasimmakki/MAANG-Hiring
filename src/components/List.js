import Items from './Items'
import './Items.css';

export default function List({data, filterStatus}) {
  return (
    <div className='list-cont'>
      <div className='loader'>
        <Items data={data} filterStatus={filterStatus}/>
      </div>
    </div>
  )
}
