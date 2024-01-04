import { useState } from "react"

export function SignUp(){

    const [username,setUsername] =  useState()
    const [email,setEmail] =  useState()
    const [password,setPassword] =  useState()
    const [rePassword,setRePassword] =  useState()

    const onChangeUsername = (event) => {

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

        <button disabled={!password || password !== rePassword}>Sign Up</button>
    </>
}