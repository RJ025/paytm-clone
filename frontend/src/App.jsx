import { Children } from "react"
import Signup from "./pages/Signup"
import Homepage from "./pages/Homepage"
import Signin from "./pages/Signin"
import { Users } from "./pages/Dashboard"
import {createBrowserRouter , Outlet} from "react-router-dom"
import SendMoney from "./pages/SendMoney"

const appRouter = createBrowserRouter([{
  path : "/" ,
  element : <App/>,
  children : [
    {
      path : "/" ,
      element : <Homepage/>
    } ,
    {
      path : "/signin" ,
      element : <Signin/>
    } ,
    {
      path : "/signup" ,
      element : <Signup/>
    } ,
    {
      path : "/dashboard" , 
      element : <Users/>
    } ,
    {
      path : "/sendmoney" ,
      element : <SendMoney/>
    }
  ]
}])

function App() {

  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default appRouter
