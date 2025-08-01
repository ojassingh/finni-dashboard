export const statePointData = {
    ca: [
      [34.0522, -118.2437], // Los Angeles
      [37.7749, -122.4194], // San Francisco
      [32.7157, -117.1611], // San Diego
      [36.1699, -115.1398], // Las Vegas (just outside CA, omit)
      [38.5816, -121.4944], // Sacramento
      [33.6846, -117.8265], // Anaheim
      [37.3382, -121.8863], // San Jose
      [34.4208, -119.6982], // Santa Barbara
      [35.3733, -119.0187], // Bakersfield
      [39.5296, -119.8138], // Reno (omit, NV)
      [36.7378, -119.7871], // Fresno
      [33.9533, -118.3965], // Palmdale
      [37.7749, -121.3110], // Modesto (adjusted)
      [34.1478, -118.1445], // Pasadena
      [35.2828, -120.6596], // San Luis Obispo
    ],
    tx: [
      [29.7604, -95.3698], // Houston
      [32.7767, -96.7970], // Dallas
      [29.4241, -98.4936], // San Antonio
      [30.2672, -97.7431], // Austin
      [31.5513, -97.1467], // Waco
      [33.7681, -96.8067], // Garland (Dallas metro)
      [30.2672, -97.7431], // duplicate of Austin – remove
      [31.9686, -102.3488], // Midland
      [27.8006, -97.3964], // Corpus Christi
      [30.2669, -98.7370], // Fredericksburg (Hill Country)
      [32.7357, -97.1081], // Arlington
      [28.5392, -96.6297], // Lake Jackson
      [31.7619, -106.4850], // El Paso
      [26.1476, -97.6658], // Brownsville
      [35.2226, -101.8313], // Amarillo
    ],
    ny: [
      [40.7128, -74.0060],  // New York City
      [42.6526, -73.7562],  // Albany
      [43.0481, -76.1474],  // Syracuse
      [42.8864, -78.8784],  // Buffalo
      [43.1610, -77.6109],  // Rochester
      [41.0854, -73.8581],  // Danbury CT (omit, not NY)
      [42.1023, -75.9108],  // Binghamton
      [44.9778, -74.2083],  // Plattsburgh
      [42.3601, -73.9826],  // Berkshire County MA (omit)
      [43.0848, -74.8021],  // Long Lake
      [41.7004, -74.0760],  // Middletown
      [44.0000, -75.5000],  // Downsville
    ],
    fl: [
      [25.7617, -80.1918],  // Miami
      [27.9506, -82.4572],  // Tampa
      [30.3322, -81.6557],  // Jacksonville
      [28.5383, -81.3792],  // Orlando
      [26.7153, -80.0534],  // Fort Lauderdale
      [27.3349, -82.5307],  // Bradenton
      [30.4383, -84.2807],  // Tallahassee
      [29.6516, -82.3248],  // Gainesville
      [26.1224, -80.1373],  // Hollywood
      [28.0328, -80.6077],  // Titusville
      [29.1872, -81.0216],  // Palatka
      [25.7617, -80.1918],  // duplicate of Miami – remove
    ],
    il: [
      [41.8781, -87.6298],  // Chicago
      [39.7817, -89.6501],  // Springfield
      [41.5022, -88.0901],  // Aurora
      [40.6331, -89.3985],  // Peoria
      [42.2529, -89.0932],  // Rockford
      [38.6206, -89.9885],  // East St. Louis
      [40.1164, -88.2434],  // Champaign
      [41.2667, -90.5695],  // Moline
      [37.7190, -89.2168],  // Harrisburg
      [40.6331, -88.6520],  // Bloomington
    ],
  } as const;