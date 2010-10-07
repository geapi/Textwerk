sc_require('models/document');

TextWerk.Document.FIXTURES = [
  // ..........................................................
  // Doe Collection
  // 
  {
    id: '1',
    type: "Document",
    name: 'John',
    collection: '1',
    referrer: null,
    citee: null,

    position: {y: 10, x: 10}
  },
  
  {
    id: '2',
    type: "Document",
    name: 'Nancy',
    collection: '1',
    referrer: null,
    citee: null,
    position: {y: 35, x: 300}
  },
  
  {
    id: '3',
    type: "Document",
    name: 'John Jr',
    collection: '1',
    referrer: '2',
    citee: '1',
    position: {y: 300, x: 10}
  },
  
  {
    id: '4',
    type: "Document",
    name: 'Penelope',
    collection: '1',
    referrer: '2',
    citee: '1',

    position: {y: 300, x: 300}
  },
  
  // ..........................................................
  // Obama Family
  // 
  {
    id: '5',
    type: "Document",
    name: 'Barack Obama Sr.',
    collection: '2',
    referrer: null,
    citee: null,
    spouse: null,
    position: {y: 10, x: 10}
  },
  
  {
    id: '6',
    type: "Document",
    name: 'Lolo Soetoro',
    collection: '2',
    referrer: null,
    citee: null,
    position: {y: 10, x: 300}
  },
  
  {
    id: '7',
    type: "Document",
    name: 'Stanley Ann Dunham',
    collection: '2',
    referrer: null,
    citee: null,
    position: {y: 35, x: 500}
  },
  
  {
    id: '8',
    type: "Document",
    name: 'Barack Obama',
    collection: '2',
    referrer: '7',
    citee: '5',

    position: {y: 200, x: 300}
  },
  
  {
    id: '9',
    type: "Document",
    name: 'Michelle Obama',
    collection: '2',
    referrer: null,
    citee: null,

    position: {y: 225, x: 500}
  },
  
  {
    id: '10',
    type: "Document",
    name: 'Malia Ann Obama',
    collection: '2',
    referrer: '9',
    citee: '8',

    position: {y: 400, x: 250}
  },
  
  {
    id: '11',
    type: "Document",
    name: 'Natasha Obama',
    collection: '2',
    referrer: '9',
    citee: '8',
    position: {y: 400, x: 550}
  }
];