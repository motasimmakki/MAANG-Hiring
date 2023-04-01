import Items from './Items'
import './Items.css';

export default function List() {
  return (
    <div className='list-cont'>
      <div className='loader'>
        <Items/>
      </div>
    </div>
  )
}
