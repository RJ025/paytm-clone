import { useEffect, useState } from "react"
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import axios  from "axios";
import {useNavigate} from "react-router-dom"

export const Users = () => {
    const [search , setSearch] = useState("");
    // Replace with backend call
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + search)
            .then(response=>{
                setUsers(response.data.user)
                console.log(users)
            })
        
    } , [search])

    return <>
        <AppBar/>
        <Balance value={10000}/>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full px-2 py-1 border rounded border-slate-200"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            >
            </input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    
    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]} {user.lastname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <button onClick={()=>{
                navigate("/sendmoney?id="+user._id+"&name="+user.firstname , {state:{id:user._id,name:user.firstname}})
            }} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Send Money</button>
        </div>
    </div>
}