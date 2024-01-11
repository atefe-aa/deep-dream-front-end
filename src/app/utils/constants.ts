export const FAKE_DATA = [
  {
    name: "Azam Ghasemi",
    date: "1402-10-01 10:12",
    number: 86203,
    labNumber: "C02-4788",
    testType: "PBS",
    age: 35,
    sex: "Female",
    description: "",
    laboratory: "Nobel",
    progress: "scanned",
    price: 120000,
  },
  {
    name: "Razieh Aabedini",
    date: "1402-10-01 13:05",
    labNumber: "C02-4786",
    number: 56001,
    testType: "Papsmear",
    age: 37,
    sex: "Female",
    description: "",
    laboratory: "Nobel",
    progress: "answered",
    price: 120000,
  },
  {
    name: "Lotfallah Moradi",
    date: "1402-10-03 11:00",
    labNumber: "S02-49",
    number: 67201,
    testType: "Gastric",
    age: 72,
    sex: "Male",
    description: "",
    laboratory: "Arya",
    progress: "deleted",
    price: 630000,
  },
  {
    name: "Mehri Alaafchian",
    date: "1402-10-04 18:31",
    labNumber: "C02-4784",
    number: 45404,
    testType: "TAH",
    age: 68,
    sex: "Female",
    description: "",
    laboratory: "Erythron",
    progress: "confirmed",
    price: 700000,
  },
  {
    name: "Ellaheh Habibi",
    date: "1402-10-06 10:27",
    labNumber: "C02-4680",
    number: 70008,
    testType: "Colon",
    age: 31,
    sex: "Female",
    description: "",
    laboratory: "Milad",
    progress: "scanning",
    price: 450000,
  },
  {
    name: "Mina Ahmadi",
    date: "1402-10-07 20:05",
    labNumber: "P02-703",
    number: 69023,
    testType: "Breast",
    age: 45,
    sex: "Female",
    description: "",
    laboratory: "Erythron",
    progress: "new",
    price: 500000,
  },
  {
    name: "Fatemeh Bagherian",
    date: "1402-09-29 10:50",
    labNumber: "P02-697",
    number: 67541,
    testType: "Colon",
    age: 63,
    sex: "Female",
    description: "",
    laboratory: "Milad",
    progress: "new",
    price: 450000,
  },
  {
    name: "Ebrahim Salehi",
    date: "1402-09-20 10:50",
    labNumber: "P02-691",
    number: 59173,
    testType: "Gastric",
    age: 63,
    sex: "Male",
    description: "",
    laboratory: "Milad",
    progress: "answered",
    price: 630000,
  },
  {
    name: "Taghi Kianian",
    date: "1402-08-10 10:50",
    labNumber: "P02-652",
    number: 75861,
    testType: "PBS",
    age: 35,
    sex: "Male",
    description: "",
    laboratory: "Milad",
    progress: "scanning",
    price: 170000,
  },
  {
    name: "Ebrahim Shahriari",
    date: "1402-07-19 10:50",
    labNumber: "P02-593",
    number: 1,
    testType: "Colon",
    age: 41,
    sex: "Male",
    description: "",
    laboratory: "Milad",
    progress: "Scanned",
    price: 450000,
  },
];

export const LABS_TESTS_DATA = [
  {
    id: 1,
    labName: "Nobel",
    totalTests: Math.floor(Math.random() * (90 - 10 + 1)),
    totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
    tests: [
      {
        id: 12,
        testName: "Breast",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 13,
        testName: "Papsmear",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 14,
        testName: "PBS",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 15,
        testName: "Colon",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 16,
        testName: "Gastric",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 17,
        testName: "TAH",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
    ],
  },
  {
    id: 2,
    labName: "Milad",
    totalTests: Math.floor(Math.random() * (90 - 10 + 1)),
    totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
    tests: [
      {
        id: 12,
        testName: "Breast",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 13,
        testName: "Papsmear",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 14,
        testName: "PBS",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 15,
        testName: "Colon",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 16,
        testName: "Gastric",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 17,
        testName: "TAH",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
    ],
  },
  {
    id: 3,
    labName: "Arya",
    totalTests: Math.floor(Math.random() * (90 - 10 + 1)),
    totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
    tests: [
      {
        id: 12,
        testName: "Breast",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 13,
        testName: "Papsmear",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 14,
        testName: "PBS",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 15,
        testName: "Colon",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 16,
        testName: "Gastric",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 17,
        testName: "TAH",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
    ],
  },
  {
    id: 4,
    labName: "Erythron",
    totalTests: Math.floor(Math.random() * (90 - 10 + 1)),
    totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
    tests: [
      {
        id: 12,
        testName: "Breast",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 13,
        testName: "Papsmear",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 14,
        testName: "PBS",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 15,
        testName: "Colon",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 16,
        testName: "Gastric",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 17,
        testName: "TAH",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
    ],
  },
  {
    id: 5,
    labName: "Baradaran",
    totalTests: Math.floor(Math.random() * (90 - 10 + 1)),
    totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
    tests: [
      {
        id: 12,
        testName: "Breast",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 13,
        testName: "Papsmear",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 14,
        testName: "PBS",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 15,
        testName: "Colon",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 16,
        testName: "Gastric",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
      {
        id: 17,
        testName: "TAH",
        testPrice: 25000,
        totalNamber: Math.floor(Math.random() * (90 - 10 + 1)),
        totalPrice: Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000,
      },
    ],
  },
];

export const TEST_TYPES = [
  {
    id: 12,
    title: "Breast",
    code: 120,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "optical",
    magnifications: [1, 2],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
  {
    id: 13,
    title: "Papsmear",
    code: 121,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "optical",
    magnifications: [3, 2],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
  {
    id: 14,
    title: "PBS",
    code: 122,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "Flourscent",
    magnifications: [1, 3],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
  {
    id: 15,
    title: "Colon",
    code: 123,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "invert",
    magnifications: [4, 2],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
  {
    id: 16,
    title: "Gastric",
    code: 124,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "optical",
    magnifications: [1, 2, 3],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
  {
    id: 17,
    title: "TAH",
    code: 125,
    sex: "male",
    description: "test description to clarify darkness points.",
    type: "optical",
    magnifications: [1, 2, 3, 4],
    prices: [
      {
        id: 1,
        lab: {
          id: 1,
          name: "Milad",
        },
        price: 25000,
      },
      {
        id: 2,
        lab: {
          id: 2,
          name: "Ariya",
        },
        price: 15000,
      },
      {
        id: 3,
        lab: {
          id: 3,
          name: "Nobel",
        },
        price: 35000,
      },
      {
        id: 4,
        lab: {
          id: 4,
          name: "Shargh",
        },
        price: 25000,
      },
    ],
  },
];

export const DEFAULT_SETTINGS = [
  {
    id: 1,
    title: "4x",
    settings: [
      {
        id: 1,
        title: "condenseur",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "brightness",
        value: 10,
        type: "number",
      },

      {
        id: 4,
        title: "microStep",
        value: 20,
        type: "number",
      },
      {
        id: 5,
        title: "x",
        value: 3,
        type: "number",
      },
      {
        id: 6,
        title: "y",
        value: 6,
        type: "number",
      },
      {
        id: 7,
        title: "z",
        value: 50,
        type: "number",
      },
      {
        id: 3,
        title: "multiLayer",
        value: true,
        type: "checkbox",
      },
    ],
  },
  {
    id: 2,
    title: "10x",
    settings: [
      {
        id: 1,
        title: "condenseur",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "brightness",
        value: 10,
        type: "number",
      },

      {
        id: 4,
        title: "microStep",
        value: 20,
        type: "number",
      },
      {
        id: 5,
        title: "x",
        value: 3,
        type: "number",
      },
      {
        id: 6,
        title: "y",
        value: 6,
        type: "number",
      },
      {
        id: 7,
        title: "z",
        value: 50,
        type: "number",
      },
      {
        id: 3,
        title: "multiLayer",
        value: true,
        type: "checkbox",
      },
    ],
  },
  {
    id: 3,
    title: "40x",
    settings: [
      {
        id: 1,
        title: "condenseur",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "brightness",
        value: 10,
        type: "number",
      },

      {
        id: 4,
        title: "microStep",
        value: 20,
        type: "number",
      },
      {
        id: 5,
        title: "x",
        value: 3,
        type: "number",
      },
      {
        id: 6,
        title: "y",
        value: 6,
        type: "number",
      },
      {
        id: 7,
        title: "z",
        value: 50,
        type: "number",
      },
      {
        id: 3,
        title: "multiLayer",
        value: true,
        type: "checkbox",
      },
    ],
  },
  {
    id: 4,
    title: "100x",
    settings: [
      {
        id: 1,
        title: "condenseur",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "brightness",
        value: 10,
        type: "number",
      },

      {
        id: 4,
        title: "microStep",
        value: 20,
        type: "number",
      },
      {
        id: 5,
        title: "x",
        value: 3,
        type: "number",
      },
      {
        id: 6,
        title: "y",
        value: 6,
        type: "number",
      },
      {
        id: 7,
        title: "z",
        value: 50,
        type: "number",
      },
      {
        id: 3,
        title: "multiLayer",
        value: true,
        type: "checkbox",
      },
    ],
  },
  {
    id: 5,
    title: "field lens placement",
    settings: [
      {
        id: 1,
        title: "2x",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "10x",
        value: 10,
        type: "number",
      },
      {
        id: 4,
        title: "40x",
        value: 20,
        type: "number",
      },
      {
        id: 5,
        title: "100x",
        value: 3,
        type: "number",
      },
    ],
  },
  {
    id: 6,
    title: "condenseur placement",
    settings: [
      {
        id: 1,
        title: "min",
        value: 20,
        type: "number",
      },
      {
        id: 2,
        title: "max",
        value: 10,
        type: "number",
      },
    ],
  },
];

export const Slides_Placements = [
  {
    id: 1,
    title: "slide 1",
    coordinates: [
      {
        id: 1,
        title: "x",
        value: 20,
      },
      {
        id: 2,
        title: "y",
        value: 0,
      },
    ],
  },
  {
    id: 2,
    title: "slide 2",
    coordinates: [
      {
        id: 1,
        title: "x",
        value: 20,
      },
      {
        id: 2,
        title: "y",
        value: 0,
      },
    ],
  },
];

export const BarChartTotalsNumber = [
  {
    title: "Total Tests",
    unit: "tests",
    value: LABS_TESTS_DATA.reduce((acc, lab) => acc + lab.totalTests, 0),
  },
  {
    title: "Date Range",
    unit: "",
    value: "All Time",
  },
];
export const BarChartTotalsPrice = [
  {
    title: "Total Price",
    unit: "(R)",
    value: LABS_TESTS_DATA.reduce(
      (acc, lab) => acc + lab.totalPrice,
      0
    ).toLocaleString(),
  },
  {
    title: "Range Date",
    unit: "",
    value: "All Time",
  },
];
export const testNumberSeries = [
  { name: "Total Tests", data: LABS_TESTS_DATA.map((lab) => lab.totalTests) },
];
export const testPriceSeries = [
  {
    name: "Total Price",
    data: LABS_TESTS_DATA.map((lab) => lab.totalPrice / 1000),
  },
];
export const xaxisCategories = LABS_TESTS_DATA.map((lab) => lab.labName);

export const radarPriceSeries = LABS_TESTS_DATA.map((lab) => {
  const testData = lab.tests.map((test) => test.totalPrice);
  return {
    name: lab.labName,
    data: testData,
  };
});
export const radarNumberSeries = LABS_TESTS_DATA.map((lab) => {
  const testData = lab.tests.map((test) => test.totalNamber);
  return {
    name: lab.labName,
    data: testData,
  };
});

export const xaxisTestTypeCategories = TEST_TYPES.map((test) => test.title);

export const TestTypeNumberSeries = [
  {
    name: "Total Tests",
    data: TEST_TYPES.map((test) =>
      LABS_TESTS_DATA.reduce(
        (accum, lab) =>
          accum +
          (lab.tests.find((labTest) => labTest.id === test.id)?.totalNamber ||
            0),
        0
      )
    ),
  },
];
export const TestTypePriceSeries = [
  {
    name: "Total Prices",
    data: TEST_TYPES.map((test) =>
      LABS_TESTS_DATA.reduce(
        (accum, lab) =>
          accum +
          (lab.tests.find((labTest) => labTest.id === test.id)?.totalPrice ||
            0),
        0
      )
    ),
  },
];
