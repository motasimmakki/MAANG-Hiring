import React, { useEffect, useState } from 'react';
// import data from '../data.json';
import metaLogo from '../images/meta.png';
import amazonLogo from '../images/amazon.png';
import appleLogo from '../images/apple.png';
import netflixLogo from '../images/netflix.png';
import googleLogo from '../images/google.png';
import adobeLogo from '../images/adobe.png';
import oracleLogo from '../images/oracle.png';

export default function Items({ data, themeMode }) {
    const logoPaths = {
        meta: metaLogo,
        amazon: amazonLogo,
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
        (isLoading) ? null :
            // For change Theme.
            (themeMode === "light")?
                (<div className='items-cont light' id="items-cont">
                    {
                    Object.keys(data).map((company, idx) => (
                        data[company].job_link.map((link, idx) => (
                            <div className='item light' id="item" key={idx}>
                                <a className='item-link' href={link} target='_blank' rel='noreferrer' key={idx}>
                                    <div className='single-item-cont light' id="single-item">
                                        {
                                        (data[company].job_posting) ?
                                            <h3 className='item-posting light' id="item-posting">{data[company].job_posting.at(idx)}</h3>
                                            : <h3 className='item-posting light' id="item-posting"><strong>_ _ _</strong></h3>
                                        }
                                        <h3 className='item-title light' id="item-title">
                                            <img src={logoPaths[company]} className='company-icon' alt={company + '-logo'}></img>
                                            {
                                            ((data[company].job_title.at(idx).length) > 45) ?
                                                data[company].job_title.at(idx).substring(0, data[company].job_title.at(idx).substring(0, 45).lastIndexOf(' ')) + "..."
                                                : data[company].job_title.at(idx)
                                            }
                                        </h3>
                                        <h3 className='item-location light' id="item-location">{data[company].job_location.at(idx)}</h3>
                                    </div>
                                </a>
    {/*-------------------------------  ADD to Favorite Button and SVG------------------------------------------------  */}
                                <button class="add-to-favorites light" id="mark-fav">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                                        <path d="M5 3h14a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        ))
                    ))
                    }
                </div>)
            :
                (<div className='items-cont'>
                    {
                    Object.keys(data).map((company, idx) => (
                        data[company].job_link.map((link, idx) => (
                            <div className='item' key={idx}>
                                <a className='item-link' href={link} target='_blank' rel='noreferrer' key={idx}>
                                    <div className='single-item-cont'>
                                        {
                                        (data[company].job_posting) ?
                                            <h3 className='item-posting'>{data[company].job_posting.at(idx)}</h3>
                                            : <h3 className='item-posting'><strong>_ _ _</strong></h3>
                                        }
                                        <h3 className='item-title'>
                                            <img src={logoPaths[company]} className='company-icon' alt={company + '-logo'}></img>
                                            {
                                            ((data[company].job_title.at(idx).length) > 45) ?
                                                data[company].job_title.at(idx).substring(0, data[company].job_title.at(idx).substring(0, 45).lastIndexOf(' ')) + "..."
                                                : data[company].job_title.at(idx)
                                            }
                                        </h3>
                                        <h3 className='item-location'>{data[company].job_location.at(idx)}</h3>
                                    </div>
                                </a>
        {/* -------------------------------  ADD to Favorite Button and SVG------------------------------------------------  */}
                                <button class="add-to-favorites">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                                        <path d="M5 3h14a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        ))
                    ))
                    }
                </div>)
    )
}
