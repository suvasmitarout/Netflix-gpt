import { useState,useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import{createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from "firebase/auth";       
import {auth} from "../utils/firebase"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const[errorMessage,setErrorMessage]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const name=useRef(null);    
    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick = () => {

        const message =checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message) return;

        // Sign In/Sign Up Logic
        if(!isSignInForm){
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
            .then((userCredential)=>{
                const user=userCredential.user;
                updateProfile(user, {
                 displayName: "name.current.value", photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                   const {uid,email,displayName,photoURL} = auth.currentUser;
                   dispatch(
                        addUser({
                            uid:uid,
                            email:email,
                            displayName:displayName,
                            photoURL:photoURL,
                        })
                 );
                   navigate("/browse");
                })
                .catch((error) => {
                    setErrorMessage(error.message);
               });
            })      
            .catch((error)=>{
                const errorCode=error.code;
                const errorMessage=error.message;
                setErrorMessage(errorCode + "-"+ errorMessage);
            });
        }
        else{
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value)
            .then((userCredential)=>{   
                const user=userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error)=>{
                const errorCode=error.code;
                const errorMessage=error.message;
                setErrorMessage(errorCode + "-"+ errorMessage);
            });
        }
    };
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div>
            <Header />
            <div className="absolute">
              
                    <img className="object-fit-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/a92ac6d9-e542-40d5-9bb1-bb7291e4de86/web/IN-en-20251117-TRIFECTA-perspective_9fe28c81-2209-4e08-b8bd-98cfa9f97a8f_medium.jpg"
                    alt="Logo"
                   
                />

                <form 
                  onSubmit={(e)=>e.preventDefault()} 
                  className="absolute top-0 left-5 right-5 w-4/12 p-6 bg-black my-20 mx-auto text-white rounded-lg bg-backdrop-blur-lg bg-black/80 "
                >
                    <h1 className="font-bold text-3xl py-4">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name "
                            className=" p-4 my-4 w-full bg-gray-700" />
                    )}
                    <input
                        ref={email}
                        type="text"
                        placeholder="Email Address "
                        className=" p-4 my-4 w-full bg-gray-700" />
                    <input
                        ref={password}
                        type="password"
                        placeholder="Password "
                        className="  p-4 my-4 w-full bg-gray-700" />
                    
                    <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                    <button
                        className="bg-red-700 p-2 my-4 w-full rounded-lg "
                        onClick={handleButtonClick}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
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
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox h-5 w-4" />
                        Remember me
                    </label>
                    <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                        {isSignInForm
                            ? "New to Netflix?Sign Up Now"
                            : "Already registered? Sign In Now."}
                    </p>
                </form>
            </div>

        </div>
    );
};

export default Login;