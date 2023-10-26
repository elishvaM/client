import { useEffect, useState } from "react"
import { usersFromServer } from "../services/user"
export default function ManagementUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        usersFromServer().then(res => {
            //???למה לא נכנס למערך
            setUsers(res.data)
            console.log(users)
        }).catch(err => console.log(err))
    }, [])
    return (<>
        <ul>
            {users.map(item => <li key={item.id}>{item.name}{item.email} </li>)}
        </ul>


    </>)
}