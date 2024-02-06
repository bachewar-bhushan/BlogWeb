import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        }),
      });

      const responseJson = await response.json();
      if (response.ok) {
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setSubmitStatus("success");
        window.location.href = "/signin";
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
     <div className="bg-slate-200 h-[100vh] w-[100vw] flex justify-between rounded-sm ">
        <div className="left">
          <div className="">
          <img className="ml-60 mt-24" src="src/assets/signup.png" alt="" />
          </div>
        </div>
        <div className="right flex flex-col justify-center items-center w-[38vw] h-[100vh] mr-20">
        <h4 className="flex items-center justify-center text-3xl font-semibold mb-4">SIGN UP</h4>
          <div className="bg-slate-300 h-[60vh] w-[30vw] flex justify-center items-center shadow-md" >
            <form
            className="flex flex-col"
              onSubmit={handleSignUpSubmit}
              method="post"
              encType="multipart/form-data"
              target="_parent"
            >
              <div className="my-4 mx-14">
                <label htmlFor="username" className="text-black text-[16px]">
                Username &nbsp;
              </label>
              <input type="username" placeholder="Enter your Username" id="username" className="w-[15vw] ml-1 rounded-sm h-9"  autoComplete="off"/>
              </div>
              <div className="my-4 mx-14">
                <label htmlFor="email" className="text-black text-[16px]">
                Email &nbsp;
              </label>
              <input type="email" placeholder="Enter your Email" id="email" className="w-[15vw] ml-9 rounded-sm h-9"  autoComplete="off"/>
              </div>
              <div className="my-4 mx-14">
              <label htmlFor="password" className="text-black text-[16px]">
                Password &nbsp;
              </label>
              <input
              className="w-[15vw] ml-2 rounded-sm h-9"
                type="password"
                placeholder="Enter your password"
                id="password"
              />
              </div>
              <div className="flex items-center justify-center mt-9"> <button type="submit" onClick={handleSignUpSubmit} className="bg-[#145dbb] w-36 hover:bg-[#5d99e7] cursor-pointer rounded text-lg font-bold h-9">Sign Up</button></div>
             
              <div className="m-4 px-2 md:px-12 xl:px-24 py-2">
                <div>
            <Link
              to={"/signin"}
              className="text-[16px] text-black"
            >
              Don't have an account{" "}
              <span className="underline hover:text-[#5d99e7]">Sign in</span>
            </Link>
            </div>
            <div>
            </div>
          </div>
            </form>
            
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Signup;
