export const CATEGORIES = ['All', 'Coastal', 'Alpine', 'Cultural', 'Metros'];

export const DESTINATIONS = [
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    category: 'Metros',
    tagline: 'Neon Metropolis Meets Ancient Tradition',
    description: 'A sensory-rich capital blending ultra-modern skyscrapers with historic Shinto shrines and world-renowned gastronomy.',
    latitude: 35.6762,
    longitude: 139.6503,
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    bestTimeToVisit: 'Mar - May & Oct - Nov',
    idealDays: 4,
    places: [
      {
        name: 'Senso-ji Temple',
        type: 'Historic Shrine',
        image: 'https://images.unsplash.com/photo-1583483425010-c566431a7710?q=80&w=600&auto=format&fit=crop',
        description: 'Tokyo’s oldest Buddhist temple founded in 645 AD in Asakusa.'
      },
      {
        name: 'Shibuya Crossing',
        type: 'Urban Icon',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop',
        description: 'The world’s busiest pedestrian intersection with dazzling neon.'
      },
      {
        name: 'Meiji Jingu',
        type: 'Forest Sanctuary',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop',
        description: 'A serene evergreen forest dedicated to Emperor Meiji.'
      }
    ]
  },
  {
    id: 'amalfi-italy',
    name: 'Amalfi Coast',
    country: 'Italy',
    category: 'Coastal',
    tagline: 'Sun-Drenched Cliffs & Azure Waters',
    description: 'A dramatic Mediterranean coastline adorned with pastel cliffside villas, lemon orchards, and timeless Italian coastal culture.',
    latitude: 40.6340,
    longitude: 14.6027,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    bestTimeToVisit: 'May - Sep',
    idealDays: 3,
    places: [
      {
        name: 'Positano Village',
        type: 'Cliffside Architecture',
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop',
        description: 'Cascading peach and terracotta houses facing the sea.'
      },
      {
        name: 'Villa Rufolo',
        type: 'Historic Garden',
        image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=600&auto=format&fit=crop',
        description: '13th-century cloisters with panoramic bay vistas in Ravello.'
      },
      {
        name: 'Emerald Grotto',
        type: 'Natural Wonder',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
        description: 'Sunlit sea cave glowing in vivid turquoise tones.'
      }
    ]
  },
  {
    id: 'zermatt-switzerland',
    name: 'Zermatt',
    country: 'Switzerland',
    category: 'Alpine',
    tagline: 'Pyramidal Peaks & Alpine Splendor',
    description: 'A car-free alpine haven sitting beneath the dramatic silhouette of the Matterhorn, offering pristine trails and winter sports.',
    latitude: 45.9765,
    longitude: 7.7491,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    bestTimeToVisit: 'Jun - Sep & Dec - Mar',
    idealDays: 3,
    places: [
      {
        name: 'The Matterhorn',
        type: 'Iconic Peak',
        image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600&auto=format&fit=crop',
        description: 'One of the most recognizable mountain peaks in the world.'
      },
      {
        name: 'Gornergrat Railway',
        type: 'Scenic Train',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
        description: 'High-altitude cogwheel railway offering 360-degree glacier panoramas.'
      },
      {
        name: 'Riffelsee Lake',
        type: 'Mirror Lake',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
        description: 'Crystal-clear alpine lake reflecting the Matterhorn summit.'
      }
    ]
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    category: 'Cultural',
    tagline: 'Spiritual Temples & Bamboo Groves',
    description: 'The cultural soul of Japan with thousands of classical Buddhist temples, traditional machiya houses, and Zen rock gardens.',
    latitude: 35.0116,
    longitude: 135.7681,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    rating: 4.9,
    bestTimeToVisit: 'Mar - May & Oct - Nov',
    idealDays: 3,
    places: [
      {
        name: 'Fushimi Inari-taisha',
        type: 'Torii Sanctuary',
        image: 'https://images.unsplash.com/photo-1478436127897-769e00d2c715?q=80&w=600&auto=format&fit=crop',
        description: 'Thousands of vermilion torii gates winding through sacred forest.'
      },
      {
        name: 'Arashiyama Bamboo Grove',
        type: 'Nature Walk',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop',
        description: 'Towering stalks of green bamboo swaying rhythmically in the wind.'
      },
      {
        name: 'Kinkaku-ji (Golden Pavilion)',
        type: 'Zen Temple',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600&auto=format&fit=crop',
        description: 'A two-story pavilion gilded in pure gold leaf resting over a serene pond.'
      }
    ]
  },
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    category: 'Cultural',
    tagline: 'Architecture, Art & Timeless Boulevards',
    description: 'The City of Light, celebrated for its haute cuisine, iconic iron landmarks, and world-class collections at the Louvre and Musée d’Orsay.',
    latitude: 48.8566,
    longitude: 2.3522,
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    rating: 4.7,
    bestTimeToVisit: 'Jun - Aug & Sep - Oct',
    idealDays: 4,
    places: [
      {
        name: 'Eiffel Tower',
        type: 'Architectural Monument',
        image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=600&auto=format&fit=crop',
        description: 'Wrought-iron lattice tower on the Champ de Mars.'
      },
      {
        name: 'Louvre Museum',
        type: 'Art Sanctuary',
        image: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=600&auto=format&fit=crop',
        description: 'Former royal palace housing humanity’s greatest masterpieces.'
      },
      {
        name: 'Montmartre & Sacré-Cœur',
        type: 'Bohemian Quarter',
        image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?q=80&w=600&auto=format&fit=crop',
        description: 'Hilltop artist district crowned by the white domes of Sacré-Cœur.'
      }
    ]
  },
  {
    id: 'reykjavik-iceland',
    name: 'Reykjavik',
    country: 'Iceland',
    category: 'Alpine',
    tagline: 'Geothermal Waters & Northern Lights',
    description: 'The world’s northernmost capital, framed by geothermal hot springs, volcanic landscapes, and aurora-filled night skies.',
    latitude: 64.1466,
    longitude: -21.9426,
    heroImage: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop',
    rating: 4.8,
    bestTimeToVisit: 'Sep - Mar (Auroras) & Jun - Aug',
    idealDays: 3,
    places: [
      {
        name: 'Blue Lagoon',
        type: 'Geothermal Spa',
        image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=600&auto=format&fit=crop',
        description: 'Mineral-rich milky blue water in a black lava field.'
      },
      {
        name: 'Hallgrimskirkja',
        type: 'Basalt Cathedral',
        image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop',
        description: 'Towering church inspired by Iceland’s volcanic basalt columns.'
      },
      {
        name: 'Golden Circle Route',
        type: 'Scenic Circuit',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop',
        description: 'Geysers, roaring Gullfoss waterfalls, and tectonic rifts.'
      }
    ]
  }
];