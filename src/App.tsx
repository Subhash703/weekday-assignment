import JobList from "./components/JobList"
import './App.css';

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="header-container">
        <img src="https://assets-global.website-files.com/63359abeb97bf0d5ca346052/6336e2cc37e3c15b9c7c4487_Logo_new.png" alt="" className="header-logo" />
      </div>
      <JobList />
    </div>
  )
}

export default App