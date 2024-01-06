import { useState } from "react"
import axios from 'axios'

export function SignUp(){

    const [username,setUsername] =  useState()
    const [email,setEmail] =  useState()
    const [password,setPassword] =  useState()
    const [rePassword,setRePassword] =  useState()


    const onSubmit = (event) => {
        axios.post('http://localhost:8080/api/v1/users',
        {
            // key ve assign ettigimiz value'nin degisken isimleri aynı ise tekrar etmemize gerek yok yani username: username yapmamıza gerek yok sadece username yazmak yeterli olacaktır.
            username,
            email,
            password,
        })
    }

    return <>
        <h1>Sign Up</h1>
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={(event) => setUsername(event.target.value)}/>
        </div>

        <div>
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" onChange={(event) => setEmail(event.target.value)}/>
        </div>

        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
        </div>

        <div>
            <label htmlFor="repassword">Password Repeat</label>
            <input type="password" id="repassword" onChange={(event) => setRePassword(event.target.value)}/>
        </div>

        <button
         disabled={!password || password !== rePassword}
         onClick={onSubmit}
          >
            Sign Up
         </button>
    </>
}