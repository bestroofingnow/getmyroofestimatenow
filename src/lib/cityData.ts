// Extended city data for unique SEO content generation

export interface CityExtendedData {
  slug: string;
  population: string;
  foundedYear?: string;
  nickname?: string;
  neighborhoods: string[];
  landmarks: string[];
  majorEmployers: string[];
  nearbyAreas: string[];
  weatherStats: {
    avgSummerHigh: string;
    avgWinterLow: string;
    annualRainfall: string;
    snowfall?: string;
    stormSeason?: string;
  };
  roofingChallenges: string[];
  localFacts: string[];
  countyName: string;
  zipCodes: string[];
}

export const cityExtendedData: Record<string, CityExtendedData> = {
  'charlotte-nc': {
    slug: 'charlotte-nc',
    population: '900,000+',
    foundedYear: '1768',
    nickname: 'Queen City',
    neighborhoods: ['South End', 'NoDa', 'Dilworth', 'Myers Park', 'Ballantyne', 'University City', 'Plaza Midwood', 'Uptown', 'South Park', 'Matthews'],
    landmarks: ['Bank of America Stadium', 'Spectrum Center', 'Freedom Park', 'NASCAR Hall of Fame', 'Carowinds'],
    majorEmployers: ['Bank of America', 'Wells Fargo', 'Duke Energy', 'Atrium Health', 'Lowes'],
    nearbyAreas: ['Concord', 'Gastonia', 'Rock Hill', 'Huntersville', 'Matthews'],
    weatherStats: {
      avgSummerHigh: '89°F',
      avgWinterLow: '32°F',
      annualRainfall: '43 inches',
      snowfall: '4 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Summer thunderstorms with hail', 'High humidity causing algae growth', 'Occasional ice storms', 'Strong winds from tropical systems', 'UV damage from intense summer sun'],
    localFacts: ['Largest city in North Carolina', 'Second-largest banking center in the US', 'Home to multiple Fortune 500 companies', 'Rapidly growing population', 'Historic architecture in older neighborhoods'],
    countyName: 'Mecklenburg County',
    zipCodes: ['28202', '28203', '28204', '28205', '28206', '28207', '28208', '28209', '28210', '28211']
  },
  'concord-nc': {
    slug: 'concord-nc',
    population: '105,000+',
    foundedYear: '1796',
    nickname: 'Speed Capital of the South',
    neighborhoods: ['Downtown Concord', 'Afton Village', 'Moss Creek', 'Christenbury', 'Odell School', 'Cox Mill'],
    landmarks: ['Charlotte Motor Speedway', 'Concord Mills Mall', 'Great Wolf Lodge', 'SEA LIFE Aquarium'],
    majorEmployers: ['NASCAR teams', 'Concord Mills retail', 'Atrium Health Cabarrus', 'Cabarrus County Schools'],
    nearbyAreas: ['Charlotte', 'Kannapolis', 'Harrisburg', 'Midland', 'Mount Pleasant'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '31°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Heavy traffic vibration near speedway', 'Summer storm damage', 'Rapid development areas', 'Mix of old and new construction', 'Humidity-related wear'],
    localFacts: ['Home to Charlotte Motor Speedway', 'One of fastest-growing cities in NC', 'Major retail destination', 'Cabarrus County seat'],
    countyName: 'Cabarrus County',
    zipCodes: ['28025', '28026', '28027']
  },
  'gastonia-nc': {
    slug: 'gastonia-nc',
    population: '80,000+',
    foundedYear: '1877',
    nickname: 'Gateway to the South Mountains',
    neighborhoods: ['Downtown Gastonia', 'Ranlo', 'Lowell', 'Cramerton', 'McAdenville', 'Belmont'],
    landmarks: ['Schiele Museum', 'Crowders Mountain State Park', 'Daniel Stowe Botanical Garden', 'McAdenville Christmas Town'],
    majorEmployers: ['CaroMont Health', 'Gaston County Schools', 'Wix Filtration', 'manufacturing sector'],
    nearbyAreas: ['Charlotte', 'Belmont', 'Mount Holly', 'Kings Mountain', 'Bessemer City'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '30°F',
      annualRainfall: '47 inches',
      snowfall: '3 inches annually',
      stormSeason: 'March through October'
    },
    roofingChallenges: ['Historic downtown buildings', 'Older housing stock', 'Mountain-influenced weather', 'Heavy rainfall periods', 'Tree debris from storms'],
    localFacts: ['Gaston County seat', 'Historic textile manufacturing center', 'Near Crowders Mountain hiking', 'Christmas Town USA nearby'],
    countyName: 'Gaston County',
    zipCodes: ['28052', '28053', '28054', '28056']
  },
  'huntersville-nc': {
    slug: 'huntersville-nc',
    population: '65,000+',
    foundedYear: '1873',
    nickname: 'North Mecklenburg Hub',
    neighborhoods: ['Birkdale Village', 'Skybrook', 'Rosedale', 'Vermillion', 'The Palisades', 'Northstone'],
    landmarks: ['Birkdale Village', 'Lake Norman', 'Discovery Place Kids', 'Carolina Raptor Center'],
    majorEmployers: ['Lowe\'s Home Improvement', 'American Tire Distributors', 'Ingersoll Rand', 'retail sector'],
    nearbyAreas: ['Charlotte', 'Cornelius', 'Davidson', 'Mooresville', 'Lake Norman'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '30°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Lakefront property considerations', 'High-end home requirements', 'HOA regulations', 'New construction standards', 'Wind exposure near lake'],
    localFacts: ['One of wealthiest suburbs in Charlotte metro', 'Upscale shopping at Birkdale Village', 'Lake Norman access', 'Top-rated schools'],
    countyName: 'Mecklenburg County',
    zipCodes: ['28070', '28078']
  },
  'mooresville-nc': {
    slug: 'mooresville-nc',
    population: '50,000+',
    foundedYear: '1873',
    nickname: 'Race City USA',
    neighborhoods: ['Downtown Mooresville', 'The Point', 'Langtree', 'Morrison Plantation', 'Curtis Pond'],
    landmarks: ['Lake Norman', 'NASCAR Technical Institute', 'NC Auto Racing Hall of Fame', 'Lazy 5 Ranch'],
    majorEmployers: ['Lowe\'s Corporate HQ', 'NASCAR teams', 'Iredell Health System', 'manufacturing'],
    nearbyAreas: ['Charlotte', 'Huntersville', 'Davidson', 'Statesville', 'Cornelius'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '29°F',
      annualRainfall: '46 inches',
      snowfall: '4 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Lake effect weather', 'Premium home market demands', 'NASCAR facility vibrations', 'Rapid growth construction', 'Waterfront property needs'],
    localFacts: ['Home to Lowe\'s headquarters', 'Major NASCAR industry hub', 'Lake Norman waterfront living', 'Iredell County location'],
    countyName: 'Iredell County',
    zipCodes: ['28115', '28117']
  },
  'lake-norman-nc': {
    slug: 'lake-norman-nc',
    population: '150,000+ (region)',
    nickname: 'Inland Sea of NC',
    neighborhoods: ['The Peninsula', 'Northstone', 'Jetton Park', 'Governors Island', 'Norman Shores'],
    landmarks: ['Lake Norman', 'Jetton Park', 'Ramsey Creek Park', 'Lake Norman State Park', 'Blythe Landing'],
    majorEmployers: ['Tourism and hospitality', 'Boating industry', 'Real estate', 'Healthcare'],
    nearbyAreas: ['Mooresville', 'Cornelius', 'Davidson', 'Huntersville', 'Denver'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '29°F',
      annualRainfall: '45 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Waterfront humidity and moisture', 'Wind exposure on the lake', 'Premium material requirements', 'Boat dock proximity', 'Higher property values demanding quality'],
    localFacts: ['Largest man-made lake in North Carolina', 'Over 520 miles of shoreline', 'Created in 1963 by Duke Energy', 'Popular destination for boating and fishing'],
    countyName: 'Multiple Counties',
    zipCodes: ['28031', '28036', '28115', '28117']
  },
  'cornelius-nc': {
    slug: 'cornelius-nc',
    population: '33,000+',
    foundedYear: '1905',
    nickname: 'Lake Town',
    neighborhoods: ['Jetton Road', 'Bailey\'s Glen', 'Antiquity', 'Sail Point', 'The Hamptons'],
    landmarks: ['Jetton Park', 'Ramsey Creek Beach', 'Lake Norman', 'Historic Main Street'],
    majorEmployers: ['Lake Norman Regional Medical Center', 'Retail sector', 'Real estate', 'Professional services'],
    nearbyAreas: ['Davidson', 'Huntersville', 'Mooresville', 'Charlotte', 'Lake Norman'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '30°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Lakefront property requirements', 'High-end aesthetic demands', 'Marina proximity moisture', 'HOA architectural standards', 'Premium material expectations'],
    localFacts: ['Popular Lake Norman community', 'Upscale waterfront properties', 'Excellent schools', 'Vibrant Main Street area'],
    countyName: 'Mecklenburg County',
    zipCodes: ['28031']
  },
  'davidson-nc': {
    slug: 'davidson-nc',
    population: '15,000+',
    foundedYear: '1837',
    nickname: 'College Town',
    neighborhoods: ['Downtown Davidson', 'River Run', 'Bradford', 'St. Alban\'s', 'McConnell'],
    landmarks: ['Davidson College', 'Lake Campus', 'Summit Coffee', 'Main Street shops'],
    majorEmployers: ['Davidson College', 'Ingersoll Rand', 'Professional services', 'Education'],
    nearbyAreas: ['Cornelius', 'Huntersville', 'Mooresville', 'Lake Norman', 'Charlotte'],
    weatherStats: {
      avgSummerHigh: '87°F',
      avgWinterLow: '30°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Historic home preservation', 'College campus area regulations', 'Mature tree coverage', 'Architectural consistency', 'Premium aesthetic requirements'],
    localFacts: ['Home to prestigious Davidson College', 'Historic downtown district', 'Lake Norman access', 'Strong community character'],
    countyName: 'Mecklenburg County',
    zipCodes: ['28035', '28036']
  },
  'kannapolis-nc': {
    slug: 'kannapolis-nc',
    population: '55,000+',
    foundedYear: '1906',
    nickname: 'Towel City',
    neighborhoods: ['Downtown Kannapolis', 'Georgian Woods', 'Irish Buffalo Creek', 'Afton Village', 'Royal Oaks'],
    landmarks: ['Atrium Health Ballpark', 'NC Research Campus', 'Gem Theatre', 'Village Park'],
    majorEmployers: ['NC Research Campus', 'Atrium Health', 'Food processing', 'Biotechnology'],
    nearbyAreas: ['Concord', 'Charlotte', 'Harrisburg', 'China Grove', 'Landis'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '30°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Historic mill housing renovation', 'Downtown revitalization projects', 'Mixed housing ages', 'Research campus standards', 'Affordability considerations'],
    localFacts: ['Former Cannon Mills company town', 'Home to NC Research Campus', 'Revitalized downtown area', 'Minor league baseball'],
    countyName: 'Cabarrus/Rowan County',
    zipCodes: ['28081', '28083']
  },
  'rock-hill-sc': {
    slug: 'rock-hill-sc',
    population: '75,000+',
    foundedYear: '1852',
    nickname: 'Football City USA',
    neighborhoods: ['Downtown Rock Hill', 'India Hook', 'Riverwalk', 'Lake Wylie', 'Ebenezer'],
    landmarks: ['Knowledge Park', 'Glencairn Garden', 'Main Street', 'Catawba River', 'Winthrop University'],
    majorEmployers: ['3D Systems', 'Winthrop University', 'Piedmont Medical Center', 'Comporium'],
    nearbyAreas: ['Charlotte', 'Fort Mill', 'Lake Wylie', 'Tega Cay', 'York'],
    weatherStats: {
      avgSummerHigh: '90°F',
      avgWinterLow: '31°F',
      annualRainfall: '46 inches',
      snowfall: '2 inches annually',
      stormSeason: 'April through October'
    },
    roofingChallenges: ['South Carolina building codes', 'Intense summer heat', 'Historic downtown buildings', 'University area regulations', 'Cross-border contractor licensing'],
    localFacts: ['York County seat', 'Home to Winthrop University', 'Catawba River access', 'Growing tech sector'],
    countyName: 'York County',
    zipCodes: ['29730', '29732', '29733']
  },
  'fort-mill-sc': {
    slug: 'fort-mill-sc',
    population: '25,000+',
    foundedYear: '1873',
    nickname: 'Springs Town',
    neighborhoods: ['Baxter Village', 'Springfield', 'Tega Cay', 'Regent Park', 'Massey'],
    landmarks: ['Anne Springs Close Greenway', 'Confederate Park', 'Main Street Fort Mill', 'Carowinds'],
    majorEmployers: ['LPL Financial', 'Red Ventures', 'Shutterfly', 'Domtar'],
    nearbyAreas: ['Charlotte', 'Rock Hill', 'Tega Cay', 'Pineville', 'Indian Land'],
    weatherStats: {
      avgSummerHigh: '90°F',
      avgWinterLow: '31°F',
      annualRainfall: '45 inches',
      snowfall: '2 inches annually',
      stormSeason: 'April through October'
    },
    roofingChallenges: ['Rapid new construction', 'SC/NC contractor differences', 'Premium subdivision standards', 'New development warranties', 'Fast-growing area demands'],
    localFacts: ['One of fastest-growing towns in SC', 'Major corporate relocations', 'Top-rated schools', 'Access to both states'],
    countyName: 'York County',
    zipCodes: ['29707', '29708', '29715']
  },
  'indian-trail-nc': {
    slug: 'indian-trail-nc',
    population: '45,000+',
    foundedYear: '1861',
    nickname: 'Trail Town',
    neighborhoods: ['Sun Valley', 'Hemby Bridge', 'Sardis Woods', 'Brookhaven', 'Weddington'],
    landmarks: ['Crooked Creek Park', 'Indian Trail Cultural Arts Center', 'Town Hall'],
    majorEmployers: ['Union County Schools', 'Retail sector', 'Small businesses', 'Healthcare'],
    nearbyAreas: ['Charlotte', 'Matthews', 'Monroe', 'Stallings', 'Weddington'],
    weatherStats: {
      avgSummerHigh: '89°F',
      avgWinterLow: '31°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Newer subdivision construction', 'HOA requirements', 'Growing infrastructure', 'Storm damage from open areas', 'Residential development boom'],
    localFacts: ['One of fastest-growing towns in NC', 'Union County location', 'Family-oriented community', 'New construction dominant'],
    countyName: 'Union County',
    zipCodes: ['28079', '28104']
  },
  'matthews-nc': {
    slug: 'matthews-nc',
    population: '32,000+',
    foundedYear: '1879',
    nickname: 'Stumptown',
    neighborhoods: ['Downtown Matthews', 'Sardis Woods', 'Weddington', 'McKee Farms', 'Plantation Estates'],
    landmarks: ['Stumptown Park', 'Matthews Playhouse', 'Historic Downtown', 'Matthews Community Farmers Market'],
    majorEmployers: ['Novant Health Matthews', 'Charlotte-Mecklenburg Schools', 'Retail sector', 'Professional services'],
    nearbyAreas: ['Charlotte', 'Indian Trail', 'Mint Hill', 'Stallings', 'Pineville'],
    weatherStats: {
      avgSummerHigh: '89°F',
      avgWinterLow: '31°F',
      annualRainfall: '43 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Historic downtown preservation', 'Mature trees and debris', 'Mix of home ages', 'Established neighborhood standards', 'Proximity to Charlotte growth'],
    localFacts: ['Historic Stumptown nickname', 'Vibrant downtown area', 'Top-rated schools', 'Community-focused town'],
    countyName: 'Mecklenburg County',
    zipCodes: ['28104', '28105']
  },
  'hickory-nc': {
    slug: 'hickory-nc',
    population: '45,000+',
    foundedYear: '1870',
    nickname: 'Furniture Capital',
    neighborhoods: ['Downtown Hickory', 'Highland', 'Viewmont', 'Westmont', 'Conover'],
    landmarks: ['SALT Block', 'Hickory Motor Speedway', 'Lake Hickory', 'Catawba Science Center'],
    majorEmployers: ['Frye Regional Medical Center', 'Catawba County Schools', 'CommScope', 'Furniture manufacturing'],
    nearbyAreas: ['Newton', 'Conover', 'Lenoir', 'Morganton', 'Statesville'],
    weatherStats: {
      avgSummerHigh: '87°F',
      avgWinterLow: '28°F',
      annualRainfall: '48 inches',
      snowfall: '5 inches annually',
      stormSeason: 'March through October'
    },
    roofingChallenges: ['Foothills elevation weather', 'Historic industrial buildings', 'Lake effect moisture', 'Older housing stock', 'Mountain-influenced storms'],
    localFacts: ['Historic furniture manufacturing hub', 'Foothills of Blue Ridge Mountains', 'Lake Hickory waterfront', 'Growing tech sector'],
    countyName: 'Catawba County',
    zipCodes: ['28601', '28602', '28603']
  },
  'statesville-nc': {
    slug: 'statesville-nc',
    population: '30,000+',
    foundedYear: '1789',
    nickname: 'City of Progress',
    neighborhoods: ['Downtown Statesville', 'Signal Hill', 'Sharon Acres', 'Fourth Creek'],
    landmarks: ['Fort Dobbs', 'Iredell Museums', 'Lake Norman State Park', 'Historic Downtown'],
    majorEmployers: ['Iredell Health System', 'American Tire Distributors', 'Iredell-Statesville Schools', 'Manufacturing'],
    nearbyAreas: ['Mooresville', 'Troutman', 'Charlotte', 'Hickory', 'Taylorsville'],
    weatherStats: {
      avgSummerHigh: '87°F',
      avgWinterLow: '28°F',
      annualRainfall: '46 inches',
      snowfall: '4 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Historic architecture preservation', 'I-40/I-77 corridor weather', 'Mix of rural and suburban', 'Older home retrofits', 'Growing subdivision demands'],
    localFacts: ['Iredell County seat', 'I-40/I-77 interchange location', 'Historic railroad town', 'Proximity to Lake Norman'],
    countyName: 'Iredell County',
    zipCodes: ['28625', '28677', '28687']
  },
  'monroe-nc': {
    slug: 'monroe-nc',
    population: '38,000+',
    foundedYear: '1844',
    nickname: 'Queen City of the Piedmont',
    neighborhoods: ['Downtown Monroe', 'Fairview', 'Griffith Park', 'Baucom Deese', 'Winchester'],
    landmarks: ['Historic Courthouse', 'Jesse Helms Center', 'Monroe Aquatics Center'],
    majorEmployers: ['Atrium Health Union', 'Union County Schools', 'Tyson Foods', 'Manufacturing'],
    nearbyAreas: ['Charlotte', 'Indian Trail', 'Waxhaw', 'Wingate', 'Marshville'],
    weatherStats: {
      avgSummerHigh: '89°F',
      avgWinterLow: '30°F',
      annualRainfall: '44 inches',
      snowfall: '3 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Rural area accessibility', 'Historic downtown buildings', 'Agricultural area considerations', 'Diverse housing types', 'Growing suburb transitions'],
    localFacts: ['Union County seat', 'Birthplace of Jesse Helms', 'Historic courthouse square', 'Growing Charlotte suburb'],
    countyName: 'Union County',
    zipCodes: ['28110', '28111', '28112']
  },
  // Major cities outside Charlotte metro
  'houston-tx': {
    slug: 'houston-tx',
    population: '2.3 million+',
    foundedYear: '1836',
    nickname: 'Space City',
    neighborhoods: ['The Heights', 'Montrose', 'River Oaks', 'Memorial', 'Katy', 'Sugar Land', 'The Woodlands', 'Pearland', 'Clear Lake', 'Midtown'],
    landmarks: ['Space Center Houston', 'Minute Maid Park', 'Houston Galleria', 'Museum District', 'Buffalo Bayou'],
    majorEmployers: ['NASA', 'ExxonMobil', 'Shell', 'Memorial Hermann', 'MD Anderson Cancer Center'],
    nearbyAreas: ['Katy', 'Sugar Land', 'The Woodlands', 'Pearland', 'Pasadena'],
    weatherStats: {
      avgSummerHigh: '94°F',
      avgWinterLow: '42°F',
      annualRainfall: '50 inches',
      stormSeason: 'June through November (hurricane season)'
    },
    roofingChallenges: ['Hurricane and tropical storm damage', 'Extreme humidity', 'Intense UV exposure', 'Flooding concerns', 'High wind events'],
    localFacts: ['Fourth-largest US city', 'Home to NASA Johnson Space Center', 'Energy capital of the world', 'Major port city'],
    countyName: 'Harris County',
    zipCodes: ['77001', '77002', '77003', '77004', '77005', '77006', '77007', '77008', '77009', '77010']
  },
  'dallas-tx': {
    slug: 'dallas-tx',
    population: '1.3 million+',
    foundedYear: '1841',
    nickname: 'Big D',
    neighborhoods: ['Uptown', 'Deep Ellum', 'Bishop Arts', 'Oak Lawn', 'Preston Hollow', 'Highland Park', 'University Park', 'Lakewood', 'Oak Cliff'],
    landmarks: ['Reunion Tower', 'AT&T Stadium', 'Dallas Arboretum', 'Dealey Plaza', 'Dallas Arts District'],
    majorEmployers: ['AT&T', 'Texas Instruments', 'Southwest Airlines', 'BNSF Railway', 'American Airlines'],
    nearbyAreas: ['Fort Worth', 'Plano', 'Frisco', 'Irving', 'Arlington'],
    weatherStats: {
      avgSummerHigh: '96°F',
      avgWinterLow: '36°F',
      annualRainfall: '37 inches',
      stormSeason: 'March through June (hail and tornado season)'
    },
    roofingChallenges: ['Severe hail storms', 'Tornado risk', 'Extreme temperature swings', 'Intense summer heat', 'Spring storm damage'],
    localFacts: ['Part of DFW metroplex', 'Major business hub', 'Hail Alley location', 'Diverse architecture'],
    countyName: 'Dallas County',
    zipCodes: ['75201', '75202', '75203', '75204', '75205', '75206', '75207', '75208', '75209', '75210']
  },
  'phoenix-az': {
    slug: 'phoenix-az',
    population: '1.6 million+',
    foundedYear: '1881',
    nickname: 'Valley of the Sun',
    neighborhoods: ['Scottsdale', 'Paradise Valley', 'Arcadia', 'Downtown', 'Biltmore', 'Ahwatukee', 'Tempe', 'Mesa', 'Chandler'],
    landmarks: ['Camelback Mountain', 'Desert Botanical Garden', 'Heard Museum', 'Chase Field', 'Papago Park'],
    majorEmployers: ['Banner Health', 'Arizona State University', 'Intel', 'Honeywell', 'American Express'],
    nearbyAreas: ['Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert'],
    weatherStats: {
      avgSummerHigh: '106°F',
      avgWinterLow: '44°F',
      annualRainfall: '8 inches',
      stormSeason: 'July through September (monsoon season)'
    },
    roofingChallenges: ['Extreme heat damage', 'Intense UV exposure', 'Monsoon storm damage', 'Thermal shock from temperature swings', 'Dust accumulation'],
    localFacts: ['Fifth-largest US city', 'Over 300 sunny days per year', 'Desert climate', 'Rapidly growing population'],
    countyName: 'Maricopa County',
    zipCodes: ['85001', '85002', '85003', '85004', '85006', '85007', '85008', '85009', '85012', '85013']
  },
  'atlanta-ga': {
    slug: 'atlanta-ga',
    population: '500,000+',
    foundedYear: '1837',
    nickname: 'The ATL',
    neighborhoods: ['Buckhead', 'Midtown', 'Virginia-Highland', 'Inman Park', 'Decatur', 'East Atlanta', 'Grant Park', 'Old Fourth Ward'],
    landmarks: ['Georgia Aquarium', 'World of Coca-Cola', 'Centennial Olympic Park', 'Martin Luther King Jr. Historic Site', 'Mercedes-Benz Stadium'],
    majorEmployers: ['Coca-Cola', 'Delta Air Lines', 'Home Depot', 'UPS', 'CNN'],
    nearbyAreas: ['Marietta', 'Alpharetta', 'Roswell', 'Sandy Springs', 'Decatur'],
    weatherStats: {
      avgSummerHigh: '89°F',
      avgWinterLow: '34°F',
      annualRainfall: '50 inches',
      snowfall: '2 inches annually',
      stormSeason: 'March through August'
    },
    roofingChallenges: ['Severe thunderstorms', 'Heavy rainfall', 'Occasional tornadoes', 'Tree debris from storms', 'High humidity'],
    localFacts: ['Major business hub of the Southeast', 'Busiest airport in the world', 'Historic Civil Rights landmarks', 'Fortune 500 headquarters'],
    countyName: 'Fulton County',
    zipCodes: ['30301', '30302', '30303', '30304', '30305', '30306', '30307', '30308', '30309', '30310']
  },
  'miami-fl': {
    slug: 'miami-fl',
    population: '450,000+',
    foundedYear: '1896',
    nickname: 'Magic City',
    neighborhoods: ['South Beach', 'Brickell', 'Coconut Grove', 'Coral Gables', 'Wynwood', 'Little Havana', 'Design District', 'Key Biscayne'],
    landmarks: ['South Beach', 'Vizcaya Museum', 'Pérez Art Museum', 'Miami Beach', 'Art Deco Historic District'],
    majorEmployers: ['Carnival Corporation', 'Royal Caribbean', 'University of Miami', 'Baptist Health', 'Tourism industry'],
    nearbyAreas: ['Miami Beach', 'Fort Lauderdale', 'Hollywood', 'Hialeah', 'Coral Gables'],
    weatherStats: {
      avgSummerHigh: '91°F',
      avgWinterLow: '60°F',
      annualRainfall: '62 inches',
      stormSeason: 'June through November (hurricane season)'
    },
    roofingChallenges: ['Hurricane-force winds', 'Salt air corrosion', 'Intense UV exposure', 'Heavy tropical rainfall', 'Strict building codes'],
    localFacts: ['Gateway to Latin America', 'Art Deco architecture', 'Strict hurricane building codes', 'Year-round warm weather'],
    countyName: 'Miami-Dade County',
    zipCodes: ['33101', '33109', '33125', '33126', '33127', '33128', '33129', '33130', '33131', '33132']
  },
  'denver-co': {
    slug: 'denver-co',
    population: '720,000+',
    foundedYear: '1858',
    nickname: 'Mile High City',
    neighborhoods: ['LoDo', 'Capitol Hill', 'Cherry Creek', 'RiNo', 'Highlands', 'Washington Park', 'Baker', 'Five Points'],
    landmarks: ['Red Rocks Amphitheatre', 'Denver Art Museum', 'Union Station', 'Coors Field', 'Colorado State Capitol'],
    majorEmployers: ['Lockheed Martin', 'Arrow Electronics', 'DaVita', 'Western Union', 'Dish Network'],
    nearbyAreas: ['Aurora', 'Lakewood', 'Boulder', 'Arvada', 'Westminster'],
    weatherStats: {
      avgSummerHigh: '88°F',
      avgWinterLow: '17°F',
      annualRainfall: '15 inches',
      snowfall: '57 inches annually',
      stormSeason: 'March through August (hail season)'
    },
    roofingChallenges: ['Heavy snow loads', 'Severe hail damage', 'Intense UV at altitude', 'Rapid temperature changes', 'Ice dam formation'],
    localFacts: ['Exactly one mile above sea level', 'Over 300 days of sunshine', 'Major hail damage area', 'Heavy snow events'],
    countyName: 'Denver County',
    zipCodes: ['80201', '80202', '80203', '80204', '80205', '80206', '80207', '80208', '80209', '80210']
  },
  'chicago-il': {
    slug: 'chicago-il',
    population: '2.7 million+',
    foundedYear: '1833',
    nickname: 'Windy City',
    neighborhoods: ['The Loop', 'Lincoln Park', 'Wicker Park', 'Gold Coast', 'River North', 'Lakeview', 'Old Town', 'Hyde Park'],
    landmarks: ['Willis Tower', 'Millennium Park', 'Navy Pier', 'Art Institute of Chicago', 'Wrigley Field'],
    majorEmployers: ['Boeing', 'United Airlines', 'Abbott', 'Walgreens', 'Caterpillar'],
    nearbyAreas: ['Evanston', 'Oak Park', 'Naperville', 'Schaumburg', 'Aurora'],
    weatherStats: {
      avgSummerHigh: '84°F',
      avgWinterLow: '19°F',
      annualRainfall: '38 inches',
      snowfall: '35 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Harsh winter conditions', 'Ice dam formation', 'Freeze-thaw cycles', 'Strong winds off Lake Michigan', 'Heavy snow loads'],
    localFacts: ['Third-largest US city', 'Iconic architecture', 'Lake effect weather', 'Historic neighborhoods'],
    countyName: 'Cook County',
    zipCodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60609', '60610']
  },
  'seattle-wa': {
    slug: 'seattle-wa',
    population: '750,000+',
    foundedYear: '1851',
    nickname: 'Emerald City',
    neighborhoods: ['Capitol Hill', 'Ballard', 'Fremont', 'Queen Anne', 'South Lake Union', 'West Seattle', 'Georgetown', 'University District'],
    landmarks: ['Space Needle', 'Pike Place Market', 'Chihuly Garden and Glass', 'Museum of Pop Culture', 'Seattle Waterfront'],
    majorEmployers: ['Amazon', 'Microsoft', 'Boeing', 'Starbucks', 'University of Washington'],
    nearbyAreas: ['Bellevue', 'Tacoma', 'Redmond', 'Kirkland', 'Everett'],
    weatherStats: {
      avgSummerHigh: '75°F',
      avgWinterLow: '37°F',
      annualRainfall: '37 inches',
      stormSeason: 'October through May (rainy season)'
    },
    roofingChallenges: ['Constant moisture and rain', 'Moss and algae growth', 'Limited dry installation days', 'Mild but persistent dampness', 'Wind-driven rain'],
    localFacts: ['Tech industry hub', 'Surrounded by water', 'Rainy climate reputation', 'Green building initiatives'],
    countyName: 'King County',
    zipCodes: ['98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108', '98109', '98112']
  },
  'las-vegas-nv': {
    slug: 'las-vegas-nv',
    population: '650,000+',
    foundedYear: '1905',
    nickname: 'Entertainment Capital',
    neighborhoods: ['The Strip', 'Downtown', 'Summerlin', 'Henderson', 'Green Valley', 'Spring Valley', 'North Las Vegas'],
    landmarks: ['Las Vegas Strip', 'Fremont Street', 'Red Rock Canyon', 'The Sphere', 'Bellagio Fountains'],
    majorEmployers: ['MGM Resorts', 'Caesars Entertainment', 'Wynn Resorts', 'Station Casinos', 'Southwest Airlines'],
    nearbyAreas: ['Henderson', 'North Las Vegas', 'Summerlin', 'Paradise', 'Spring Valley'],
    weatherStats: {
      avgSummerHigh: '104°F',
      avgWinterLow: '38°F',
      annualRainfall: '4 inches',
      stormSeason: 'July through September (monsoon season)'
    },
    roofingChallenges: ['Extreme heat exposure', 'Intense UV radiation', 'Flash flooding from monsoons', 'Thermal expansion stress', 'Desert dust accumulation'],
    localFacts: ['Entertainment capital of the world', 'One of fastest-growing cities', 'Extreme desert climate', 'Low humidity environment'],
    countyName: 'Clark County',
    zipCodes: ['89101', '89102', '89103', '89104', '89106', '89107', '89108', '89109', '89110', '89113']
  },
  'nashville-tn': {
    slug: 'nashville-tn',
    population: '690,000+',
    foundedYear: '1779',
    nickname: 'Music City',
    neighborhoods: ['The Gulch', 'East Nashville', 'Germantown', '12 South', 'Midtown', 'West End', 'Bellevue', 'Green Hills'],
    landmarks: ['Grand Ole Opry', 'Ryman Auditorium', 'Broadway Honky Tonks', 'Parthenon', 'Country Music Hall of Fame'],
    majorEmployers: ['Vanderbilt University', 'HCA Healthcare', 'Nissan North America', 'Bridgestone Americas', 'Dollar General'],
    nearbyAreas: ['Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville', 'Gallatin'],
    weatherStats: {
      avgSummerHigh: '90°F',
      avgWinterLow: '29°F',
      annualRainfall: '47 inches',
      snowfall: '4 inches annually',
      stormSeason: 'March through June'
    },
    roofingChallenges: ['Severe thunderstorms', 'Tornado risk', 'High humidity', 'Heavy rainfall events', 'Temperature fluctuations'],
    localFacts: ['Country music capital', 'Rapidly growing city', 'Major healthcare hub', 'Historic architecture'],
    countyName: 'Davidson County',
    zipCodes: ['37201', '37203', '37204', '37205', '37206', '37207', '37208', '37209', '37210', '37211']
  },
  'raleigh-nc': {
    slug: 'raleigh-nc',
    population: '470,000+',
    foundedYear: '1792',
    nickname: 'City of Oaks',
    neighborhoods: ['Downtown', 'North Hills', 'Cameron Village', 'ITB', 'Glenwood South', 'Five Points', 'Oakwood', 'Mordecai'],
    landmarks: ['North Carolina State Capitol', 'NC Museum of Art', 'PNC Arena', 'Pullen Park', 'State Farmers Market'],
    majorEmployers: ['NC State University', 'WakeMed', 'Duke Energy', 'Cisco', 'IBM'],
    nearbyAreas: ['Durham', 'Cary', 'Chapel Hill', 'Apex', 'Wake Forest'],
    weatherStats: {
      avgSummerHigh: '90°F',
      avgWinterLow: '31°F',
      annualRainfall: '46 inches',
      snowfall: '4 inches annually',
      stormSeason: 'April through September'
    },
    roofingChallenges: ['Summer thunderstorms', 'Occasional hurricanes', 'High humidity', 'Tree debris', 'Heat and UV exposure'],
    localFacts: ['Part of Research Triangle', 'State capital', 'Tech industry growth', 'Top-rated quality of life'],
    countyName: 'Wake County',
    zipCodes: ['27601', '27603', '27604', '27605', '27606', '27607', '27608', '27609', '27610', '27612']
  }
};

// Helper to get extended data with fallback for cities not yet added
export function getCityExtendedData(slug: string): CityExtendedData | null {
  return cityExtendedData[slug] || null;
}
