'use client';
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import'../styles/login.css';

export default function loginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('admin@seeds.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');

  const handleSubmit= async (e: React.FormEvent)=>{
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any){
      setError(err.message || 'Login Failed');
    }
  };

  return(
    <>
    <main className="login-background">
      <section className="login-container">
        <h1>Seeds E-Learning</h1>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label htmlFor="email">Email</label>
          <input id='email' type="email" placeholder="admin@seeds.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="12345678" value={password} onChange={(e) => setPassword(e.target.value)} required />

          {error && <p className="error">Invalid Credentials</p>}
          <p className="demo-note"> Demo Credentials: admin@seeds.com / 12345678</p>

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
    </>
  )
}