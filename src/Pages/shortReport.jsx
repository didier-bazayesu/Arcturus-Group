import skills from "./img/Learning.png"
import goal from "./img/Goal.png"
import {easeOut, motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  { date: 'Jan', current: 4000, goal: 9800 },
  { date: 'Feb', current: 3000, goal: 9800 },
  { date: 'Mar', current: 2000, goal: 9800 },
  { date: 'Apr', current: 2780, goal: 9800 },
  { date: 'May', current: 1890, goal: 9800 },
  { date: 'Jun', current: 2390, goal: 9800 },
  { date: 'Jul', current: 9800, goal: 9800 },
];
console.log(motion)
export default function ShortReport(){
  return (
    <>
    <section className="px-4 max-sm:px-0 space-y-10">
      <div className="space-y-10">
    <div className="space-y-10 px-10 max-sm:px-5 lg:px-20">
    <h1 className="text-[#032147] font-bold text-2xl max-sm:text-xl">Short Reporter</h1>
    <p className="text-[#032147] text-xl max-sm:text-lg"><span className="font-bold">Full name:</span> Gambira Ntwari Yves</p>
    <p className="text-[#032147] text-xl max-sm:text-lg"><span className="font-bold">Gender</span> Male</p>
    <p className="text-[#032147] text-xl max-sm:text-lg"><span className="font-bold">Current Job</span> IT</p>
    <p className="text-[#032147] text-xl max-sm:text-lg"><span className="font-bold">Legion(country)</span> Rwanda</p>
      </div>
    <div className=" max-sm:space-y-10 px-10 max-sm:px-5 grid md:grid-cols-2 gap-1 md:[&>*]:mx-auto w-100%">
      <motion.div className="md:w-[100%] lg:w-[80%]"
      initial={{height:0, opacity:0}}
      whileInView={{height:200, opacity:1}}
      transition={{duration:0.8, ease:easeOut}}
      viewport={{once:true, amount:0.3}}
      >
      <div className="bg-linear-to-r from-[#177C50] to-[#2B7669] md:w-[100%] lg:w-[80%] px-5 py-7 rounded-2xl flex items-center">
        <div className="space-y-2">
          <h1 className="text-white lg:text-3xl text-xl font-bold">Current Skills</h1>
          <h1 className="text-white lg:text-6xl text-4xl font-bold">10</h1>
          <span className="text-[#032147]">In this occupation</span>
        </div>
        <div className="mx-auto">
          <img src={skills} alt="" className="lg:w-20 w-15" />
        </div>
      </div>
      </motion.div>
      <motion.div className="md:w-[100%] lg:w-[80%]"
      initial={{height:200, opacity:0}}
      whileInView={{height:200, opacity:1}}
      transition={{duration:1.5, ease:easeOut}}
      viewport={{once:true, amount:0.3}}
      >
      <div className="bg-linear-to-r from-[#032147] to-[#133A6B] md:w-[100%] lg:w-[80%] px-5 py-7 rounded-2xl flex items-center">
        <div className="space-y-2">
          <h1 className="text-white lg:text-3xl text-xl  font-bold">Goal Skills</h1>
          <h1 className="text-white lg:text-6xl text-4xl font-bold">20</h1>
          <span className="text-[#00FF91]">In this occupation</span>
        </div>
        <div className="mx-auto">
          <img src={goal} alt="" className="lg:w-20 w-15" />
        </div>
      </div>
      </motion.div>
    </div>
      </div>

    <div className="h-96 bg-white shadow rounded-xl lg:px-5 px-0">
    <div className="w-full lg:w-[90%] h-96 p-4 bg-white shadow rounded-xl">
    <motion.div
      className="w-full h-96 p-4 max-sm:p-0 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 50}}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#374151", fontSize: 14, fontWeight: "bold" }}
          />
          <YAxis
            tick={{ fill: "#374151", fontSize: 14 }}
            label={{
              value: "Progress",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#111827", fontSize: 16, fontWeight: "bold" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
            labelStyle={{ fontWeight: "bold", color: "#2563eb" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#1f2937",
            }}
          />

          {/* Goal bar (background style) */}
          <Bar dataKey="goal" fill="#e5e7eb" radius={[6, 6, 0, 0]} />

          {/* Current progress bar */}
          <Bar
            dataKey="current"
            fill="#032147"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
          <Bar
            dataKey="goal"
            fill="#2B7669"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>

    </div>
    </div>

    </section>
    </>
  )
}