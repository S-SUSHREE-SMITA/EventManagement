import b1 from "../Images/b1.jpg";
import b2 from "../Images/b2.jpg";
import Birth from "../Images/Birth.jpg";
import c1 from "../Images/c1.jpg";
import c2 from "../Images/c2.jpg";
import cat1 from "../Images/cat1.jpg";
import cat2 from "../Images/cat2.jpg";
import Catring from "../Images/Catring.jpg";
import cl1 from "../Images/cl1.jpg";
import clg from "../Images/clg.webp";
import Corporate from "../Images/Corporate.jpg";
import m1 from "../Images/m1.jpg";
import Music from "../Images/Music.jpg";
import ph1 from "../Images/ph1.jpg";
import photography from "../Images/photography.jpg";
import so1 from "../Images/so1.jpg";
import sound from "../Images/sound.jpg";
import st1 from "../Images/st1.jpg";
import stage from "../Images/stage.webp";
import w1 from "../Images/w1.jpg";
import w2 from "../Images/w2.jpg";
import w3 from "../Images/w3.jpg";
import w4 from "../Images/w4.jpg";
import Wed from "../Images/Wed.jpg";

export const servicesData = [
  {
    id: "wedding",
    slug: "wedding-planning",
    title: "Wedding Planning",
    image: Wed,
    description: "Create the wedding of your dreams with our expert planners.",
    fullDescription: "Our wedding planning service covers everything from venue selection to last-minute touches. We coordinate with all vendors, manage timelines, and ensure your special day is flawless and memorable.",
    venues: [
      { id: "w1", name: "The Grand Palace", location: "Bhubaneswar, Odisha", capacity: 1000, price: 550000, image: w1, amenities: ["Catering", "Decoration", "DJ", "Photography", "Valet Parking"] },
      { id: "w2", name: "Royal Gardens", location: "Puri, Odisha", capacity: 500, price: 400000, image: w2, amenities: ["Outdoor Lawn", "Catering", "Decoration", "Music"] },
      { id: "w3", name: "Lakeside Retreat", location: "Cuttack, Odisha", capacity: 700, price: 350000, image: w3, amenities: ["Scenic View", "Catering", "Floral Decoration", "Parking"] },
      { id: "w4", name: "Heritage Haveli", location: "Rourkela, Odisha", capacity: 400, price: 300000, image: w4, amenities: ["Heritage Architecture", "Catering", "Royal Decoration", "AC Halls"] },
    ]
  },
  {
    id: "birthday",
    slug: "birthday-party",
    title: "Birthday Party",
    image: Birth,
    description: "Make every birthday an unforgettable celebration.",
    fullDescription: "From kids parties to milestone adult birthdays, we create magical celebrations. Custom themes, cakes, entertainment and decorations tailored to your personality.",
    venues: [
      { id: "b1", name: "Fun Zone Arena", location: "Bhubaneswar, Odisha", capacity: 100, price: 25000, image: b1, amenities: ["Kids Zone", "Catering", "DJ", "Theme Decoration", "Games"] },
      { id: "b2", name: "The Party Hub", location: "Puri, Odisha", capacity: 80, price: 18000, image: b2, amenities: ["Indoor Hall", "Catering", "Custom Cake", "Balloon Decor"] },
      { id: "b3", name: "Celebration Central", location: "Cuttack, Odisha", capacity: 150, price: 35000, image: Birth, amenities: ["Photo Booth", "Catering", "Live Music", "Decoration"] },
    ]
  },
  {
    id: "corporate",
    slug: "corporate-events",
    title: "Corporate Events",
    image: Corporate,
    description: "Professional corporate events that impress and inspire.",
    fullDescription: "We organize conferences, seminars, product launches, team outings and award ceremonies with complete AV support, catering and logistics management.",
    venues: [
      { id: "c1", name: "Business Convention Center", location: "Bhubaneswar, Odisha", capacity: 600, price: 300000, image: c1, amenities: ["AV Equipment", "High-Speed WiFi", "Catering", "Multiple Halls", "Valet"] },
      { id: "c2", name: "Executive Suites", location: "Cuttack, Odisha", capacity: 200, price: 100000, image: c2, amenities: ["Boardroom", "Projector", "Catering", "Recording"] },
      { id: "c3", name: "Tech Park Auditorium", location: "Bhubaneswar, Odisha", capacity: 400, price: 250000, image: Corporate, amenities: ["LED Screen", "Stage", "Full AV", "Catering", "Parking"] },
    ]
  },
  {
    id: "concert",
    slug: "music-concerts",
    title: "Music Concerts",
    image: Music,
    description: "Epic concerts and live music events perfectly orchestrated.",
    fullDescription: "From intimate acoustic sessions to large-scale concerts, we handle stage setup, sound engineering, lighting, security, ticketing and artist management.",
    venues: [
      { id: "m1", name: "Open Air Amphitheatre", location: "Bhubaneswar, Odisha", capacity: 2000, price: 750000, image: m1, amenities: ["Professional Stage", "Sound System", "Lighting Rig", "Backstage", "Security"] },
      { id: "Music", name: "Indoor Music Hall", location: "Puri, Odisha", capacity: 800, price: 180000, image: Music, amenities: ["AC Hall", "Pro Sound", "Stage Lights", "Green Room"] },
    ]
  },
  {
    id: "catering",
    slug: "catering-services",
    title: "Catering Services",
    image: Catring,
    description: "Exquisite cuisine for every occasion and taste.",
    fullDescription: "Our culinary team offers multi-cuisine menus customized to your preferences. From traditional Odia thalis to continental buffets, we deliver exceptional dining experiences.",
    venues: [
      { id: "ca1", name: "Royal Kitchen Services", location: "Bhubaneswar, Odisha", capacity: 1000, price: 100000, image: Catring, amenities: ["Multi-Cuisine", "Live Counters", "Dessert Station", "Professional Staff"] },
      { id: "ca2", name: "Spice Garden Caterers", location: "All Odisha", capacity: 500, price: 50000, image: cat1, amenities: ["Traditional & Continental", "Custom Menu", "Equipment Setup"] },
      { id: "ca3", name: "Gourmet Express", location: "Cuttack, Odisha", capacity: 300, price: 30000, image: cat2, amenities: ["Buffet Setup", "Themed Cuisine", "Professional Service"] },
    ]
  },
  {
    id: "photography",
    slug: "photography-videography",
    title: "Photography & Videography",
    image: photography,
    description: "Capture every precious moment with artistic brilliance.",
    fullDescription: "Our professional photographers and videographers capture your events in stunning detail. We offer candid, portrait, drone photography, and cinematic video packages.",
    venues: [
      { id: "p1", name: "CineCraft Studios", location: "Bhubaneswar, Odisha", capacity: 3, price: 35000, image: ph1, amenities: ["HD Cameras", "Drone", "Editing Suite", "Album Design", "Cinematic Film"] },
      { id: "p2", name: "Pixel Perfect Crew", location: "All Odisha", capacity: 3, price: 20000, image: photography, amenities: ["DSLR Photography", "Video Coverage", "Online Gallery"] },
    ]
  },
  {
    id: "comedy",
    slug: "Standup-comedy",
    title: "Stand-up Comedy",
    image: stage,
    description: "Transform any space into a breathtaking visual masterpiece.",
    fullDescription: "Our creative decorators design stunning venues with floral arrangements, themed setups, lighting, drapery and customized stage designs that wow your guests.",
    venues: [
      { id: "d1", name: "Floral Fantasy Decors", location: "Bhubaneswar, Odisha", capacity: 500, price: 40000, image: stage, amenities: ["comedy Arrangements", "LED Lights", "Custom Stage"] },
      { id: "d2", name: "Dream Décor Co.", location: "All Odisha", capacity: 1000, price: 25000, image: st1, amenities: ["Theme Decoration", "Entrance Arch", "Table Setup"] },
    ]
  },
  // {
  //   id: "sound",
  //   slug: "sound-lighting",
  //   title: "Sound & Lighting",
  //   image: sound,
  //   description: "Professional AV equipment for an electrifying atmosphere.",
  //   fullDescription: "We provide professional sound systems, DJ equipment, LED walls, laser lighting and pyrotechnics to create the perfect ambiance for your event.",
  //   venues: [
  //     { id: "s1", name: "ProSound Events", location: "Bhubaneswar, Odisha", capacity: 1, price: 45000, image: so1, amenities: ["Line Array System", "LED Wall", "Laser Lights", "DJ Setup", "Technician"] },
  //     { id: "s2", name: "BeatBox Productions", location: "All Odisha", capacity: 1, price: 28000, image: sound, amenities: ["PA System", "Moving Heads", "Fog Machine", "DJ Console"] },
  //   ]
  // },
  {
    id: "college",
    slug: "college-events",
    title: "College Events",
    image: clg,
    description: "Epic fests, cultural nights and farewell parties for colleges.",
    fullDescription: "We specialize in organizing college fests, cultural programs, farewells, fresher's parties and alumni meets with complete event management support.",
    venues: [
      { id: "co1", name: "Campus Events Pavilion", location: "Bhubaneswar, Odisha", capacity: 800, price: 60000, image: cl1, amenities: ["Open Ground", "Stage", "Sound System", "Catering", "Security"] },
      { id: "co2", name: "Fest Arena", location: "Cuttack, Odisha", capacity: 500, price: 45000, image: clg, amenities: ["Indoor Hall", "AV Equipment", "Catering", "Photo Booth"] },
    ]
  },
];