import './App.css'
import { InterviewDashboard } from './components/interview-dashboard'
import DataWrapper from './context/DataWrapper'

function App() {
  return (
    <DataWrapper>
     <InterviewDashboard/>
    </DataWrapper>
  )
}

export default App
