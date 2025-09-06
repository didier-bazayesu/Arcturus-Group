import { motion } from "framer-motion"

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

function Searchgroup() {
    const stats = [
        { number: "3000+", label: "Occupations" },
        { number: "650+", label: "Occupation Groups" },
        { number: "650+", label: "Skill Groups" },
        { number: "14,000+", label: "Skills" },
        { number: "130,000+", label: "Skills & Occupations Associations" },
    ]

    return (
        <div className="m-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((item, i) => (
                <motion.div
                    key={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="font-bold text-center text-2xl sm:text-3xl p-8 
                     bg-[#247066] text-white rounded-2xl 
                     shadow-lg hover:shadow-2xl 
                     hover:scale-105 transition-all duration-300
                     flex flex-col justify-center min-h-[180px]"
                >
                    <p>{item.number}</p>
                    <p className="text-lg sm:text-xl font-medium">{item.label}</p>
                </motion.div>
            ))}
        </div>
    )
}
export   default Searchgroup;