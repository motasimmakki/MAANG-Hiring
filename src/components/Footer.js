import React from 'react'
import './Footer.css'
import 'font-awesome/css/font-awesome.min.css';

export default function Footer() {
  return (
    <div className='footer-cont'>
        <p>
          <a href="https://github.com/motasimmakki/MAANG-Hiring" target="_blank" rel="noreferrer">
            <i className="fa fa-github github-icon"></i>
          </a>
          <strong>&lt; / &gt;</strong> with 🧡 By . . .
        </p>
    </div>
  )
}
