import { useState } from "react"
import axios from 'axios'

export function SignUp(){

    const [username,setUsername] =  useState()
    const [email,setEmail] =  useState()
    const [password,setPassword] =  useState()
    const [rePassword,setRePassword] =  useState()


    const onSubmit = (event) => {
        // bir HTML formu gönderildiğinde sayfanın yeniden yüklenmesini engellemek veya bir bağlantı tıklandığında sayfanın başka bir sayfaya gitmesini engellemek için event.preventDefault() kullanılır. Bu, JavaScript tarafından ele alınan olayın varsayılan tarayıcı davranışını iptal eder.
        event.preventDefault();
        axios.post('/api/v1/users',
        {
            // key ve assign ettigimiz value'nin degisken isimleri aynı ise tekrar etmemize gerek yok yani username: username yapmamıza gerek yok sadece username yazmak yeterli olacaktır.
            username,
            email,
            password,
        })
    }

    return (
        <form onSubmit={onSubmit}>
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
          >
            Sign Up
         </button>
         </form>
    )
}