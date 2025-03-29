
export interface Concert {
  id: string;
  name: string;
  artist: string;
  date: string;
  venue: string;
  location: string;
  description: string;
  imageUrl: string;
  bannerUrl: string;
  featured: boolean;
  price: {
    regular: number;
    vip: number;
    platinum: number;
  };
  category: string;
  tags: string[];
}

export const concerts: Concert[] = [
  {
    id: "c1",
    name: "Coldplay: Music of the Spheres World Tour",
    artist: "Coldplay",
    date: "2023-11-15T19:30:00",
    venue: "Gelora Bung Karno Stadium",
    location: "Jakarta, Indonesia",
    description: "Join Coldplay for their spectacular Music of the Spheres World Tour. Experience an unforgettable night of music, lights, and incredible performances.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/653e5d5ec4d38_1698591070.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/653e5dc5f0bb3_1698591173.webp",
    featured: true,
    price: {
      regular: 1500000,
      vip: 3000000,
      platinum: 5000000
    },
    category: "Pop",
    tags: ["international", "stadium", "band"]
  },
  {
    id: "c2",
    name: "Blackpink World Tour: Born Pink",
    artist: "Blackpink",
    date: "2023-12-02T18:00:00",
    venue: "Indonesia Convention Exhibition",
    location: "Tangerang, Indonesia",
    description: "The phenomenal K-pop girl group Blackpink is coming to Indonesia for their Born Pink World Tour. Don't miss this chance to see Jisoo, Jennie, Rosé, and Lisa live!",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/6317d63d5f81a_1662538301.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/6317d763a2f0f_1662538595.webp",
    featured: true,
    price: {
      regular: 1800000,
      vip: 3500000,
      platinum: 5500000
    },
    category: "K-pop",
    tags: ["international", "girl group", "dance"]
  },
  {
    id: "c3",
    name: "Westlife: The Wild Dreams Tour",
    artist: "Westlife",
    date: "2023-10-30T19:00:00",
    venue: "Sentul International Convention Center",
    location: "Bogor, Indonesia",
    description: "Westlife returns to Indonesia with their Wild Dreams Tour. Sing along to their greatest hits and new songs from their latest album.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/63dbbbfaed9a1_1675347962.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/63dbbc4c96cb2_1675348044.webp",
    featured: false,
    price: {
      regular: 1200000,
      vip: 2500000,
      platinum: 4000000
    },
    category: "Pop",
    tags: ["international", "boyband", "90s"]
  },
  {
    id: "c4",
    name: "Justin Bieber Justice World Tour",
    artist: "Justin Bieber",
    date: "2023-11-25T20:00:00",
    venue: "Madya Stadium",
    location: "Jakarta, Indonesia",
    description: "Justin Bieber is bringing his Justice World Tour to Jakarta. Be ready for an electrifying performance featuring his biggest hits and new tracks.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/62429efc2a39e_1648555772.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/62429f3c79cdc_1648555836.webp",
    featured: true,
    price: {
      regular: 1700000,
      vip: 3200000,
      platinum: 5200000
    },
    category: "Pop",
    tags: ["international", "solo", "dance"]
  },
  {
    id: "c5",
    name: "Tulus Tur Manusia",
    artist: "Tulus",
    date: "2023-10-22T19:00:00",
    venue: "Beach City International Stadium",
    location: "Ancol, Jakarta",
    description: "Indonesian singer-songwriter Tulus presents his Manusia Tour, promoting his latest album. Experience his soulful voice and heartfelt lyrics live.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/62d8fb8f69aff_1658394511.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/62d8fbbc96e26_1658394556.webp",
    featured: false,
    price: {
      regular: 500000,
      vip: 1000000,
      platinum: 1500000
    },
    category: "Pop",
    tags: ["local", "solo", "singer-songwriter"]
  },
  {
    id: "c6",
    name: "Ed Sheeran: Mathematics Tour",
    artist: "Ed Sheeran",
    date: "2023-12-15T19:30:00",
    venue: "Gelora Bung Karno Stadium",
    location: "Jakarta, Indonesia",
    description: "Ed Sheeran brings his Mathematics Tour to Jakarta. Watch him perform solo with just his guitar and loop pedal, creating an intimate yet stadium-filling experience.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/644b66d9d978c_1682666201.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/644b672e42ba2_1682666286.webp",
    featured: true,
    price: {
      regular: 1600000,
      vip: 3100000,
      platinum: 4800000
    },
    category: "Pop",
    tags: ["international", "solo", "acoustic"]
  },
  {
    id: "c7",
    name: "NCT 127 2nd Tour: Neo City",
    artist: "NCT 127",
    date: "2023-11-04T18:30:00",
    venue: "Indonesia Convention Exhibition",
    location: "Tangerang, Indonesia",
    description: "K-pop sensation NCT 127 returns to Indonesia with their Neo City Tour. Enjoy their powerful performances and unique music style.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/639ae0a64f0fa_1671091366.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/639ae0f5ddb4d_1671091445.webp",
    featured: false,
    price: {
      regular: 1400000,
      vip: 2800000,
      platinum: 4200000
    },
    category: "K-pop",
    tags: ["international", "boy group", "dance"]
  },
  {
    id: "c8",
    name: "Sheila On 7: Tunggu Aku Di Jakarta",
    artist: "Sheila On 7",
    date: "2023-10-28T19:00:00",
    venue: "Istora Senayan",
    location: "Jakarta, Indonesia",
    description: "Iconic Indonesian band Sheila On 7 presents their special concert 'Tunggu Aku Di Jakarta'. Sing along to their timeless hits spanning over two decades.",
    imageUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/626f8a91d1b7a_1651398289.webp",
    bannerUrl: "https://assets.loket.com/lp/prd/optimized/lp01-prd-images/images/promotion-images/626f8ac5d2fb4_1651398341.webp",
    featured: false,
    price: {
      regular: 400000,
      vip: 800000,
      platinum: 1200000
    },
    category: "Rock",
    tags: ["local", "band", "nostalgia"]
  }
];

export const getUpcomingConcerts = () => {
  return concerts.filter(concert => new Date(concert.date) > new Date());
};

export const getFeaturedConcerts = () => {
  return concerts.filter(concert => concert.featured);
};

export const getConcertById = (id: string) => {
  return concerts.find(concert => concert.id === id);
};

export const searchConcerts = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  return concerts.filter(concert => 
    concert.name.toLowerCase().includes(lowerCaseQuery) ||
    concert.artist.toLowerCase().includes(lowerCaseQuery) ||
    concert.venue.toLowerCase().includes(lowerCaseQuery) ||
    concert.location.toLowerCase().includes(lowerCaseQuery) ||
    concert.category.toLowerCase().includes(lowerCaseQuery) ||
    concert.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

export const getConcertsByCategory = (category: string) => {
  return concerts.filter(concert => 
    concert.category.toLowerCase() === category.toLowerCase()
  );
};
