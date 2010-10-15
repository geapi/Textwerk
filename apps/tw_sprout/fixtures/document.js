sc_require('models/document');

TextWerk.Document.FIXTURES = [
  // ..........................................................
  // Doe Collection
  // 
  {
    id: '1',
    type: "Document",
    //name: 'Brief 1',
	"doc_type": "brief",
    "description": " Brief for the Lawyers' Committee for Civil Rights Under Law as Amicus Curiae ",
    "date": "Jun. 1976",
    "position": "undeclared",
    "name": "Case_6000_001",
    collection: '1',
    referrer: null,
    citee: null,

    position: {y: 10, x: 10}
  },
  
  {
    id: '2',
    type: "Document",
    name: 'Brief 2',
	"doc_type": "brief",
    "description": " Brief of American Subcontractors Association, Amicus Curiae in Support of Respondent ",
    "date": "Aug. 1976",
    "position": "Respondent",
    "name": "Case_6000_002",
    collection: '1',
    referrer: null,
    citee: null,
    position: {y: 35, x: 300}
  },
  
  {
    id: '3',
    type: "Document",
    name: 'Brief 3',
	"doc_type": "brief",
    "description": " Brief of Amercian Subcontractors Association, Amicus Curiae in Support of Respondent ",
    "date": "Oct. Term 1976",
    "position": "Respondent",
    "name": "Case_6000_003",
    collection: '1',
    referrer: '2',
    citee: '1',
    position: {y: 300, x: 10}
  },
  
  {
    id: '4',
    type: "Document",
    name: 'Brief 4',
	"doc_type": "brief",
    "description": " Brief of Amicus Curiae Young Americans for Freedom ",
    "date": "Oct. Term 1976",
    "position": "undeclared",
    "name": "Case_6000_004",
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
    name: 'Dcoument 1',
    collection: '2',
    referrer: null,
    citee: null,
    spouse: null,
    position: {y: 10, x: 10}
  },
  
  {
    id: '6',
    type: "Document",
    name: 'Document 2',
    collection: '2',
    referrer: null,
    citee: null,
    position: {y: 10, x: 300}
  },
  
  {
    id: '7',
    type: "Document",
    name: 'Document 3',
    collection: '2',
    referrer: null,
    citee: null,
    position: {y: 35, x: 500}
  },
  
  {
    id: '8',
    type: "Document",
    name: 'Document 3',
    collection: '2',
    referrer: '7',
    citee: '5',

    position: {y: 200, x: 300}
  },
  
  {
    id: '9',
    type: "Document",
    name: 'Document 4',
    collection: '2',
    referrer: null,
    citee: null,

    position: {y: 225, x: 500}
  },
  
  {
    id: '10',
    type: "Document",
    name: 'Document 5',
    collection: '2',
    referrer: '9',
    citee: '8',

    position: {y: 400, x: 250}
  },
  
  {
    id: '11',
    type: "Document",
    name: 'Document 6',
    collection: '2',
    referrer: '9',
    citee: '8',
    position: {y: 400, x: 550}
  }
];