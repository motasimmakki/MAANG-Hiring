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
            {
            Object.keys(data).map((company, idx) => (
                data[company].job_link.map((link, idx) => (
                    <div className='item' key={idx}>
                        <a className='item-link' href={link} target='_blank' rel='noreferrer' key={idx}>
                            <div className='single-item-cont'>
                                <h3 className='item-title'>{data[company].job_titles.at(idx)}</h3>
                                <h3 className='item-posting'>{data[company].job_posting.at(idx)}</h3>
                                <h3 className='item-location'>{data[company].location_and_id.at(idx)}</h3>
                            </div>        
                        </a>
                    </div>
                ))
            ))
            }
            {/* <div className='item'>
                <a className='item-link' href={data.amazon.job_link.at(0)} target='_blank' rel='noreferrer'>
                    <div className='single-item-cont'>
                        <h3 className='item-title'>{data.amazon.job_titles.at(0)}</h3>
                        <h3 className='item-posting'>{data.amazon.job_posting.at(0)}</h3>
                        <h3 className='item-location'>{data.amazon.location_and_id.at(0)}</h3>
                    </div>
                </a>
            </div> */}
            
        </div>
    )
}
