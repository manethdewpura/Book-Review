import {Routes, Route} from "react-router-dom"

import ViewAllReviews from "./assets/pages/ViewAllReviews"

function App() {

  return (
    <Routes>
      <Route path="/" element={<ViewAllReviews/>} />
    </Routes>
  )
}

export default App
