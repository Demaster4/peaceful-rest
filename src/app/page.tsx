import Image from "next/image";
import Navbar from "@/components/Navbar";
import LiveStreamFacade from "@/components/LiveStreamFacade";
import { getSermons } from "@/lib/sermons";
import { MapPin, Clock, Phone, Youtube, Instagram, Facebook, ChevronRight } from "lucide-react";

const leadership = [
  {
    name: 'Charles "Chuck" Edward Survine',
    title: "Senior Pastor",
    image: "/pastor-survine-bc.webp",
    bio: "Born in Los Angeles and raised right here in Denver, Pastor Chuck answered the call to ministry early in life. He was licensed and ordained in 1993 and has been leading Peaceful Rest Baptist Church ever since. With a background in applied science, theology, and biblical studies, his preaching is rooted in the Word and connected to everyday life. Outside the pulpit, he serves as 2nd Vice Moderator of the Northern District Baptist Association. Above all, he is a devoted husband to Melissa and a proud father to their daughter, Alyssa. \"…and what doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?\" — Micah 6:8",
  },
  {
    name: "Melissa Survine",
    title: "First Lady",
    image: "/first-lady.webp",
    bio: "First Lady Melissa works alongside Pastor Chuck to care for the families of Peaceful Rest. She leads our Women's Ministry with a focus on real mentorship and consistent prayer. Whether she's organizing an event or simply checking in on a member after service, Melissa's goal is to make sure everyone who walks through our doors feels welcome and at home.",
  },
  {
    name: "Alex Burns",
    title: "Music Director",
    image: "/music-director.png",
    bio: "Alex leads our choir and worship team, bringing a deep love for music to our Sunday services. He knows how to bridge the gap between generations, blending the traditional hymns we grew up with and the contemporary praise songs of today. For Alex, it isn't just about hitting the right notes—it's about preparing the congregation's hearts for the Word each week.",
  },
];

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
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=640&q=80",
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
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background image with slow zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{ animation: "heroZoom 8s ease-out forwards" }}>
            <Image
              src="/hero-worship.webp"
              alt="Worship at Peaceful Rest Baptist Church"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Bottom-up gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,31,58,0.97) 0%, rgba(11,31,58,0.82) 50%, rgba(11,31,58,0.72) 100%)",
          }}
        />

        {/* Centered content */}
        <div
          className="relative z-10 text-center max-w-2xl mx-auto px-6"
          style={{ animation: "fadeInUp 0.7s ease-out 0.3s both" }}
        >
          <p className="text-amber-200 tracking-[0.25em] uppercase text-xs font-semibold mb-4">
            God&apos;s Perfect Peace
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-5">
            You&apos;re welcome here.
          </h1>
          <p className="text-white text-lg mb-10 font-light tracking-wide">
            Sundays at 10:00 AM &bull; Aurora, CO
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#about"
              className="bg-gold text-navy font-bold px-9 py-4 rounded-full text-base hover:bg-gold/80 transition-all duration-300"
            >
              Plan Your Visit
            </a>
            <a
              href="#sermons"
              className="border-2 border-white text-white font-semibold px-9 py-4 rounded-full text-base hover:bg-white hover:text-navy transition-all duration-300"
            >
              Watch a Sermon
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-3">Our Story</p>
            <h2 className="text-navy text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Rooted in Faith.<br />Built for Community.
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Peaceful Rest Baptist Church has been a cornerstone of the Aurora community for over four decades.
              What started as a small congregation of devoted believers has grown into a vibrant family of faith
              committed to worship, service, and love.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Under the leadership of Pastor Charles Survine, we are stepping boldly into the future, welcoming
              new generations while honoring the foundation laid before us.
            </p>
            <a
              href="#leadership"
              className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-7 py-3 rounded-full hover:bg-navy/90 transition-colors"
            >
              Meet the Pastor <ChevronRight size={16} />
            </a>
          </div>
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto">
              <Image
                src="/pastor-charles.webp"
                alt="Pastor Charles Survine"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-navy p-5 rounded-2xl shadow-xl hidden md:block text-center">
              <div className="text-sm font-bold uppercase tracking-wide">Pastor</div>
              <div className="text-lg font-bold leading-tight">Charles Survine</div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-2">Our Shepherds</p>
            <h2 className="text-navy text-4xl font-extrabold tracking-tight">Meet Our Leadership</h2>
            <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
              Guided by faith and called to serve, our pastoral team leads with love and purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {leadership.map((person) => (
              <div key={person.name} className="flex flex-col items-center text-center bg-cream rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative w-full aspect-square overflow-hidden bg-white">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
                    loading="lazy"
                    className="object-contain object-center"
                  />
                </div>
                <div className="p-8">
                  <p className="text-gold-text font-semibold tracking-widest uppercase text-xs mb-1">{person.title}</p>
                  <h3 className="text-navy text-2xl font-bold mb-4">{person.name}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STREAM */}
      <section id="livestream" className="py-24 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-2">Join Us Online</p>
            <h2 className="text-white text-4xl font-extrabold tracking-tight">Watch Live</h2>
            <p className="text-gray-400 text-lg mt-3">
              Every Sunday at 10am — worship with us from anywhere in the world.
            </p>
          </div>

          <LiveStreamFacade />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="https://www.youtube.com/@prbcaurora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-8 py-4 rounded-full hover:bg-gold/80 transition-colors"
            >
              <Youtube size={20} />
              Subscribe on YouTube
            </a>
            <a
              href="#sermons"
              className="inline-flex items-center gap-2 text-white font-semibold underline underline-offset-4 hover:text-gold transition-colors"
            >
              Browse Past Sermons →
            </a>
          </div>
        </div>
      </section>

      {/* SERMONS */}
      <section id="sermons" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-2">The Word</p>
              <h2 className="text-navy text-4xl font-extrabold tracking-tight">Recent Sermons</h2>
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
                aria-label={`Watch "${s.title}" on YouTube (opens in new tab)`}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={s.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-4" aria-hidden="true">
                      <Youtube size={28} className="text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <p className="text-gray-600 text-sm mb-1">{s.dateFormatted}</p>
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
            <h2 className="text-white text-4xl font-extrabold tracking-tight">Find Your Place</h2>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
              There&apos;s a place here for everyone. Find the ministry where you belong.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ministries.map((m) => (
              <div
                key={m.name}
                role="region"
                aria-label={m.name}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{m.name}</h3>
                  <p className="text-gray-300 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-2">What&apos;s Happening</p>
            <h2 className="text-navy text-4xl font-extrabold tracking-tight">Upcoming Events</h2>
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
                  <p className="text-gold-text text-base font-medium mb-1">{e.time}</p>
                  <p className="text-gray-600 text-base">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What time are Sunday services at Peaceful Rest Baptist Church?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sunday School begins at 8:30am and our Worship Service starts at 10am, both in-person and livestreamed online.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where is Peaceful Rest Baptist Church located?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are located at 1195 Lima St, Aurora, CO 80010. You can reach us at (303) 364-4100.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I watch Peaceful Rest Baptist Church services online?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! We stream all services live on YouTube at youtube.com/@prbcaurora. Past sermons are also available there.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who is the pastor of Peaceful Rest Baptist Church?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rev. Chuck Survine is our Senior Pastor. He also serves as 2nd Vice Moderator of the Northern District Baptist Association.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I give or donate to Peaceful Rest Baptist Church?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can give online through Givelify, Venmo (@PRBCAurora), or PayPal. All giving options are available on our website.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What denomination is Peaceful Rest Baptist Church?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are a Baptist church, affiliated with the Northern District Baptist Association.",
                  },
                },
              ],
            }),
          }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-2">Got Questions?</p>
            <h2 className="text-navy text-4xl font-extrabold tracking-tight">We Have Answers</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What time are Sunday services?",
                a: "Sunday School starts at 8:30am and Worship Service begins at 10am — both in-person and livestreamed online.",
              },
              {
                q: "Where are you located?",
                a: "We're at 1195 Lima St, Aurora, CO 80010. Call us at (303) 364-4100.",
              },
              {
                q: "Can I watch services online?",
                a: "Absolutely. Every service streams live on YouTube @prbcaurora — and past sermons are always available there.",
              },
              {
                q: "Who is the pastor?",
                a: "Rev. Chuck Survine is our Senior Pastor, and also serves as 2nd Vice Moderator of the Northern District Baptist Association.",
              },
              {
                q: "How do I give online?",
                a: "You can give through Givelify, Venmo (@PRBCAurora), or PayPal. Find all the links in our Give section.",
              },
              {
                q: "What denomination is Peaceful Rest?",
                a: "We are a Baptist church, affiliated with the Northern District Baptist Association.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group border border-gray-100 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer text-navy font-semibold text-lg select-none list-none hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy transition-colors">
                  {item.q}
                  <span className="text-gold-text text-2xl font-light group-open:rotate-45 transition-transform duration-200 ml-4 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-base leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GIVE */}
      <section id="give" className="py-24 px-6 bg-gold">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-navy text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Give & Make an Impact</h2>
          <p className="text-navy/75 text-lg mb-8">
            Your generosity fuels our ministries, supports our community, and extends the reach of the Gospel.
            Every gift matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.givelify.com/donate/MzEwNzE=/selection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-navy text-white font-bold px-8 py-4 rounded-full text-base hover:bg-navy/90 transition-colors"
            >
              Give via Givelify
            </a>
            <a
              href="https://venmo.com/PRBCAurora"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-navy font-bold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-colors"
            >
              Give via Venmo
            </a>
            <a
              href="https://paypal.me/peacefulrestchurch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-navy text-navy font-bold px-8 py-4 rounded-full text-base hover:bg-navy/10 transition-colors"
            >
              Give via PayPal
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-gold-text font-semibold tracking-widest uppercase text-sm mb-2">We&apos;d Love to Hear from You</p>
            <h2 className="text-navy text-4xl font-extrabold tracking-tight mb-6">Come As You Are</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-navy">Address</p>
                  <p>1195 Lima St, Aurora, CO 80010</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-gold mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-navy">Service Times</p>
                  <p>Sunday School — 8:30am</p>
                  <p>Worship Service — 10am</p>
                  <p>Bible Study — Wednesday evenings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-gold mt-1 flex-shrink-0" aria-hidden="true" />
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
                <label htmlFor="contact-first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="contact-first-name"
                  type="text"
                  required
                  className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-gold outline-none transition-all duration-200"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="contact-last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="contact-last-name"
                  type="text"
                  required
                  className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-gold outline-none transition-all duration-200"
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="contact-email"
                type="email"
                required
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-gold outline-none transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                className="w-full rounded-xl border-0 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-gold outline-none transition-all duration-200 resize-none"
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
          <p className="text-gray-400">
            © {new Date().getFullYear()} Peaceful Rest Baptist Church. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
