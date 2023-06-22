import React from 'react'
import { useEffect, useState } from 'react';
import metaLogo from '../images/meta.png';
import amazonLogo from '../images/amazon.png';
import appleLogo from '../images/apple.png';
import netflixLogo from '../images/netflix.png';
import googleLogo from '../images/google.png';
import adobeLogo from '../images/adobe.png';
import oracleLogo from '../images/oracle.png';

export default function InterestedItems({ themeMode }) {
    const logoPaths = {
        meta: metaLogo,
        amazon: amazonLogo,
        apple: appleLogo,
        netflix: netflixLogo,
        google: googleLogo,
        adobe: adobeLogo,
        oracle: oracleLogo
    }
    const [interestList, updateInterestedList] = useState(JSON.parse(localStorage.getItem("interestedJobs")));
    function removeJob(companyKey, idx) {
        // console.log(companyKey);
        let newInterestedList = {};
        for(let key in interestList) {
            if(key !== (companyKey))
            newInterestedList[key] = interestList[key];
        }
        updateInterestedList(newInterestedList);
    }
    useEffect(() => {
        localStorage.setItem("interestedJobs", JSON.stringify(interestList));
    }, [interestList])
    return (
        (themeMode === "light")?
            <div className='items-cont light'>
                {   interestList &&
                    Object.keys(interestList).map((company, idx) => (
                        <div className='item light' key={idx}>
                            <a className='item-link' href={interestList[company].job_link} target='_blank' rel='noreferrer'>
                                <div className='single-item-cont light'>
                                    {
                                        (interestList[company].job_posting) ?
                                            <h3 className='item-posting light'>{interestList[company].job_posting}</h3>
                                            : <h3 className='item-posting light'><strong>_ _ _</strong></h3>
                                    }
                                    <h3 className='item-title light'>
                                        <img src={logoPaths[company.split('-')[0]]} className='company-icon' alt={company + '-logo'}></img>
                                        {
                                            ((interestList[company].job_title.length) > 40) ?
                                                interestList[company].job_title.substring(0, interestList[company].job_title.substring(0, 40).lastIndexOf(' ')) + "..."
                                                : interestList[company].job_title
                                        }
                                    </h3>
                                    <h3 className='item-location light'>{interestList[company].job_location}</h3>
                                </div>
                            </a>
                            <button class="delete-button">
                                <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => removeJob(company, idx)}>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v11zM19 3h-3L16 2H8L7 3H4v2h15V3z" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
        :
            <div className='items-cont'>
            {   interestList &&
                Object.keys(interestList).map((company, idx) => (
                    <div className='item' key={idx}>
                        <a className='item-link' href={interestList[company].job_link} target='_blank' rel='noreferrer'>
                            <div className='single-item-cont'>
                                {
                                    (interestList[company].job_posting) ?
                                        <h3 className='item-posting'>{interestList[company].job_posting}</h3>
                                        : <h3 className='item-posting'><strong>_ _ _</strong></h3>
                                }
                                <h3 className='item-title'>
                                    <img src={logoPaths[company.split('-')[0]]} className='company-icon' alt={company + '-logo'}></img>
                                    {
                                        ((interestList[company].job_title.length) > 40) ?
                                            interestList[company].job_title.substring(0, interestList[company].job_title.substring(0, 40).lastIndexOf(' ')) + "..."
                                            : interestList[company].job_title
                                    }
                                </h3>
                                <h3 className='item-location'>{interestList[company].job_location}</h3>
                            </div>
                        </a>
                        <button class="delete-button">
                            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => removeJob(company, idx)}>
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v11zM19 3h-3L16 2H8L7 3H4v2h15V3z" />
                            </svg>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}
