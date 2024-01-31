import { RouterProvider } from "react-router-dom"
import "./App.css"
import router from "./router"
// import { Counter } from "./features/counter/Counter"
// import { Quotes } from "./features/quotes/Quotes"

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
