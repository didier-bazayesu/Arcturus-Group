import React from 'react'
import screenshoot from './assets/screenshoot.png'
import mission from './assets/mision.avif'
import { motion } from "framer-motion";
import download  from './assets/a.jpeg' 


function MainDesign() {
  return (

      <div className="p-10 bg-[#247066]">
          <div
              className={`bg-[url('assets/where.webp')] w-full md:w-2/3 bg-cover bg-center h-[400px] md:h-[500px] mt-20 md:mt-40 flex mx-auto rounded-2xl relative`}
          >
              {/* First child image */}
              <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative"
              >
                  <img
                      src={mission}
                      alt=""
                      className="w-[200px] sm:w-[250px] md:w-[300px] h-[250px] sm:h-[300px] md:h-[350px] rounded-2xl -ml-5 sm:-ml-10 md:-ml-20 -mt-5 sm:-mt-10 md:-mt-20"
                  />
              </motion.div>

              {/* Second child image */}
              <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute bottom-0 right-0 -mb-[150px] sm:-mb-[200px] md:-mb-[300px] mr-5 sm:mr-10 md:mr-20"
              >
                  <img
                      src={download}
                      alt=""
                      className="w-[300px] sm:w-[450px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl"
                  />
              </motion.div>
          </div>
      </div>



  )
}

export default MainDesign