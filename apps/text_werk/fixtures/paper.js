// ==========================================================================
// Project:   TextWerk.Paper Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TextWerk */

sc_require('models/paper');

TextWerk.Paper.FIXTURES = [
{
id: "L08-1001",
name: "",
type: "Paper",
title: "Unsupervised Relation Extraction From Web Papers", 
author: "Eichler, Kathrin; Hemsen, Holmer; Neumann, G¸nter",
venue: "LREC", 
year: 2008,
collection: '1',
referrer: null,
  citee: null
//position: {y: 10, x: 10}
},
{
id: "L08-1002",
name: "",
type: "Paper",
title: "Combining Multiple Models for Speech Information Retrieval", 
author: "Alzghool, Muath; Inkpen, Diana Zaiu",
venue: "LREC", 
year: 2008,
collection: '1',
referrer: '',
  citee: 'L08-1001'
//position: {y: 35, x: 300}
},
{
id: "L08-1003",
name: "",
type: "Paper",
title: "Event Detection and Summarization in Weblogs with Temporal Collocations", 
author: "Teng, Chun-Yuan; Chen, Hsin-Hsi",
venue: "LREC", 
year: 2008,
collection: '1',
referrer: '',
  citee: 'L08-1001'
//position: {y: 300, x: 10}
},
{
id: "L08-1004",
name: "",
type: "Paper",
title: "The Usage of Various Lexical Resources and Tools to Improve the Performance of Web Search Engines", 
author: "Krstev, Cvetana; Stankoviƒá, Ranka; Vitas, Du≈°ko; Obradoviƒá, Ivan",
venue: "LREC", 
year: 2008,
collection: '1',
referrer: '',
  citee: 'L08-1001'
//position: {y: 300, x: 300}
}

// {
//   id: '1',
//   type: "Paper",
//   name: 'John',
// title: 'Sample Title',
// author: "Miau Woo, John Long",
// year: '1994',
// venue: 'a good one',
//   collection: '1',
//   position: {y: 10, x: 10}
// },
//
// {
//   id: '2',
//   type: "Paper",
//   name: 'Nancy',
// title: 'Sample Title',
// author: "Miau Woo, John Long",
// year: '1994',
// venue: 'a good one',
//   collection: '1',
//   position: {y: 35, x: 300}
// },
//
// {
//   id: '3',
//   type: "Paper",
//   name: 'John Jr',
// title: 'Sample Title',
// author: "Miau Woo, John Long",
// year: '1994',
// venue: 'a good one',
//   collection: '1',
//   position: {y: 300, x: 10}
// },
//
// {
//   id: '4',
//   type: "Paper",
//   name: 'Penelope',
// title: 'Sample Title',
// author: "Miau Woo, John Long",
// year: '1994',
// venue: 'a good one',
//   collection: '1',
//   position: {y: 300, x: 300}
// }
];
