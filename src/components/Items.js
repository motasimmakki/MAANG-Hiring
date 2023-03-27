import React from 'react'
import data from '../data.json';

export default function Items() {
    if(Object.keys(data).length) {
        console.log(data);
    } else {
        // NOT A SINGLE JOB AVAILABLE!
    }

    return (
        <div className='items-cont'>
            {/* {
                data.map((company) => {

                })
            } */}
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
            <div className='item'>

            </div>
        </div>
    )
}
