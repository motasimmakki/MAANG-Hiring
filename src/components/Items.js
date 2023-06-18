import React, { useEffect, useState } from 'react';
// import data from '../data.json';
import metaLogo from'../images/meta.png';
import amazonLogo from'../images/amazon.png';
import appleLogo from'../images/apple.png';
import netflixLogo from'../images/netflix.png';
import googleLogo from'../images/google.png';
import adobeLogo from'../images/adobe.png';
import oracleLogo from'../images/oracle.png';

export default function Items({data}) {
    const logoPaths = {
        meta: metaLogo,
        amazon : amazonLogo,
        apple: appleLogo,
        netflix: netflixLogo,
        google: googleLogo,
        adobe: adobeLogo,
        oracle: oracleLogo
    }
    // if(Object.keys(data).length) {
    //     console.log(data);
    // } else {
    //     // NOT A SINGLE JOB AVAILABLE!
    // }
    const [isLoading, setIsLoading] = useState(true);
    function waitForAWhile(time) {
        return new Promise((resolve) => setTimeout(() => resolve(), time));
    }
    useEffect(() => {
        waitForAWhile(2500).then(() => setIsLoading(false));
    }, []);
    useEffect(() => {
        setIsLoading(true);
        waitForAWhile(1000).then(() => setIsLoading(false));
    }, [data]);
    return (
        (isLoading)? null:
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
                                : <h3 className='item-posting'><strong>_ _ _</strong></h3>
                                }
                                <h3 className='item-title'>
                                    <img src={logoPaths[company]} className='company-icon' alt={company+'-logo'}></img>
                                    {
                                    ((data[company].job_title.at(idx).length) > 45)?
                                        data[company].job_title.at(idx).substring(0, data[company].job_title.at(idx).substring(0, 45).lastIndexOf(' ')) + "..."
                                    : data[company].job_title.at(idx)
                                    }
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
