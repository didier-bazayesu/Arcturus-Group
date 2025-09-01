import download from '../assets/where we work.webp'
import download1 from '../assets/mision.avif'

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[#0047AB] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Tabiya connects people, skills, and opportunities through an inclusive taxonomy that recognizes both formal and informal work.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
          <span className="text-gray-600">Image Placeholder</span>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#0047AB]">Who We Are</h2>
          <p className="mb-4 text-base md:text-lg">
            We are dedicated to building an open data ecosystem where skills and occupations are mapped, organized, and made accessible to everyone.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#00A99D]">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg">
            Our mission is to empower individuals and communities by making skills visible and opportunities accessible worldwide.
          </p>
        </div>
      </section>

      {/* Our Values with Image */}
      <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#FF7A00]">Our Values</h2>
          <p className="mb-4 text-base md:text-lg">
            Inclusion, transparency, and collaboration are at the core of everything we do.
          </p>
        </div>
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full h-64 md:h-80 flex items-center justify-center rounded-xl overflow-hidden">
          <img src={download1} className='w-full bg-cover' alt="" />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0047AB]">Where We Work</h2>
          {/* Map Placeholder */}
          <div className="bg-gray-300 w-full h-64 md:h-96 flex items-center justify-center rounded-xl overflow-hidden">
            
              <img src={download} alt="" className='w-full bg-cover' />
                
          </div>
        </div>
      </section>
    </div>
  );
}
