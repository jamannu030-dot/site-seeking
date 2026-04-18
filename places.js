const places = {
    churches: [
        {
            name: "All Saints Church (M.I. Road)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "An iconic Anglican church showcasing beautiful colonial-era Gothic architecture.",
            lat: 26.914, lon: 75.808,
            rating: "4.8", reviews: "1500", timings: "08:00 AM - 06:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Centenary Methodist Church (M.I. Road)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A prominent landmark on M.I. road, known for its active community and historic traditions.",
            lat: 26.9135, lon: 75.806,
            rating: "4.7", reviews: "1200", timings: "07:30 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Holy Trinity Church (Chandpole)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Located near the historic city gates, this church serves as a sanctuary in the old city.",
            lat: 26.924, lon: 75.803,
            rating: "4.5", reviews: "550", timings: "08:30 AM - 06:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Mar Thoma Church (Mansarovar)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Serving the Malankara Syrian community in Jaipur with traditional spiritual services.",
            lat: 26.855, lon: 75.765,
            rating: "4.7", reviews: "850", timings: "08:00 AM - 07:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "New Life Fellowship (Malviya Nagar)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A community-focused fellowship garden church known for its modern worship style.",
            lat: 26.848, lon: 75.812,
            rating: "4.7", reviews: "800", timings: "09:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Pentecostal Church (Jawahar Nagar)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A vibrant spiritual center in Jawahar Nagar hosting major community outreach.",
            lat: 26.887, lon: 75.832,
            rating: "4.6", reviews: "700", timings: "08:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sacred Heart Church (Ghat Gate)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A historic Catholic church in the old city, serving as a spiritual landmark.",
            lat: 26.9201, lon: 75.8288,
            rating: "4.6", reviews: "1100", timings: "06:30 AM - 06:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "St. Andrew's Church (C-Scheme)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A stunning Scottish Presbyterian church built with stone and lime.",
            lat: 26.915, lon: 75.8,
            rating: "4.6", reviews: "950", timings: "08:00 AM - 06:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "St. Anselm's Church (Malviya Nagar)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Part of the iconic St. Anselm's educational complex, known for its prayerful hall.",
            lat: 26.852, lon: 75.818,
            rating: "4.8", reviews: "1400", timings: "07:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "St. Xavier's Church (C-Scheme)",
            image: "https://images.unsplash.com/photo-1548625361-2495b6c34bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "The premier Roman Catholic church of Jaipur, featuring classic Roman-style architecture.",
            lat: 26.9115, lon: 75.8037,
            rating: "4.7", reviews: "2200", timings: "07:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        }
    ],
    forgotten: [
        {
            name: "Panna Meena Ka Kund",
            image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Ancient stepwell near Amer Fort famous for symmetrical stairs.",
            lat: 26.9855, lon: 75.8562,
            rating: "4.6", reviews: "4200", timings: "07:00 AM - 06:00 PM", fee: "Free Entry", photography: "Allowed"
        }
    ],
    forts: [
        {
            name: "Amer Fort (Amber Fort)",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
            history: "A UNESCO World Heritage site and the most famous fort in Jaipur, known for its artistic Hindu style elements.",
            lat: 26.9855, lon: 75.8513,
            rating: "4.6", reviews: "118000", timings: "08:00 AM - 09:15 PM", fee: "₹100 (Indians)", photography: "Allowed"
        },
        {
            name: "Jaigarh Fort",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Devisinghpura, Amer, Jaipur, Rajasthan 302001",
            history: "Known as the 'Victory Fort', it houses Jaivana, the world's largest cannon on wheels, and provides a bird's eye view of Amer.",
            lat: 26.9856, lon: 75.8454,
            rating: "4.6", reviews: "32000", timings: "09:00 AM - 04:30 PM", fee: "₹35 (Indians)", photography: "Allowed"
        },
        {
            name: "Nahargarh Fort",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Krishna Nagar, Brahampuri, Jaipur, Rajasthan 302002",
            history: "Built by Maharaja Sawai Jai Singh II in 1734, it once formed a strong defense ring for the city and offers incredible sunset views.",
            lat: 26.9374, lon: 75.8236,
            rating: "4.5", reviews: "65000", timings: "10:00 AM - 05:30 PM", fee: "₹50 (Indians)", photography: "Allowed"
        }
    ],
    gurudwaras: [
        {
            name: "Gurudwara Dashmesh Darbar (Mansarovar)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Serving the Mansarovar community, it is a peaceful retreat with elegant interiors.",
            lat: 26.86, lon: 75.76,
            rating: "4.8", reviews: "3100", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Guru Nanak Darbar (Raja Park)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "The most prominent Gurudwara in Jaipur, serving as the center for Sikh spiritual life.",
            lat: 26.8967, lon: 75.8268,
            rating: "4.9", reviews: "13500", timings: "04:30 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Heera Ghat (Near Jhalana)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Commemorating the visit of Guru Gobind Singh Ji, this site is steeped in spiritual history.",
            lat: 26.9255, lon: 75.8582,
            rating: "4.7", reviews: "2100", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Sanjay Nagar",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A community-focused Gurudwara serving the local transit and residential areas.",
            lat: 26.955, lon: 75.785,
            rating: "4.5", reviews: "600", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Singh Sabha (Pushpa Path)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A beautiful marble Gurudwara in Adarsh Nagar known for its massive community kitchen (Langar).",
            lat: 26.898, lon: 75.822,
            rating: "4.8", reviews: "5200", timings: "05:00 AM - 10:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Sri Guru Singh Sabha (Bani Park)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A serene Gurudwara serving the Bani Park residents with daily Gurbani sessions.",
            lat: 26.928, lon: 75.795,
            rating: "4.6", reviews: "1500", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Sri Guru Singh Sabha (Jawahar Nagar)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Known for its active community service programs and peaceful prayer hall.",
            lat: 26.885, lon: 75.835,
            rating: "4.7", reviews: "1200", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Sri Guru Singh Sabha (Malviya Nagar)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A prominent landmark in Malviya Nagar, hosting major Sikh festivals with fervor.",
            lat: 26.855, lon: 75.815,
            rating: "4.8", reviews: "2800", timings: "04:30 AM - 10:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Sri Guru Singh Sabha (Sanganer)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A historic center for the Sikh community in the Sanganer industrial area.",
            lat: 26.815, lon: 75.78,
            rating: "4.7", reviews: "1800", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Vaishali Nagar",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A modern Gurudwara complex in Vaishali Nagar with a focus on spiritual discourse.",
            lat: 26.905, lon: 75.742,
            rating: "4.7", reviews: "1100", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Gurudwara Vidhyadhar Nagar",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Located in the north of the city, it provides a peaceful sanctuary for daily prayers.",
            lat: 26.965, lon: 75.78,
            rating: "4.6", reviews: "850", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        }
    ],
    jain_temples: [
        {
            name: "Choolgiri Jain Temple",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Prominent mountain-top white marble temple with breathtaking valley views and peaceful surroundings.",
            lat: 26.8837, lon: 75.8767,
            rating: "4.8", reviews: "6500", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "No Flash Allowed"
        },
        {
            name: "Dadawari Shwetambar Jain Mandir",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A peaceful Shwetambar temple complex near Sanganer, known for its serene garden atmosphere.",
            lat: 26.825, lon: 75.795,
            rating: "4.6", reviews: "1500", timings: "06:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Padmaprabhu Digambar Jain Atishaya Kshetra",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Also known as Bara Padampura, this white marble temple is a major pilgrimage site near Jaipur.",
            lat: 26.702, lon: 75.85,
            rating: "4.9", reviews: "12000", timings: "05:30 AM - 09:30 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Sanganer Digambar Jain Mandir (Sanghi Ji)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A 10th-century marvel made of red stone with seven underground floors and ancient sculptures.",
            lat: 26.8174, lon: 75.7876,
            rating: "4.8", reviews: "5200", timings: "06:00 AM - 09:00 PM", fee: "Free Entry", photography: "Strictly Restricted"
        },
        {
            name: "Sri Digambar Jain Mandir, Adarsh Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "An architecturally elegant temple known for its massive community gatherings during Paryushan.",
            lat: 26.895, lon: 75.825,
            rating: "4.8", reviews: "2500", timings: "05:00 AM - 10:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Agrawal Farm",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Serving the Mansarovar SFS area, featuring a peaceful atmosphere and daily pujan.",
            lat: 26.852, lon: 75.772,
            rating: "4.7", reviews: "850", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Ambabari",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A prominent landmark in Ambabari, featuring a grand prayer hall and active community service.",
            lat: 26.945, lon: 75.78,
            rating: "4.7", reviews: "1800", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Bani Park",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A serene temple in Bani Park serving as a quiet sanctuary for daily prayers and meditation.",
            lat: 26.927, lon: 75.795,
            rating: "4.6", reviews: "900", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Durga Pura",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Located near Durga Pura flyover, this temple is a quick spiritual stop for transiting pilgrims.",
            lat: 26.865, lon: 75.798,
            rating: "4.6", reviews: "500", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Jawahar Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Providing a tranquil retreat with regular spiritual workshops and daily pujan.",
            lat: 26.888, lon: 75.835,
            rating: "4.7", reviews: "1100", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Malviya Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Prominent temple in Malviya Nagar featuring a grand gate and serene interior.",
            lat: 26.855, lon: 75.818,
            rating: "4.7", reviews: "1500", timings: "05:30 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Mansarovar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Located at Varun Path, this temple is the largest spiritual center for Jains in Mansarovar.",
            lat: 26.858, lon: 75.762,
            rating: "4.8", reviews: "2200", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Murali",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A historic temple in the old city area with unique wood carvings and marble work.",
            lat: 26.923, lon: 75.825,
            rating: "4.7", reviews: "1200", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Muralipura",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A community-focused temple known for its active participation in Jain social causes.",
            lat: 26.965, lon: 75.765,
            rating: "4.5", reviews: "400", timings: "06:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Patodi",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A historic temple in the old city known for its vibrant murals and intricate wood carvings.",
            lat: 26.92, lon: 75.82,
            rating: "4.7", reviews: "1100", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Pratap Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A newly constructed temple complex serving the growing Pratap Nagar area.",
            lat: 26.785, lon: 75.815,
            rating: "4.6", reviews: "600", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Shastri Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Serving the local community with its simple yet peaceful prayer hall.",
            lat: 26.942, lon: 75.795,
            rating: "4.5", reviews: "750", timings: "06:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Tilak Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A peaceful neighborhood temple serving the spiritual needs of Tilak Nagar residents.",
            lat: 26.885, lon: 75.815,
            rating: "4.6", reviews: "800", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sri Digambar Jain Mandir, Vaishali Nagar",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A modern temple complex featuring beautiful idols and a focus on educational discourses.",
            lat: 26.908, lon: 75.742,
            rating: "4.7", reviews: "1300", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Thikana Digambar Jain Mandir (Old City)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A primary spiritual landmark in the Johari Bazar area, serving the business community for decades.",
            lat: 26.921, lon: 75.823,
            rating: "4.8", reviews: "3100", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        }
    ],
    mosques: [
        {
            name: "Akbari Mosque (Amer)",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Commissioned by Emperor Akbar in the late 16th century, showcasing early Mughal architecture.",
            lat: 26.989, lon: 75.845,
            rating: "4.5", reviews: "1200", timings: "06:00 AM - 06:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Eidgah Masjid (Delhi Road)",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A massive mosque primarily used for Eid prayers, capable of holding thousands of worshipers.",
            lat: 26.938, lon: 75.842,
            rating: "4.7", reviews: "5500", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Jama Masjid, Johari Bazar",
            image: "https://images.unsplash.com/photo-1580462611434-39cde8c29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "The principal congregational mosque of Jaipur, built in white marble and red stone.",
            lat: 26.9208, lon: 75.8242,
            rating: "4.6", reviews: "4200", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Outside Prayer Times"
        },
        {
            name: "Masjid Al-Akhbari",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Notable for its educational programs and community service in the Ghat Gate area.",
            lat: 26.925, lon: 75.83,
            rating: "4.5", reviews: "1100", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Masjid Dargah Hazrat Maulana Ziauddin",
            image: "https://images.unsplash.com/photo-1580462611434-39cde8c29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A spiritual hub comprising a mosque and dargah, attracting visitors for its peaceful atmosphere.",
            lat: 26.91, lon: 75.825,
            rating: "4.8", reviews: "2500", timings: "05:00 AM - 10:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Masjid Jhoomar Wali (Ramganj)",
            image: "https://images.unsplash.com/photo-1580462611434-39cde8c29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Famous for its unique structural design and central location in the old city.",
            lat: 26.921, lon: 75.835,
            rating: "4.4", reviews: "900", timings: "05:30 AM - 09:00 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Masjid Khetri House",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A beautifully preserved mosque within the Khetri House estate, showcasing regal style.",
            lat: 26.928, lon: 75.805,
            rating: "4.6", reviews: "500", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Masjid Shahzada (Ramganj Bazar)",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A historic mosque with intricate stone work located in the heart of Ramganj.",
            lat: 26.92, lon: 75.838,
            rating: "4.4", reviews: "600", timings: "Open 24 Hours", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Masjid Takia Ali Shah",
            image: "https://images.unsplash.com/photo-1580462611434-39cde8c29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A peaceful neighborhood mosque known for its serene environment and charity work.",
            lat: 26.915, lon: 75.818,
            rating: "4.5", reviews: "750", timings: "05:00 AM - 09:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Sanganer Jama Masjid",
            image: "https://images.unsplash.com/photo-1590050720465-b3e3af72eb0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Serving the artistic Sanganer community for generations with traditional Islamic architecture.",
            lat: 26.812, lon: 75.782,
            rating: "4.6", reviews: "1800", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        }
    ],
    palaces: [
        {
            name: "City Palace",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Tulsi Marg, Gangori Bazaar, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
            history: "The residence of the Royal family of Jaipur, showcasing a fusion of Rajput and Mughal architecture.",
            lat: 26.9258, lon: 75.8236,
            rating: "4.5", reviews: "42000", timings: "09:30 AM - 05:00 PM, 07:00 PM - 10:00 PM", fee: "₹200 (Indians)", photography: "Restricted"
        },
        {
            name: "Hawa Mahal",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Kanwar Nagar, Jaipur, Rajasthan 302002",
            history: "Built by Maharaja Sawai Pratap Singh in 1799, its unique honeycomb structure has 953 windows (jharokhas).",
            lat: 26.9239, lon: 75.8267,
            rating: "4.6", reviews: "85000", timings: "09:00 AM - 05:00 PM", fee: "₹50 (Indians)", photography: "Allowed"
        },
        {
            name: "Jal Mahal",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            address: "Amer Rd, Jal Mahal, Amer, Jaipur, Rajasthan 302002",
            history: "A majestic 18th-century palace situated in the middle of Man Sagar Lake, showcasing Rajput style of architecture.",
            lat: 26.9535, lon: 75.8463,
            rating: "4.5", reviews: "52000", timings: "Exterior View Only (24/7)", fee: "Free (Exterior)", photography: "Allowed"
        }
    ],
    temples: [
        {
            name: "Akshardham Temple (Vaishali Nagar)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A modern architectural marvel dedicated to Swami Narayan.",
            lat: 26.908, lon: 75.748,
            rating: "4.6", reviews: "25000", timings: "07:00 AM - 08:15 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Ambikeshwar Mahadev",
            image: "https://images.unsplash.com/photo-1604176354204-92687a419eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "One of the oldest temples in Amer, located below the main ground level.",
            lat: 26.987, lon: 75.852,
            rating: "4.6", reviews: "1500", timings: "06:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Birla Mandir (Lakshmi Narayan)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A stunning white marble temple dedicated to Lord Vishnu and Goddess Lakshmi.",
            lat: 26.8924, lon: 75.8152,
            rating: "4.7", reviews: "45000", timings: "08:00 AM - 09:00 PM", fee: "Free Entry", photography: "In Gardens"
        },
        {
            name: "Charan Mandir",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Believed to bear the footprints of Lord Krishna; located on the way to Nahargarh.",
            lat: 26.945, lon: 75.83,
            rating: "4.4", reviews: "900", timings: "08:00 AM - 06:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Galtaji (Monkey Temple)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Famous for its natural water springs and the large tribe of monkeys.",
            lat: 26.9168, lon: 75.8587,
            rating: "4.6", reviews: "21000", timings: "05:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Ganesh Temple (Sanganer)",
            image: "https://images.unsplash.com/photo-1627915599026-c228d447f5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Unique white stone Ganesh temple famous among the local artisan community.",
            lat: 26.815, lon: 75.785,
            rating: "4.7", reviews: "2100", timings: "06:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Garh Ganesh Temple",
            image: "https://images.unsplash.com/photo-1627915599026-c228d447f5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Devoted to Lord Ganesh in child form, reachable via a scenic hill climb.",
            lat: 26.94, lon: 75.815,
            rating: "4.7", reviews: "8200", timings: "07:30 AM - 08:30 PM", fee: "Free Entry", photography: "Strictly Prohibited"
        },
        {
            name: "Govind Dev Ji Temple",
            image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "The principal Krishna temple of Jaipur, located within the City Palace complex.",
            lat: 26.9298, lon: 75.8242,
            rating: "4.8", reviews: "28400", timings: "04:30 AM - 09:30 PM", fee: "Free Entry", photography: "Prohibited"
        },
        {
            name: "Hanuman Mandir (Chandpole)",
            image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "One of the oldest Hanuman temples at the city gates, protecting the old city.",
            lat: 26.923, lon: 75.805,
            rating: "4.7", reviews: "4500", timings: "05:00 AM - 10:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "ISKCON Temple Jaipur",
            image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Dedicated to Lord Krishna, known for its spiritual vibes and beautiful deity forms.",
            lat: 26.845, lon: 75.76,
            rating: "4.9", reviews: "18500", timings: "04:30 AM - 08:30 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Jagat Shiromani Temple, Amer",
            image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Built by Queen Kanakawati, it features exquisite carvings and is dedicated to Lord Krishna.",
            lat: 26.988, lon: 75.85,
            rating: "4.7", reviews: "3800", timings: "06:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Kale Hanuman Ji Temple",
            image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Unique temple where the idol of Lord Hanuman is painted in black color.",
            lat: 26.924, lon: 75.827,
            rating: "4.7", reviews: "3200", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Not Allowed"
        },
        {
            name: "Kalki Temple",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "One of the few temples in the world dedicated to the future avatar of Lord Vishnu.",
            lat: 26.925, lon: 75.828,
            rating: "4.5", reviews: "800", timings: "06:00 AM - 06:00 PM", fee: "Free Entry", photography: "Not Allowed"
        },
        {
            name: "Khole Ke Hanuman Ji",
            image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Famous hill-top temple known for large community feasts.",
            lat: 26.9416, lon: 75.8647,
            rating: "4.8", reviews: "15600", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Moti Dungri Ganesh Temple",
            image: "https://images.unsplash.com/photo-1627915599026-c228d447f5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Historic temple dedicated to Lord Ganesha, built in 1761.",
            lat: 26.8931, lon: 75.8169,
            rating: "4.8", reviews: "22000", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Prohibited"
        },
        {
            name: "Padmavati Temple",
            image: "https://images.unsplash.com/photo-1604176354204-92687a419eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Dedicated to Goddess Padmavati, known for its colorful glass work and murals.",
            lat: 26.89, lon: 75.81,
            rating: "4.5", reviews: "650", timings: "07:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Pataleshwar Mahadev",
            image: "https://images.unsplash.com/photo-1604176354204-92687a419eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "11th-century underground Shiva temple discovered during excavations.",
            lat: 26.92, lon: 75.825,
            rating: "4.7", reviews: "1100", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Radha Madhav Ji Temple",
            image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Ancient temple of Lord Krishna located within the Kanak Vrindavan garden.",
            lat: 26.958, lon: 75.85,
            rating: "4.6", reviews: "12500", timings: "08:00 AM - 07:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Santoshi Mata Temple",
            image: "https://images.unsplash.com/photo-1627915599026-c228d447f5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Revered temple for the local community, especially popular on Fridays.",
            lat: 26.88, lon: 75.8,
            rating: "4.6", reviews: "1100", timings: "06:00 AM - 09:00 PM", fee: "Free Entry", photography: "Restricted"
        },
        {
            name: "Shila Devi Temple (Amer Fort)",
            image: "https://images.unsplash.com/photo-1590424753062-32517f354a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "The family deity of the Kachwaha clan, located inside the Amer Fort complex.",
            lat: 26.9855, lon: 75.851,
            rating: "4.7", reviews: "12000", timings: "06:00 AM - 12:00 PM, 04:00 PM - 08:00 PM", fee: "Free (Fort fee required)", photography: "Prohibited"
        },
        {
            name: "Shri Sitaram Ji Temple",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A beautiful Rama temple in Choti Chopad with historic marble pillars.",
            lat: 26.919, lon: 75.821,
            rating: "4.6", reviews: "1300", timings: "06:00 AM - 08:30 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Surya Mandir (Sun Temple)",
            image: "https://images.unsplash.com/photo-1584346946654-20d43ac0eb91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "Offers the best sunset view of Jaipur from the Aravalli hills.",
            lat: 26.9175, lon: 75.859,
            rating: "4.6", reviews: "2800", timings: "05:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed"
        },
        {
            name: "Swaminarayan Mandir (Mansarovar)",
            image: "https://images.unsplash.com/photo-1576485290814-1c72f4007325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A grand temple complex with detailed stone carvings and serene atmosphere.",
            lat: 26.85, lon: 75.75,
            rating: "4.8", reviews: "8200", timings: "07:00 AM - 08:00 PM", fee: "Free Entry", photography: "Allowed in exterior"
        },
        {
            name: "Tarkeshwar Mahadev",
            image: "https://images.unsplash.com/photo-1604176354204-92687a419eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            history: "A revered Shiva temple in the heart of old Jaipur city.",
            lat: 26.9189, lon: 75.8203,
            rating: "4.7", reviews: "8200", timings: "05:00 AM - 09:00 PM", fee: "Free Entry", photography: "Not Allowed"
        }
    ]
};

// Merge dynamically added places from admin panel
const customPlacesStr = localStorage.getItem('siteSeeking_custom_places');
if (customPlacesStr) {
    try {
        const customPlaces = JSON.parse(customPlacesStr);
        for (let category in customPlaces) {
            if (!places[category]) places[category] = [];
            // Admin places appear first
            places[category] = [...customPlaces[category], ...places[category]];
        }
    } catch(e) {}
}