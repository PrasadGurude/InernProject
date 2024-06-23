import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Body1 from '../components/Body1.jsx'
import Body2 from '../components/Body2.jsx'

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}

function MainApp() {
  const [month, setMonth] = useState("All")
  const navigate = useNavigate(); // Use the useNavigate hook inside MainApp

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);

    if (selectedMonth !== "All") {
      navigate('/monthData'); // Navigate to the monthData route
    }
  };

  return (
    <div>
      <div className='header'>
        <button className='header-btn'>Search Transaction</button>
        <select name="months" className="header-drop" onChange={handleMonthChange}>
          <option value="All">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <Routes>
        <Route path='/data' element={<Body1 />} />
        <Route path='/' element={<Body1 />} />
        <Route path='/monthData/:month/:page_no' element={<Body2 month={month} />} />
        {/* <Route path='*' element={<Notfound />} /> */}
      </Routes>
    </div>
  )
}

export default App
