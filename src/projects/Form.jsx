import React, { useState } from 'react'

const Form = () => {

    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [message, setMessage] = useState('');

    let [storeName, setStoreName] = useState('');
    let [storeMail, setStoreMail] = useState('');
    let [storeMessage, setStoreMessage] = useState('');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onFormSubmit = (e) => {
          e.preventDefault();

          let test = emailPattern.test(email);
          if(!test){
            alert('Invalid Email');
            return;
          }

          if(message.length > 50){ // 60 < 50
            alert("Exceeding the message length");
            return;
          }

         console.log("form submitted", name, email, message);
         setStoreName(name);
         setStoreMail(email);
         setStoreMessage(message);
         setName("");
         setEmail("");
         setMessage('');
         
        
    }


    return (
        <div>
            <div className="min-h-screen bg-black  flex items-center justify-center p-6">
                <div className="w-full max-w-6xl bg-gray-200 shadow-xl rounded-2xl flex overflow-hidden">

                    {/* Left Side – Form */}
                    <div className="w-1/2 p-10 border-r border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">Fill The Form</h2>
                        <form onSubmit={(e)=> onFormSubmit(e)} >
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                       value={name}
                                       onChange={(e)=>setName(e.target.value)}
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Message</label>
                                    <textarea
                                    value={message}
                                    onChange={(e)=> setMessage(e.target.value)}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Write something..."
                                    ></textarea>
                                </div>

                                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side – Submitted Info Display */}
                    <div className="w-1/2 p-10 bg-gray-50">
                        <h2 className="text-2xl font-bold mb-6">Submitted Information</h2>

                        <div className="space-y-4 text-gray-700">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p><span className="font-semibold">Name:{storeName}</span> --</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p><span className="font-semibold">Email:{storeMail}</span> --</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p><span className="font-semibold">Message:{storeMessage}</span> --</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Form;
