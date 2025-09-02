import download from '../assets/Rectangle 4.png'
import download1 from '../assets/mision.avif'
import { easeInOut, motion } from 'framer-motion';
import picture from '../assets/Clip path group.png';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="overflow-x-hidden"> {/* Add this wrapper to prevent horizontal scroll */}
      <div className="  sm:px-6  "> {/* Add consistent padding */}
        <div className="flex  flex-row  mb-6 gap-4 sm:gap-5 max-w-7xl mt-5  sm:pb-5 justify-center ">
          <img src={picture} alt="Tabiya Logo" className="w-16 h-16 sm:w-10 sm:h-10  md:h-20 md:w-20 sm:mx-0  " />
          <h1 className="font-bold text-3xl sm:text-5xl text-center sm:text-left text-[#032147]">tabiya</h1>
        </div>

      </div>

      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.5 }}
        ><br />
          <section className="relative bg-[#0047AB] text-white py-20 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl">
                Tabiya connects people, skills, and opportunities through an inclusive taxonomy that recognizes both formal and informal work.
              </p>
            </div>
          </section>
        </motion.div>

        {/* Who We Are */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0047AB]">Who We Are</h2>
                <p className="mb-4 text-base md:text-lg">
                  We are dedicated to building an open data ecosystem where skills and occupations are mapped, organized, and made accessible to everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#00A99D]">Our Mission</h2>
              <div className="w-fulll  text-base md:text-lg space-y-6 ">
                <p className="border border-black p-5 rounded-2xl bg-[#37b0a0] text-white ">
                  Tabiya builds open-source software and standards to unlock economic opportunity
                  for all. We partner with government employment services, NGOs, and job platforms
                  to create pathways that recognize skills from all work – including informal and
                  traditionally unseen activities.
                  Our mission is to make labor markets more efficient, equitable, and inclusive.
                </p>

                <p className="border border-black p-5 rounded-2xl bg-[#37b0a0] text-white">
                  The youth workforce is growing, especially in low-
                  and middle-income countries. Millions of people gain skills informally,
                  yet labor markets often don't often recognize their value, creating barriers
                  to participation. Technology could help, but current solutions are expensive,
                  proprietary, and create fragmented systems that overlook informal skills and
                  prevent data sharing. We're on a mission to change that.
                  At Tabiya, we're building digital public infrastructure for jobs—creating open-source
                  technology that organizations can freely adapt to create more efficient, equitable
                  labor markets.
                </p>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Our Values with Image */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF7A00]">Our Values</h2>
                <p className="mb-4 text-base md:text-lg">
                  Inclusion, transparency, and collaboration are at the core of everything we do.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download1} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <section className="py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0047AB]">Where We Work</h2>
              {/* Map */}
              <div className="w-full h-64 md:h-96 flex items-center justify-center rounded-xl overflow-hidden">
                <img src={download} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}