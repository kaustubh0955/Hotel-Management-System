(function seedData() {
  const defaults = {
    rooms: [
      {
            "roomNo": "GOA-DLX-216",
            "type": "Deluxe",
            "name": "Deluxe Ocean Room",
            "status": "available",
            "price": 13900,
            "branch": "Goa Seaside Lumi",
            "floor": "2nd Floor",
            "capacity": 2,
            "view": "Ocean",
            "freeCancel": true,
            "amenities": [
                  "Balcony",
                  "Breakfast",
                  "Rain Shower"
            ]
      },
      {
            "roomNo": "GOA-CLB-311",
            "type": "Club",
            "name": "Club Horizon Room",
            "status": "available",
            "price": 18200,
            "branch": "Goa Seaside Lumi",
            "floor": "3rd Floor",
            "capacity": 3,
            "view": "Ocean",
            "freeCancel": true,
            "amenities": [
                  "Club Access",
                  "Breakfast",
                  "Sea View"
            ]
      },
      {
            "roomNo": "GOA-STE-510",
            "type": "Suite",
            "name": "Seafront Signature Suite",
            "status": "available",
            "price": 25400,
            "branch": "Goa Seaside Lumi",
            "floor": "5th Floor",
            "capacity": 3,
            "view": "Ocean",
            "freeCancel": false,
            "amenities": [
                  "Living Area",
                  "Butler Call",
                  "Tub"
            ]
      },
      {
            "roomNo": "MUM-STE-905",
            "type": "Suite",
            "name": "Royal Skyline Suite",
            "status": "occupied",
            "price": 26500,
            "branch": "Mumbai Grand Marina",
            "floor": "9th Floor",
            "capacity": 2,
            "view": "Skyline",
            "freeCancel": false,
            "amenities": [
                  "Sky Bar Access",
                  "Bathtub",
                  "Work Lounge"
            ]
      },
      {
            "roomNo": "MUM-DLX-602",
            "type": "Deluxe",
            "name": "Marina Deluxe King",
            "status": "available",
            "price": 17600,
            "branch": "Mumbai Grand Marina",
            "floor": "6th Floor",
            "capacity": 2,
            "view": "Skyline",
            "freeCancel": true,
            "amenities": [
                  "Breakfast",
                  "Workspace",
                  "Smart TV"
            ]
      },
      {
            "roomNo": "MUM-CLB-1201",
            "type": "Club",
            "name": "Club Marina Residence",
            "status": "available",
            "price": 22800,
            "branch": "Mumbai Grand Marina",
            "floor": "12th Floor",
            "capacity": 3,
            "view": "Skyline",
            "freeCancel": true,
            "amenities": [
                  "Club Lounge",
                  "Cocktail Hour",
                  "Valet"
            ]
      },
      {
            "roomNo": "DEL-CLB-708",
            "type": "Club",
            "name": "Club Lounge Residence",
            "status": "maintenance",
            "price": 19500,
            "branch": "Delhi Imperial Heights",
            "floor": "7th Floor",
            "capacity": 2,
            "view": "Skyline",
            "freeCancel": true,
            "amenities": [
                  "Lounge Access",
                  "Tea Service",
                  "Workspace"
            ]
      },
      {
            "roomNo": "DEL-DLX-318",
            "type": "Deluxe",
            "name": "Imperial Deluxe Room",
            "status": "available",
            "price": 16800,
            "branch": "Delhi Imperial Heights",
            "floor": "3rd Floor",
            "capacity": 2,
            "view": "Garden",
            "freeCancel": true,
            "amenities": [
                  "Breakfast",
                  "Garden Outlook",
                  "Smart Controls"
            ]
      },
      {
            "roomNo": "DEL-STE-812",
            "type": "Suite",
            "name": "Imperial Grand Suite",
            "status": "available",
            "price": 28600,
            "branch": "Delhi Imperial Heights",
            "floor": "8th Floor",
            "capacity": 4,
            "view": "Skyline",
            "freeCancel": false,
            "amenities": [
                  "Living Room",
                  "Dining Nook",
                  "Butler Service"
            ]
      },
      {
            "roomNo": "JAI-VIL-102",
            "type": "Villa",
            "name": "Private Courtyard Villa",
            "status": "cleaning",
            "price": 31500,
            "branch": "Jaipur Heritage Royale",
            "floor": "Villa Wing",
            "capacity": 4,
            "view": "Heritage",
            "freeCancel": false,
            "amenities": [
                  "Courtyard",
                  "Plunge Pool",
                  "Private Dining"
            ]
      },
      {
            "roomNo": "JAI-DLX-205",
            "type": "Deluxe",
            "name": "Heritage Deluxe Haveli Room",
            "status": "available",
            "price": 15900,
            "branch": "Jaipur Heritage Royale",
            "floor": "2nd Floor",
            "capacity": 2,
            "view": "Heritage",
            "freeCancel": true,
            "amenities": [
                  "Jharokha Window",
                  "Breakfast",
                  "Handcrafted Decor"
            ]
      },
      {
            "roomNo": "JAI-VIL-110",
            "type": "Villa",
            "name": "Royal Courtyard Villa",
            "status": "available",
            "price": 33400,
            "branch": "Jaipur Heritage Royale",
            "floor": "Villa Wing",
            "capacity": 4,
            "view": "Heritage",
            "freeCancel": false,
            "amenities": [
                  "Private Courtyard",
                  "Butler",
                  "Celebration Setup"
            ]
      },
      {
            "roomNo": "KOL-DLX-401",
            "type": "Deluxe",
            "name": "Riverside Deluxe Room",
            "status": "available",
            "price": 14500,
            "branch": "Kolkata Riverside Palace",
            "floor": "4th Floor",
            "capacity": 2,
            "view": "River",
            "freeCancel": true,
            "amenities": [
                  "Breakfast",
                  "River View",
                  "Reading Corner"
            ]
      },
      {
            "roomNo": "KOL-STE-706",
            "type": "Suite",
            "name": "Palace Riverside Suite",
            "status": "available",
            "price": 24800,
            "branch": "Kolkata Riverside Palace",
            "floor": "7th Floor",
            "capacity": 3,
            "view": "River",
            "freeCancel": true,
            "amenities": [
                  "Drawing Area",
                  "High Tea",
                  "Tub"
            ]
      },
      {
            "roomNo": "KOL-CLB-808",
            "type": "Club",
            "name": "Club Palace Chamber",
            "status": "available",
            "price": 21400,
            "branch": "Kolkata Riverside Palace",
            "floor": "8th Floor",
            "capacity": 3,
            "view": "River",
            "freeCancel": false,
            "amenities": [
                  "Club Dining",
                  "Airport Assist",
                  "Concierge"
            ]
      }
],
    bookings: [
      { id: 'BK-24081', hotel: 'Goa Seaside Lumi', room: 'Deluxe Ocean Room', guest: 'Aarav Mehta', checkin: '2026-04-14', checkout: '2026-04-17', guests: 2, amount: 41700, status: 'confirmed' },
      { id: 'BK-24082', hotel: 'Mumbai Grand Marina', room: 'Royal Skyline Suite', guest: 'Riya Sen', checkin: '2026-05-02', checkout: '2026-05-05', guests: 2, amount: 79500, status: 'pending' },
      { id: 'BK-24083', hotel: 'Kolkata Riverside Palace', room: 'Club Lounge Residence', guest: 'Karan Verma', checkin: '2026-03-28', checkout: '2026-03-30', guests: 1, amount: 39000, status: 'confirmed' }
    ],
    users: [
      { name: 'Demo Customer', email: 'guest@lumistays.com', mobile: '9999999999', address: 'Kolkata', userId: 'guest101', password: 'guest123', role: 'user', loyaltyPoints: 750 },
      { name: 'Branch Admin', email: 'admin@lumistays.com', mobile: '8888888888', address: 'Corporate HQ', userId: 'admin101', password: 'admin123', role: 'admin', loyaltyPoints: 0 }
    ],
    supportTickets: [
      { id: 'SUP-1201', name: 'Nina Kapoor', email: 'nina@email.com', subject: 'Airport pickup confirmation', message: 'Please confirm pickup for tomorrow evening.', status: 'open' },
      { id: 'SUP-1202', name: 'Sahil Das', email: 'sahil@email.com', subject: 'Spa schedule request', message: 'Looking to pre-book a spa appointment.', status: 'closed' }
    ],
    services: [
      { id: 'SRV-01', service: 'Butler Service', eta: '15 mins', price: 1800 },
      { id: 'SRV-02', service: 'Private Airport Transfer', eta: '45 mins', price: 3500 },
      { id: 'SRV-03', service: 'In-Room Dining Tasting Menu', eta: '30 mins', price: 4200 },
      { id: 'SRV-04', service: 'Luxury Spa Ritual', eta: 'By schedule', price: 5600 }
    ],
    branches: [
      { city: 'Goa', hotel: 'Goa Seaside Lumi', occupancy: 92, revenue: '₹1.84 Cr', status: 'Peak Demand' },
      { city: 'Mumbai', hotel: 'Mumbai Grand Marina', occupancy: 88, revenue: '₹2.32 Cr', status: 'Stable' },
      { city: 'Delhi', hotel: 'Delhi Imperial Heights', occupancy: 81, revenue: '₹1.56 Cr', status: 'Rising' },
      { city: 'Jaipur', hotel: 'Jaipur Heritage Royale', occupancy: 76, revenue: '₹1.12 Cr', status: 'Seasonal' }
    ]
  };

  Object.entries(defaults).forEach(([key, value]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
  }
})();
