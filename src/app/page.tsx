import Navbar from "@/components/Navbar";
import { getSermons } from "@/lib/sermons";
import { MapPin, Clock, Phone, Youtube, Instagram, Facebook, ChevronRight } from "lucide-react";

const ministries = [
  {
    name: "Youth Ministry",
    description: "A safe space for teens and young adults to grow in faith, build friendships, and discover their purpose.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=640&q=80",
    color: "bg-blue-600",
  },
  {
    name: "Women's Ministry",
    description: "Empowering women to walk boldly in their God-given calling through community, prayer, and the Word.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=80",
    color: "bg-purple-600",
  },
  {
    name: "Men's Ministry",
    description: "Building men of faith, integrity, and purpose who lead their families and communities with strength.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=640&q=80",
    color: "bg-navy",
  },
  {
    name: "Family Life",
    description: "Equipping families with tools, community, and support to thrive through every season of life.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=640&q=80",
    color: "bg-green-700",
  },
];

const events = [
  { date: "MAR 23", title: "Family Fun Day", time: "12pm – 4pm", desc: "A day of food, games, and fellowship for the whole family." },
  { date: "MAR 30", title: "Women's Brunch", time: "10am – 1pm", desc: "Join our women's ministry for an inspiring morning of community." },
  { date: "APR 6", title: "Easter Sunday", time: "8:30am & 10am", desc: "He is risen! Two services — invite someone who needs to hear it." },
  { date: "APR 13", title: "Men's Breakfast", time: "8am – 10am", desc: "Monthly gathering for the men of PRBC." },
];

export default async function Home() {
  const sermons = await getSermons(3);
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-screen flex flex-col justify-end text-white"
        style={{
          backgroundImage: `url('http://peacefulrest.org/wp-content/uploads/2019/05/This-One.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Light vignette only — let the photo breathe */}
        <div className="absolute inset-0 bg-navy/40" />

        {/* Content in upper-left — above the sign */}
        <div className="relative z-10 w-full" style={{ paddingTop: "120px" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-lg">
              <p className="text-gold tracking-widest uppercase text-xs font-semibold mb-3">
                Peaceful Rest Baptist Church · Aurora, CO
              </p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                Peace in the{" "}
                <span className="text-gold">Midst of</span>{" "}
                the Storm.
              </h1>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#about"
                  className="bg-gold text-navy font-bold px-8 py-4 rounded-full text-base hover:bg-gold/80 transition-colors"
                >
                  Plan Your Visit
                </a>
                <a
                  href="#sermons"
                  className="text-white font-semibold text-base underline underline-offset-4 hover:text-gold transition-colors self-center"
                >
                  Watch Online →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service times pinned to bottom edge */}
        <div className="relative z-10 border-t border-white/10 bg-navy/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold" />
              <span>Sunday School — 8:30am</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold" />
              <span>Worship — 10am</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gold" />
              <span>1195 Lima St, Aurora, CO</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-3">Our Story</p>
            <h2 className="text-navy text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Rooted in Faith.<br />Built for Community.
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Peaceful Rest Baptist Church has been a cornerstone of the Aurora community for over four decades.
              What started as a small congregation of devoted believers has grown into a vibrant family of faith
              committed to worship, service, and love.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Under the leadership of Pastor Charles Survine, we are stepping boldly into the future — welcoming
              new generations while honoring the foundation laid before us.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-7 py-3 rounded-full hover:bg-navy/90 transition-colors"
            >
              Meet the Pastor <ChevronRight size={16} />
            </a>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Church community"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold text-navy p-6 rounded-2xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold">40+</div>
              <div className="text-sm font-semibold">Years of Ministry</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERMONS */}
      <section id="sermons" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">The Word</p>
              <h2 className="text-navy text-4xl font-bold">Recent Sermons</h2>
            </div>
            <a
              href="https://www.youtube.com/@prbcaurora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
            >
              <Youtube size={20} className="text-red-600" />
              View all on YouTube
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sermons.map((s) => (
              <a
                key={s.id}
                href={s.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={s.thumbnail}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-4">
                      <Youtube size={28} className="text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-gray-400 text-xs mb-1">{s.dateFormatted}</p>
                  <h3 className="text-navy font-bold text-lg leading-snug">{s.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MINISTRIES */}
      <section id="ministries" className="py-24 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">Get Connected</p>
            <h2 className="text-white text-4xl font-bold">Find Your Place</h2>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
              There&apos;s a place here for everyone. Find the ministry where you belong.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((m) => (
              <div
                key={m.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{m.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">What&apos;s Happening</p>
            <h2 className="text-navy text-4xl font-bold">Upcoming Events</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((e) => (
              <div
                key={e.title}
                className="flex gap-5 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 bg-navy text-white rounded-xl w-16 h-16 flex flex-col items-center justify-center text-center">
                  <span className="text-gold text-xs font-bold uppercase leading-none">
                    {e.date.split(" ")[0]}
                  </span>
                  <span className="text-white text-xl font-bold leading-none mt-0.5">
                    {e.date.split(" ")[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-navy font-bold text-lg">{e.title}</h3>
                  <p className="text-gold text-sm font-medium mb-1">{e.time}</p>
                  <p className="text-gray-500 text-sm">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVE */}
      <section id="give" className="py-24 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-navy text-4xl md:text-5xl font-bold mb-4">Give & Make an Impact</h2>
          <p className="text-navy/75 text-lg mb-8">
            Your generosity fuels our ministries, supports our community, and extends the reach of the Gospel.
            Every gift matters.
          </p>
          <a
            href="#"
            className="inline-block bg-navy text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-navy/90 transition-colors"
          >
            Give Online
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">We&apos;d Love to Hear from You</p>
            <h2 className="text-navy text-4xl font-bold mb-6">Come As You Are</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy">Address</p>
                  <p>1195 Lima St, Aurora, CO 80010</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy">Service Times</p>
                  <p>Sunday School — 8:30am</p>
                  <p>Worship Service — 10am</p>
                  <p>Bible Study — Wednesday evenings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-navy">Phone</p>
                  <p>(303) 364-4100</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="https://www.youtube.com/@prbcaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white p-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.instagram.com/prbcaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white p-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/prbcaurora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white p-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form className="bg-cream rounded-2xl p-8 space-y-5">
            <h3 className="text-navy font-bold text-xl">Send Us a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-navy text-white font-bold py-3 rounded-full hover:bg-gold hover:text-navy transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-gray-400 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="text-white font-bold">Peaceful Rest Baptist Church</span>
            <span className="mx-2">·</span>
            Aurora, CO
          </div>
          <p className="text-gray-500">
            © {new Date().getFullYear()} Peaceful Rest Baptist Church. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
