import { useState } from "react";
import Header from "./Header";

const Login=()=>{
   const[isSignInForm,setIsSignInForm]=useState(true);
   const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
   };

    return (
        <div>
            <Header/>
            <div className="absolute">
                <img
                 src="https://assets.nflxext.com/ffe/siteui/vlv3/a92ac6d9-e542-40d5-9bb1-bb7291e4de86/web/IN-en-20251117-TRIFECTA-perspective_9fe28c81-2209-4e08-b8bd-98cfa9f97a8f_medium.jpg" 
                 alt="Logo"
                 />
            </div>
            <form className=" w-4/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In":"Sign Up"}
                </h1>
                {!isSignInForm && (
                <input
                 type ="text" 
                 placeholder="Full Name " 
                 className=" p-4 my-4 w-full bg-gray-700"/>
                )}
                <input
                 type ="text" 
                 placeholder="Email Address " 
                 className=" p-4 my-4 w-full bg-gray-700"/>
                <input 
                 type ="password" 
                 placeholder="Password "
                 className="  p-4 my-4 w-full bg-gray-700"/>
                <button 
                 className="bg-red-700 p-2 my-4 w-full rounded-lg ">
                    {isSignInForm ? "Sign In":"Sign Up"}
                </button>
                <p className="text-center">OR</p>
                <button
                 className="bg-gray-600 p-2 my-4 w-full rounded-lg ">
                    Use a sign-in code
                </button>
        
                <a href="/Forgot Password" 
                 className="underline block text-center">
                    Forgot Password?
                </a>
                <label class="flex items-center space-x-2">
                   <input type="checkbox" class="form-checkbox h-5 w-4" />
                     Remember me
                </label>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                  {isSignInForm 
                    ? "New to Netflix?Sign Up Now" 
                    :"Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    );
};

export default Login;