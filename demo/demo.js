/* global bootstrap: false */
// sample : https://getbootstrap.com/docs/5.2/examples/cheatsheet/
// deep clone : https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript

(($) => {
  'use strict';

  // ===================================================================================================================

  // Generate content DOM

  function generate_aside_content(opt) {
    const id = opt.id;
    const title = opt.title;
    const menu = opt.menu;
    const ul = $(`<ul class="list-unstyled ps-3 collapse" id="${id}-collapse" />`);

    menu.forEach(el => {
      const li = $(`<li><a class="d-inline-flex align-items-center rounded text-decoration-none" href="#${el.id}">${el.title}</a></li>`);
      ul.append(li);
    });

    const section = $(`<li class="my-2">
      <button class="btn d-inline-flex align-items-center collapsed border-0" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#${id}-collapse" aria-controls="${id}-collapse">${title}</button>
    </li>`);

    return section.append(ul);
  }

  function generate_main_content(opt) {
    const id = opt.id;
    const title = opt.title;
    const menu = opt.menu;
    const sectionId = id.slice(0, id.length - 1);
    // console.log(id);
    // console.log(title);
    // console.log(menu);
    // console.log(sectionId);

    const section = $(`<section id="${sectionId}">
      <h2 class="sticky-xl-top fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">${title}</h2>
    </section>`);

    // TODO: insert official doc link
    const doc = 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html';

    menu.forEach(el => {
      /*/
      // in jqxTabs
      const article = $(`<article class="my-3" id="${el.id}">
        <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
          <h3>${el.title.replace(' (', '<br>(')}</h3>
          <a class="d-flex align-items-center" href="${doc}">Documentation</a>
        </div>

        <div class="position-relative grid-container">
          <div class="position-absolute w-100">
            <div class="tab-container">
              <ul>
                <li>Demo</li>
                <li>View Source</li>
              </ul>
              <div class="p-1">
                <div id="edg_${el.id}"></div>
              </div>
              <div>
                Source Code
              </div>
            </div>
          </div>
        </div>
      </article>`);
      /*/
      // in bootstrap card
      let article_class = 'my-3';

      if (el.is_last == 1)
        article_class += ' mb-5 pb-5';

      let desc = '';

      if (el.desc)
        desc = `<div class="card-header">${el.desc}</div>`;

      const article = $(`<article class="${article_class}" id="${el.id}">
        <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
          <h3>${el.title.replace(' (', '<br>(')}</h3>
          <a class="d-flex align-items-center" target="_blank" href="${doc}">Documentation</a>
        </div>

        <div class="position-relative">
          <div class="card">
            ${desc}
            <div class="card-body grid-container">
              <div id="edg_${el.id}"></div>
            </div>
            <div class="card-footer text-muted"><pre class="m-0">${el.sourcecode}</pre></div>
          </div>
        </div>
      </article>`);
      //*/

      section.append(article);

      // if (el.id == 'defaultfunc') {
      //   console.log(el.sourcecode);
      //   window.eval(el.sourcecode);
      // }
    });

    return section;
  }

  const toc = $('#toc');
  const toc_aside = toc.children(0);
  // toc_aside.empty();

  const main_body = $('.bd-cheatsheet')
  // main_body.empty();

  // Append default functionality
  const default_functionality_content = $(`<li><a class="d-inline-flex align-items-center rounded text-decoration-none" href="#defaultfunctionality">Default Functionality</a></li>`);
  // toc_aside.append(default_functionality_content);

  // Append aside content
  const aside_list = [
    {
      // Append default section
      id    : 'defaults',
      title : 'Default',
      menu  : [
        {
          id        : 'defaultfunc',
          title     : `Default Functionality`,
          doc       : null,
          desc      : `EnhanceDataGrid default showing row number with aggregate Row Total.`,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_defaultfunc',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  columngroups: [\n" +
            "    { text: 'Buyer Details', name: 'buyer' },\n" +
            "  ],\n" +
            "  dataSource  : source,\n" +
            "});",
        },
      ],
    },
    {
      // Append search input section
      id    : 'searchinputs',
      title : 'Search Input',
      menu  : [
        {
          id        : 'enterfilter',
          title     : `Filter ( Enter )`,
          doc       : null,
          desc      : `Property <i class="text-danger">searchInput : true</i> setup grid in Filter (Enter) mode [Default mode].
            Filter mode filters out unmatched data in the desire column.
            Simply sort the desire column, key in the keyword in the search input, then press ENTER.
            Press ESC to clear the filter.`,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_enterfilter',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  <i class='text-danger'>searchInput : true</i>,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
        },
        {
          id        : 'enterfind',
          title     : `Find ( Ctrl+Enter )`,
          doc       : null,
          desc      : `If you prefer 'Find' data instead of 'Filter' data, setup grid in Find mode using property <i class="text-danger">showFindButton : true</i>.
            The (Ctrl + Enter) keyboard shortcut feature is included with Find mode and can be enabled by setup the property <i class="text-danger">enterFind : true</i>.
            The example below shows a grid in pure find mode. `,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id              : '#edg_enterfind',\n" +
            "  buttonTheme     : 'material-purple',\n" +
            "  altrows         : true,\n" +
            "  <i class='text-danger'>searchInput     : true</i>,\n" +
            "  <i class='text-danger'>showFindButton  : true</i>,\n" +
            "  <i class='text-danger'>enterFind       : true</i>,\n" +
            "  <i class='text-danger'>showFilterButton: false</i>,\n" +
            "  <i class='text-danger'>enterFilter     : false</i>,\n" +
            "  columns         : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource      : source,\n" +
            "});",
        },
        {
          id        : 'enterfilterfind',
          title     : `Find & Fitler`,
          doc       : null,
          desc      : `Filter and Find modes can be enabled at the same time.`,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id            : '#edg_enterfilterfind',\n" +
            "  buttonTheme   : 'material-purple',\n" +
            "  altrows       : true,\n" +
            "  <i class='text-danger'>searchInput   : true</i>,\n" +
            "  <i class='text-danger'>showFindButton: true</i>,\n" +
            "  <i class='text-danger'>enterFind     : true</i>,\n" +
            "  columns       : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource    : source,\n" +
            "});",
        },
        {
          id        : 'autofilter',
          title     : `Auto Fitler`,
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_autofilter',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  searchInput : true,\n" +
            "  autoFilter  : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
        },
        {
          id        : 'autofind',
          title     : `Auto Find`,
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_autofind',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  searchInput : true,\n" +
            "  autoFind    : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
        },
        {
          id        : 'autodelaytiming',
          title     : `Auto Delay Timing`,
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id              : '#edg_autodelaytiming',\n" +
            "  buttonTheme     : 'material-purple',\n" +
            "  altrows         : true,\n" +
            "  searchInput     : true,\n" +
            "  autoFilter      : true,\n" +
            "  autoDelayTiming : 500,\n" +
            "  columns         : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource      : source,\n" +
            "});",
        },
        {
          id        : 'filterrow',
          title     : `Filter Row`,
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id                  : '#edg_filterrow',\n" +
            "  buttonTheme         : 'material-purple',\n" +
            "  altrows             : true,\n" +
            "  searchInput         : true,\n" +
            "  showfilterrow       : true,\n" +
            "  showFilterRowButton : false,\n" +
            "  columns             : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource          : source,\n" +
            "});",
        },
      ],
    },
    {
      // Append button components
      id    : 'tbelements',
      title : 'Components',
      menu  : [
        {
          id        : 'reloadbutton',
          title     : 'Reload Button',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_reloadbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  searchInput : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    { button: 'reload' },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'addbutton',
          title     : 'Add Button',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
        {
          id        : 'editbutton',
          title     : 'Edit Button',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
        {
          id        : 'deletebutton',
          title     : 'Delete Button',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
        {
          id        : 'printbutton',
          title     : 'Print Button',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_printbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    {\n" +
            "      button: 'print',\n" +
            "      text  : 'Documentation',\n" +
            "      url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html'\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'excelbutton',
          title     : 'Excel Button',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_excelbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    {\n" +
            "      button  : 'excel',\n" +
            "      filename: 'My_Excel_File',\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'csvbutton',
          title     : 'CSV Button',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_csvbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    {\n" +
            "      button  : 'csv',\n" +
            "      filename: 'My_CSV_File',\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'custombtnbutton',
          title     : 'Custom Button',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_custombtnbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    {\n" +
            "      button: 'custombutton',\n" +
            "      icon  : 'fa-solid fa-earth',\n" +
            "      text  : 'Hello World !',\n" +
            "      click : function() {\n" +
            "        window.alert('Hello World !');\n" +
            "      },\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'custombutton',
          title     : 'Custom Node',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_custombutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    {\n" +
            "      button    : 'custom',\n" +
            "      buttonNode: $('&lt;i class=\"text-primary\">Welcome to EnhanceDataGrid.js !</i>')\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'divider',
          title     : 'Divider',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_divider',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    { button : 'reload' },\n" +
            "    { button : 'divider' },\n" +
            "    {\n" +
            "      button: 'print',\n" +
            "      text  : 'Documentation',\n" +
            "      url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html'\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
        {
          id        : 'separator',
          title     : 'Separator',
          doc       : null,
          desc      : null,
          sourcecode:
            "new EnhanceDataGrid({\n" +
            "  id          : '#edg_separator',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    { button : 'reload' },\n" +
            "    { button : 'separator' },\n" +
            "    {\n" +
            "      button: 'custombutton',\n" +
            "      icon  : 'none',\n" +
            "      text  : 'Oh no... Do not leave me T_T',\n" +
            "    },\n" +
            "  ]\n" +
            "});",
        },
      ],
    },
    // {
    //   // Append other components
    //   id    : 'othercomponents',
    //   title : 'Other Components',
    //   menu  : [
    //     { id: 'divider',    title: 'Divider' },
    //     { id: 'separator',  title: 'Separator' },
    //   ],
    // },
    {
      // Append data source
      id    : 'datasources',
      title : 'Data Sources',
      menu  : [
        {
          id        : 'jsonsource',
          title     : 'JSON Source',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
        {
          id        : 'datasource',
          title     : 'DataSource',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
        {
          id        : 'dataadapter',
          title     : 'DataAdapter',
          doc       : null,
          desc      : null,
          sourcecode: '',
        },
      ],
    },
  ];

  aside_list.forEach((item, index) => {
    // console.log(item);

    if (aside_list.length == (index + 1))
      item.menu[item.menu.length - 1].is_last = 1;

    //*/
    toc_aside.append(generate_aside_content(item));
    main_body.append(generate_main_content(item))
    /*/
    toc_aside.prepend(generate_aside_content(item));
    main_body.prepend(generate_main_content(item));
    //*/
  });

  // ===================================================================================================================

  // Init EnhanceDataGrid

  const combodata = [
    {
      "CustomerID": "ALFKI",
      "CompanyName": "Alfreds Futterkiste",
      "ContactName": "Maria Anders",
      "ContactTitle": "Sales Representative",
      "Address": "Obere Str. 57",
      "City": "Berlin",
      "Country": "Germany"
    }, {
      "CustomerID": "ANATR",
      "CompanyName": "Ana Trujillo Emparedados y helados",
      "ContactName": "Ana Trujillo",
      "ContactTitle": "Owner",
      "Address": "Avda. de la Constitucin 2222",
      "City": "Mxico D.F.",
      "Country": "Mexico"
    }, {
      "CustomerID": "ANTON",
      "CompanyName": "Antonio Moreno Taquera",
      "ContactName": "Antonio Moreno",
      "ContactTitle": "Owner",
      "Address": "Mataderos 2312",
      "City": "Mxico D.F.",
      "Country": "Mexico"
    }, {
      "CustomerID": "AROUT",
      "CompanyName": "Around the Horn",
      "ContactName": "Thomas Hardy",
      "ContactTitle": "Sales Representative",
      "Address": "120 Hanover Sq.",
      "City": "London",
      "Country": "UK"
    }, {
      "CustomerID": "BERGS",
      "CompanyName": "Berglunds snabbkp",
      "ContactName": "Christina Berglund",
      "ContactTitle": "Order Administrator",
      "Address": "Berguvsvgen 8",
      "City": "Lule",
      "Country": "Sweden"
    }, {
      "CustomerID": "BLAUS",
      "CompanyName": "Blauer See Delikatessen",
      "ContactName": "Hanna Moos",
      "ContactTitle": "Sales Representative",
      "Address": "Forsterstr. 57",
      "City": "Mannheim",
      "Country": "Germany"
    }, {
      "CustomerID": "BLONP",
      "CompanyName": "Blondesddsl pre et fils",
      "ContactName": "Frdrique Citeaux",
      "ContactTitle": "Marketing Manager",
      "Address": "24, place Klber",
      "City": "Strasbourg",
      "Country": "France"
    }, {
      "CustomerID": "BOLID",
      "CompanyName": "Blido Comidas preparadas",
      "ContactName": "Martn Sommer",
      "ContactTitle": "Owner",
      "Address": "C/ Araquil, 67",
      "City": "Madrid",
      "Country": "Spain"
    }, {
      "CustomerID": "BONAP",
      "CompanyName": "Bon app'",
      "ContactName": "Laurence Lebihan",
      "ContactTitle": "Owner",
      "Address": "12, rue des Bouchers",
      "City": "Marseille",
      "Country": "France"
    }, {
      "CustomerID": "BOTTM",
      "CompanyName": "Bottom-Dollar Markets",
      "ContactName": "Elizabeth Lincoln",
      "ContactTitle": "Accounting Manager",
      "Address": "23 Tsawassen Blvd.",
      "City": "Tsawassen",
      "Country": "Canada"
    }, {
      "CustomerID": "BSBEV",
      "CompanyName": "B's Beverages",
      "ContactName": "Victoria Ashworth",
      "ContactTitle": "Sales Representative",
      "Address": "Fauntleroy Circus",
      "City": "London",
      "Country": "UK"
    }, {
      "CustomerID": "CACTU",
      "CompanyName": "Cactus Comidas para llevar",
      "ContactName": "Patricio Simpson",
      "ContactTitle": "Sales Agent",
      "Address": "Cerrito 333",
      "City": "Buenos Aires",
      "Country": "Argentina"
    }, {
      "CustomerID": "CENTC",
      "CompanyName": "Centro comercial Moctezuma",
      "ContactName": "Francisco Chang",
      "ContactTitle": "Marketing Manager",
      "Address": "Sierras de Granada 9993",
      "City": "Mxico D.F.",
      "Country": "Mexico"
    }, {
      "CustomerID": "CHOPS",
      "CompanyName": "Chop-suey Chinese",
      "ContactName": "Yang Wang",
      "ContactTitle": "Owner",
      "Address": "Hauptstr. 29",
      "City": "Bern",
      "Country": "Switzerland"
    }, {
      "CustomerID": "COMMI",
      "CompanyName": "Comrcio Mineiro",
      "ContactName": "Pedro Afonso",
      "ContactTitle": "Sales Associate",
      "Address": "Av. dos Lusadas, 23",
      "City": "Sao Paulo",
      "Country": "Brazil"
    }, {
      "CustomerID": "CONSH",
      "CompanyName": "Consolidated Holdings",
      "ContactName": "Elizabeth Brown",
      "ContactTitle": "Sales Representative",
      "Address": "Berkeley Gardens 12 Brewery",
      "City": "London",
      "Country": "UK"
    }, {
      "CustomerID": "DRACD",
      "CompanyName": "Drachenblut Delikatessen",
      "ContactName": "Sven Ottlieb",
      "ContactTitle": "Order Administrator",
      "Address": "Walserweg 21",
      "City": "Aachen",
      "Country": "Germany"
    }, {
      "CustomerID": "DUMON",
      "CompanyName": "Du monde entier",
      "ContactName": "Janine Labrune",
      "ContactTitle": "Owner",
      "Address": "67, rue des Cinquante Otages",
      "City": "Nantes",
      "Country": "France"
    }, {
      "CustomerID": "EASTC",
      "CompanyName": "Eastern Connection",
      "ContactName": "Ann Devon",
      "ContactTitle": "Sales Agent",
      "Address": "35 King George",
      "City": "London",
      "Country": "UK"
    }, {
      "CustomerID": "ERNSH",
      "CompanyName": "Ernst Handel",
      "ContactName": "Roland Mendel",
      "ContactTitle": "Sales Manager",
      "Address": "Kirchgasse 6",
      "City": "Graz",
      "Country": "Austria"
    }
  ];

  // prepare the data
  const data = new Array();
  const firstNames = [
    "Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
  ];
  const lastNames = [
    "Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
  ];
  const productNames = [
    "Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"
  ];
  const priceValues = [
    "2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"
  ];

  // https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  for (let i = 0; i < 100; i++) {
    const row = {};
    const productindex = Math.floor(Math.random() * productNames.length);
    const price = parseFloat(priceValues[productindex]);
    const quantity = 1 + Math.round(Math.random() * 10);

    row["id"] = i + 1;
    row["selected"] = i < 10 ? 1 : 0;
    row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
    row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
    row["productname"] = productNames[productindex];
    row["salesdate"] = randomDate(new Date(2022, 0, 1), new Date());
    row["price"] = price;
    row["quantity"] = quantity;
    row["total"] = price * quantity;
    data[i] = row;
  }

  const source = {
    localdata: data,
    localdata: JSON.parse(JSON.stringify(data)),
    datatype: "array",
    datafields: [
      { name: 'id', type: 'number' },
      { name: 'selected', type: 'number' },
      { name: 'firstname', type: 'string' },
      { name: 'lastname', type: 'string' },
      { name: 'productname', type: 'string' },
      { name: 'salesdate', type: 'date' },
      { name: 'quantity', type: 'number' },
      { name: 'price', type: 'number' },
      { name: 'total', type: 'number' }
    ]
  };
  // var dataAdapter = new $.jqx.dataAdapter(source);
  const dateFormat = 'yyyy-MM-dd';
  // const dateFormat = 'd';
  const columns = [
    { text: 'Name', datafield: 'firstname', width: 100, editable: false, columngroup: 'buyer' },
    { text: 'Last Name', datafield: 'lastname', width: 100, editable: false, columngroup: 'buyer' },
    { text: 'Product', datafield: 'productname', minWidth: 200, editable: false },
    { text: 'Sales Date', datafield: 'salesdate', width: 100, align: 'center', cellsalign: 'center', cellsformat: dateFormat, editable: false },
    { text: 'Quantity', datafield: 'quantity', width: 80, align: 'right', cellsalign: 'right', editable: false },
    { text: 'Unit Price', datafield: 'price', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', editable: false },
    { text: 'Total', datafield: 'total', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', editable: false },
    { text: 'Check', datafield: 'selected', width: 50, columntype: 'checkbox' },
  ];

  // =============================================================================================================

  /**
   * Official Content
   */

  /* $('.tab-container').jqxTabs({
    theme: 'material',
    width: '100%',
    height: 300,
    // position: 'top'
  }); */

  // Default Functionality
  const edg_defaultfunc = new EnhanceDataGrid({
    id          : '#edg_defaultfunc',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    columngroups: [
      { text: 'Buyer Details', name: 'buyer' },
    ],
    dataSource  : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Filter Data
  const edg_enterfilter = new EnhanceDataGrid({
    id          : '#edg_enterfilter',
    buttonTheme : 'material-purple',
    altrows     : true,
    searchInput : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Find Data
  const edg_enterfind = new EnhanceDataGrid({
    id              : '#edg_enterfind',
    buttonTheme     : 'material-purple',
    altrows         : true,
    searchInput     : true,
    showFindButton  : true,
    enterFind       : true,
    showFilterButton: false,
    enterFilter     : false,
    columns         : JSON.parse(JSON.stringify(columns)),
    dataSource      : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Find/Filter Data
  const edg_enterfilterfind = new EnhanceDataGrid({
    id            : '#edg_enterfilterfind',
    buttonTheme   : 'material-purple',
    altrows       : true,
    searchInput   : true,
    showFindButton: true,
    enterFind     : true,
    columns       : JSON.parse(JSON.stringify(columns)),
    dataSource    : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Auto Filter Data
  const edg_autofilter = new EnhanceDataGrid({
    id          : '#edg_autofilter',
    buttonTheme : 'material-purple',
    altrows     : true,
    searchInput : true,
    autoFilter  : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Auto Find Data
  const edg_autofind = new EnhanceDataGrid({
    id          : '#edg_autofind',
    buttonTheme : 'material-purple',
    altrows     : true,
    searchInput : true,
    autoFind    : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Auto Delay Timing
  const edg_autodelaytiming = new EnhanceDataGrid({
    id              : '#edg_autodelaytiming',
    buttonTheme     : 'material-purple',
    altrows         : true,
    searchInput     : true,
    autoFilter      : true,
    autoDelayTiming : 500,
    columns         : JSON.parse(JSON.stringify(columns)),
    dataSource      : JSON.parse(JSON.stringify(source)),
  });

  // Search Input : Filter Row
  const edg_filterrow = new EnhanceDataGrid({
    id                  : '#edg_filterrow',
    buttonTheme         : 'material-purple',
    altrows             : true,
    searchInput         : true,
    showfilterrow       : true,
    showFilterRowButton : false,
    columns             : JSON.parse(JSON.stringify(columns)),
    dataSource          : JSON.parse(JSON.stringify(source)),
  });

  // Component : Reload
  const edg_reloadbutton = new EnhanceDataGrid({
    id          : '#edg_reloadbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button: 'reload' },
    ]
  });

  // Component : Add
  const edg_addbutton = new EnhanceDataGrid({
    id          : '#edg_addbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button: 'add' },
    ]
  });

  // Component : Edit
  const edg_editbutton = new EnhanceDataGrid({
    id          : '#edg_editbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button: 'edit' },
    ]
  });

  // Component : Delete
  const edg_deletebutton = new EnhanceDataGrid({
    id          : '#edg_deletebutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button: 'delete' },
    ]
  });

  // Component : Print
  const edg_printbutton = new EnhanceDataGrid({
    id          : '#edg_printbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      {
        button: 'print',
        text  : 'Documentation',
        url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html'
      },
    ]
  });

  // Component : Excel
  const edg_excelbutton = new EnhanceDataGrid({
    id          : '#edg_excelbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      {
        button  : 'excel',
        filename: 'My_Excel_File',
      },
    ]
  });

  // Component : CSV
  const edg_csvbutton = new EnhanceDataGrid({
    id          : '#edg_csvbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      {
        button  : 'csv',
        filename: 'My_CSV_File',
      },
    ]
  });

  // Component : Custom Button
  const edg_custombtnbutton = new EnhanceDataGrid({
    id          : '#edg_custombtnbutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      {
        button: 'custombutton',
        icon  : 'fa-solid fa-earth',
        text  : 'Hello World !',
        click : function() {
          window.alert('Hello World !');
        },
      },
    ]
  });

  // Component : Custom Node
  const edg_custombutton = new EnhanceDataGrid({
    id          : '#edg_custombutton',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      {
        button    : 'custom',
        buttonNode: $(`<i class="text-primary">Welcome to EnhanceDataGrid.js !</i>`)
      },
    ]
  });

  // Component : Divider
  const edg_divider = new EnhanceDataGrid({
    id          : '#edg_divider',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button : 'reload' },
      { button : 'divider' },
      {
        button: 'print',
        text  : 'Documentation',
        url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html'
      },
    ]
  });

  // Component : Divider
  const edg_separator = new EnhanceDataGrid({
    id          : '#edg_separator',
    buttonTheme : 'material-purple',
    altrows     : true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button : 'reload' },
      { button : 'separator' },
      {
        button: 'custombutton',
        icon  : 'none',
        text  : 'Oh no... Do not leave me T_T',
      },
    ]
  });

  // ===================================================================================================================

  // Tooltip and popover demos
  document.querySelectorAll('.tooltip-demo')
    .forEach(tooltip => {
      new bootstrap.Tooltip(tooltip, {
        selector: '[data-bs-toggle="tooltip"]'
      });
    });

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
      new bootstrap.Popover(popover);
    });

  document.querySelectorAll('.toast')
    .forEach(toastNode => {
      const toast = new bootstrap.Toast(toastNode, {
        autohide: false
      });

      toast.show();
    });

  // Disable empty links and submit buttons
  document.querySelectorAll('[href="#"], [type="submit"]')
    .forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
      });
    });

  function setActiveItem() {
    const { hash } = window.location;

    if (hash === '') {
      return;
    }

    const link = document.querySelector(`.bd-aside a[href="${hash}"]`);

    if (!link) {
      return;
    }

    const active = document.querySelector('.bd-aside .active');
    const parent = link.parentNode.parentNode.previousElementSibling;

    link.classList.add('active');

    if (parent.classList.contains('collapsed')) {
      parent.click();
    }

    if (!active) {
      return;
    }

    const expanded = active.parentNode.parentNode.previousElementSibling;

    active.classList.remove('active');

    if (expanded && parent !== expanded) {
      expanded.click();
    }
  }

  setActiveItem();
  window.addEventListener('hashchange', setActiveItem);
})(jQuery)
