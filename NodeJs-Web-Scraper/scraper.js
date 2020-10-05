const puppeteer = require('puppeteer'); // web scraping
let checkWord = require('check-word'); // Checks the words

//  Points table
const pointsTable = {
  100: [1, 25],
  99: [25.0000001, 50],
  98: [50.0000001, 75],
  97: [75.0000001, 100],
  96: [100.0000001, 125],
  95: [125.0000001, 150],
  94: [150.0000001, 175],
  93: [175.0000001, 200],
  92: [200.0000001, 225],
  91: [225.0000001, 250],
  90: [250.0000001, 275],
  89: [275.0000001, 300],
  88: [300.0000001, 325],
  87: [325.0000001, 350],
  86: [350.0000001, 375],
  85: [375.0000001, 400],
  84: [400.0000001, 425],
  83: [425.0000001, 450],
  82: [450.0000001, 475],
  81: [475.0000001, 500],
  80: [500.0000001, 525],
  79: [525.0000001, 550],
  78: [550.0000001, 575],
  77: [575.0000001, 600],
  76: [600.0000001, 625],
  75: [625.0000001, 650],
  74: [650.0000001, 675],
  73: [675.0000001, 700],
  72: [700.0000001, 725],
  71: [725.0000001, 750],
  70: [750.0000001, 775],
  69: [775.0000001, 800],
  68: [800.0000001, 825],
  67: [825.0000001, 850],
  66: [850.0000001, 875],
  65: [875.0000001, 900],
  64: [900.0000001, 925],
  63: [925.0000001, 950],
  62: [950.0000001, 975],
  61: [975.0000001, 1000],
  60: [1000.0000001, 1025],
  59: [1025.0000001, 1050],
  58: [1050.0000001, 1075],
  57: [1075.0000001, 1100],
  56: [1100.0000001, 1125],
  55: [1125.0000001, 1150],
  54: [1150.0000001, 1175],
  53: [1175.0000001, 1200],
  52: [1200.0000001, 1225],
  51: [1225.0000001, 1250],
  50: [1250.0000001, 1275],
  49: [1275.0000001, 1300],
  48: [1300.0000001, 1325],
  47: [1325.0000001, 1350],
  46: [1350.0000001, 1375],
  45: [1375.0000001, 1400],
  44: [1400.0000001, 1425],
  43: [1425.0000001, 1450],
  42: [1450.0000001, 1475],
  41: [1475.0000001, 1500],
  40: [1500.0000001, 1525],
  39: [1525.0000001, 1550],
  38: [1550.0000001, 1575],
  37: [1575.0000001, 1600],
  36: [1600.0000001, 1625],
  35: [1625.0000001, 1650],
  34: [1650.0000001, 1675],
  33: [1675.0000001, 1700],
  32: [1700.0000001, 1725],
  31: [1725.0000001, 1750],
  30: [1750.0000001, 1775],
  29: [1775.0000001, 1800],
  28: [1800.0000001, 1825],
  27: [1825.0000001, 1850],
  26: [1850.0000001, 1875],
  25: [1875.0000001, 1900],
  24: [1900.0000001, 1925],
  23: [1925.0000001, 1950],
  22: [1950.0000001, 1975],
  21: [1975.0000001, 2000],
  20: [2000.0000001, 2025],
  19: [2025.0000001, 2050],
  18: [2050.0000001, 2075],
  17: [2075.0000001, 2100],
  16: [2100.0000001, 2125],
  15: [2125.0000001, 2150],
  14: [2150.0000001, 2175],
  13: [2175.0000001, 2200],
  12: [2200.0000001, 2225],
  11: [2225.0000001, 2250],
  10: [2250.0000001, 2275],
  9: [2275.0000001, 2300],
  8: [2300.0000001, 2325],
  7: [2325.0000001, 2350],
  6: [2350.0000001, 2375],
  5: [2375.0000001, 2400],
  4: [2400.0000001, 2425],
  3: [2425.0000001, 2450],
  2: [2450.0000001, 2475],
  1: [2475.0000001, 25000000],
};

// Checking if the word even exists
function checkIfWordExists(word) {
  words = checkWord('en'); // We are looking for english words
  if (words.check(word)) {
    startScrape(`https://www.google.com/search?q=${word}`);
  } else {
    console.log('Invalid word...');
  }
}

//  Web scrapes everything
async function startScrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="result-stats"]'); // X path
  const text = await el.getProperty('textContent');
  const rawText = await text.jsonValue();
  const actualNumber = +rawText.split(' ')[1].split(',').join('') / 10000000;
  console.log(
    'The word appeared a total of:',
    actualNumber * 10000000,
    'times'
  );
  allocatePoints(actualNumber);
}

function allocatePoints(number) {
  let found = false;
  for (let [key, value] of Object.entries(pointsTable)) {
    if (value[0] <= number && value[1] >= number) {
      found = true;
      console.log('Total Points awarded:', key);
    }
  }
  if (!found) {
    console.log('Total Points awarded: 0');
  }
}

// Pass arguments via CMD
let searchTerm = process.argv[2];
checkIfWordExists(searchTerm);
