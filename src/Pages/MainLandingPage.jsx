import React from "react";

export default function MainLandingPage() {
  return (
    <>
    <div className="mx-auto p-6 bg-white space-y-10 lg:p-20" >
      <div className="bg-[#D9D9D9] p-6">
        <p className="text-center text-[#000000] text-sm sm:text-md lg:text-lg">
          Tabiya builds open-source software and standards to unlock economic opportunity 
          for all. We partner with government employment services, NGOs, and job platforms to 
          create pathways that recognize skills from all work – including informal and 
          traditionally unseen activities. Our mission is to make labor markets more efficient, 
          equitable, and inclusive.
        </p>
      </div>
      <div className='space-y-10 lg:grid lg:gap-2 lg:justify-center lg:items-center lg:grid-cols-2'>
      <div>
        <h2 className='text-[#032147] text-sm sm:text-md lg:text-lg  text-center font-bold'>What We Do </h2>
        <h2 className='text-sm sm:text-md lg:text-lg text-[#032147] text-center font-bold'>Addressing the challenge with open-source</h2>
        <p className='text-center mt-4 text-sm sm:text-md lg:text-lg'>
            The youth workforce is growing, especially in low- and middle-income countries. Millions of people gain skills informally, 
            yet labor markets often don't often recognize their value, creating barriers to participation. Technology could help,
             but current solutions are expensive, proprietary, and create fragmented systems that overlook informal skills and prevent 
             data sharing. We're on a mission to change that.
            At Tabiya, we're building digital public infrastructure for jobs—creating open-source technology that organizations can freely 
            adapt to create more efficient, equitable labor markets.
        </p>


      </div>
        <div>
        <h2 className='text-[#032147] text-sm sm:text-md lg:text-lg text-center font-bold'>The Impact</h2>
        <h2 className='text-sm sm:text-md lg:text-lg text-[#032147]  text-center font-bold'>5 million jobseekers impacted by our work - and we’re just getting started</h2>
        <p className='text-center mt-4 text-sm sm:text-md lg:text-lg'>
            The youth workforce is growing, especially in low- and middle-income countries. Millions of people
             gain skills informally, yet labor markets often don't often recognize their value,
              creating barriers to participation. Technology could help, but current solutions are expensive,
               proprietary, and create fragmented systems that overlook informal skills and prevent data sharing. 
               We're on a mission to change that.
            At Tabiya, we're building digital public infrastructure for jobs—creating open-source technology that 
            organizations can freely adapt to create more efficient, equitable labor markets.
        </p>


      </div>
      </div>

      <div className='grid justify-center items-center  grid-cols-2 sm:grid-cols-3 lg:gap-1   gap-10 sm:gap-2 [&>*]:rounded-[10px] [&>*]:text-center [&>*]:w-[168px] [&>*]:h-[120px] lg:mt-20 lg:pl-25   sm:pl-20'>
        <div className='bg-[#D9D9D9] text-[#2B7669]'>
            <h3  className='mt-8 font-bold'>Pilot</h3>
            <p className='font-bold'>3</p>
        </div>
        <div className='bg-[#032147] text-white'>
            <h3 className='mt-8 font-bold'>Relationships</h3>
            <p className='font-bold'>3,689</p>
        </div>
        <div className='bg-[#D9D9D9] text-[#2B7669]'>
            <h3  className='mt-8 font-bold'>Control trials</h3>
            <p className='font-bold'>100%</p>
        </div>

      </div>

      <div className='text-[#032147] text-center lg:space-y-10'>
          <h2 className=' text-sm sm:text-md lg:text-lg font-bold lg:mt-20'>The Impact</h2>
        <h2 className='text-sm sm:text-md lg:text-lg font-bold'>5 million jobseekers impacted by our work - and we’re just getting started</h2>
        <div className='grid justify-center items-center grid-cols-2 text-sm sm:text-md lg:text-lg lg:gap-10 sm:gap-8   sm:pl-10 space-y-10'>
        <div className=''>
            <h3  className='mt-8 font-bold'>3</h3>
            <p className=''>Pilot programs in 3 countries around the 
                world including South Africa, Kenya, and Ethiopia.</p>
        </div>
        <div className=''>
            <h3 className='mt-8 font-bold'>3,689</h3>
            <p className=''>
            Relationships in our taxonomy between skills from unpaid 
            work and formal sector occupations.
            </p>
        </div>
        <div className=''>
            <h3  className='mt-8 font-bold'>100%</h3>
            <p className=''>
                All parts of our tech stack are currently 
                being evaluated using randomized control trials.
            </p>
        </div>
      </div>
      </div>
      <div>
        <div className='grid jusify-center items-center grid-cols-3  gap-4 sm:gap-2 [&>*]:rounded-[10px]  [&>*]:w-[168px] [&>*]:h-[120px] lg:pl-25 sm:pl-20 lg:mt-25 sm:mt-20 '>
        <div className=''>
            <img src="/img/image.jpeg" alt="image" />
           
        </div>
        <div className=''>
            <img src="/img/image.jpeg" alt="image" />

            
        </div>
        <div className=''>
            <img src="/img/image.jpeg" alt="image" />
           
            
        </div>

      </div>
      </div>
    
       

    </div>
    </>
  );
}