import React from 'react'
import data from '../data.json';
import amazonLogo from'../images/amazon.png';
import netflixLogo from'../images/netflix.png';

export default function Items() {
    const logoPaths = {
        amazon : amazonLogo,
        netflix: netflixLogo
    }
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
                                {
                                (data[company].job_posting)?
                                    <h3 className='item-posting'>{data[company].job_posting.at(idx)}</h3>
                                : <h3 className='item-posting'><strong>. . .</strong></h3>
                                }
                                <h3 className='item-title'>
                                    <img src={logoPaths[company]} className='company-icon' alt={company+'-logo'}></img>
                                    {/* <i className="fa fa-amazon company-icon"></i> */}
                                    {data[company].job_title.at(idx)}
                                </h3>
                                <h3 className='item-location'>{data[company].job_location.at(idx)}</h3>
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
