import React,{useState} from 'react'


const Footer = () => {
    const [pageCount, setPageCount] = useState(1)
  return (
    <div className='footer'>
        <p>Page No:{pageCount}</p>
        <div>
            <button className='footer-btn'>Previous</button>
            <button className='footer-btn'>Next</button>
        </div>
        <p>Per Page:10</p>
    </div>
  )
}

export default Footer