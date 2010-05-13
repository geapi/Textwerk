// ==========================================================================
// Project:   TwSprout.Pubmed Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TwSprout */

sc_require('models/pubmed');

TwSprout.Pubmed.FIXTURES = [
  
  	{guid: 1, 
	authors: "Selvendiran K, Tong L, Bratasz A, Kuppusamy ML, Ahmed S, Ravi Y, Trigg NJ, Rivera BK, Kálai T, Hideg K, Kuppusamy P.", 
	title: "Anticancer Efficacy of a Difluorodiarylidenyl Piperidone (HO-3867) in Human Ovarian Cancer Cells and Tumor Xenografts", 
	date: "2010 May 4", 
	pmid: "20442315"},


	{guid: 2, 
	 authors: "Delassus GS, Cho H, Hoang S, Eliceiri GL.", title: "Many new down- and up-regulatory signaling pathways, from known cancer progression suppressors to matrix metalloproteinases, differ widely in cells of various cancers",
	date: "2010 Apr 15", 
	pmid: "20432456"},


	{guid: 3, 
	authors: "Kuhn E, Meeker A, Wang TL, Sehdev AS, Kurman RJ, Shih IM.", 
	title: "Shortened Telomeres in Serous Tubal Intraepithelial Carcinoma: An Early Event in Ovarian High-grade Serous Carcinogenesis", 
	date: "2010 Apr 28",
	pmid: "20431479"},


	{guid: 4, 
	authors: "Sertel S, Eichhorn T, Simon CH, Plinkert PK, Johnson SW, Efferth T.",
	title: "Pharmacogenomic identification of c-Myc/Max-regulated genes associated with cytotoxicity of artesunate towards human colon, ovarian and lung cancer cell lines",
    date: "2010 Apr 22;15(4):2886-910", 
	pmid: "20428086"},


	{guid: 5, 
	authors: "Malisic E, Jankovic R, Slavkovic D, Milovic-Kovacevic M, Radulovic S.", 
	title: "p53 gene mutations and codon 72 polymorphism in ovarian carcinoma patients from Serbia", 
	date: "2010 Jan-Mar;15(1):101-6", 
	pmid: "20414935"}

  
  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.
  



  // { guid: 1,
  //   firstName: "Michael",
  //   lastName: "Scott" },
  //
  // { guid: 2,
  //   firstName: "Dwight",
  //   lastName: "Schrute" },
  //
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('tw_sprout');