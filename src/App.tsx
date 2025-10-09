import './App.css'
import { InterviewDashboard } from './components/interview-dashboard'
import DataWrapper from './context/DataWrapper'
import ReduxProvider from './redux/store/Providers'

function App() {
  return (
    <ReduxProvider>
    <DataWrapper>
     <InterviewDashboard/>
    </DataWrapper>
    </ReduxProvider>
  )
}

export default App
