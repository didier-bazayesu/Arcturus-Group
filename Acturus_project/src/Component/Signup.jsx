import picture from '../assets/Clip path group.png';

const HandleSignUp = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg py-8 px-6 flex flex-col items-center space-y-6">

               
                <div className="flex items-center gap-4">
                    <img src={picture} alt="logo" className="w-16 sm:w-20" />
                    <h1 className="text-4xl sm:text-6xl font-bold text-[#032147]">tabiya</h1>
                </div>

                
                <form className="w-full flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="First name"
                        className="rounded-[20px] border-none placeholder-black bg-[#d9d9d9] w-full py-2 px-4"
                    />

                    <input
                        type="text"
                        placeholder="Last name"
                        className="rounded-[20px] border-none placeholder-black bg-[#d9d9d9] w-full py-2 px-4"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="rounded-[20px] border-none placeholder-black bg-[#d9d9d9] w-full py-2 px-4"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-[20px] border-none placeholder-black bg-[#d9d9d9] w-full py-2 px-4"
                    />

                    <button
                        type="submit"
                        className="rounded-[20px] bg-[#032147] text-white py-2 px-4 w-full hover:bg-[#021831] transition"
                    >
                        Create account
                    </button>
                </form>


                
                <div className="flex flex-row  gap-2 text-sm ">
                    <p className="cursor-pointer">Already have an account?</p>
                    <a href="#" className="hover:text-blue-500">Log in</a>
                </div>

                <div className="flex justify-between w-full text-sm mt-2">
                    <button className="hover:text-blue-500 hover:underline">About us</button>
                    <button className="hover:text-blue-500 hover:underline">Contact us</button>
                </div>
            </div>
        </div>
    );
};

export default HandleSignUp;
