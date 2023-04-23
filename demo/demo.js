/* global bootstrap: false */
// sample : https://getbootstrap.com/docs/5.2/examples/cheatsheet/
// deep clone : https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
/*
pretty js : http://hilite.me/
border CSS : border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;
style : friendly
*/

(($) => {
  'use strict';

  const config_ace_monokai_js = {
    // theme               : 'ace/theme/monokai',
    // theme               : 'ace/theme/one_dark',
    // theme               : 'ace/theme/dawn',
    theme               : 'ace/theme/iplastic',
    mode                : 'ace/mode/javascript',
    selectionStyle      : 'text',
    readOnly            : true,
    maxLines            : Infinity,
    highlightActiveLine : false,
  };

  // ===================================================================================================================

  // Generate content DOM

  function generate_aside_content(opt) {
    const id    = opt.id;
    const title = opt.title;
    const menu  = opt.menu;
    const ul    = $(`<ul class="list-unstyled ps-3 collapse" id="${id}-collapse" />`);

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
    const id        = opt.id;
    const title     = opt.title;
    const menu      = opt.menu;
    const sectionId = id.slice(0, id.length - 1);
    // console.log(id);
    // console.log(title);
    // console.log(menu);
    // console.log(sectionId);

    const section = $(`<section id="${sectionId}">
      <h2 class="sticky-xl-top fw-bold pt-3 pt-xl-5 pb-2 pb-xl-3">${title}</h2>
    </section>`);

    // TODO: insert official doc link
    const doc = 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html';

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

      let body = `<div id="edg_${el.id}"></div>`;

      if (el.ratio) {
        const ratio     = el.ratio.split(',');
        const flex_body = $(`<div class="d-flex flex-row h-100"></div>`);

        ratio.forEach((rate, index) => {
          const numb = index + 1;
          let box = $(`<div id="edg_${el.id}_box${numb}" class="col-${rate} _border"></div>`);

          // first box is always the EDG demo
          if (index == 0)
            box = $(`<div id="edg_${el.id}_box${numb}" class="col-${rate} _border">
              <div id="edg_${el.id}"></div>
            </div>`);

          flex_body.append(box);
        });

        body = flex_body[0].outerHTML;
      }

      let desc = '';

      if (el.desc)
        desc = `<div class="card-header">${el.desc}</div>`;

      /*/
      let sourcecode = '';

      if (el.sourcecode)
        sourcecode =
          `<div class="card-footer text-muted">
            <pre class="m-0">${el.sourcecode}</pre>
          </div>`;

      if (el.colorcode)
        sourcecode =
          `<div class="card-footer text-muted overflow-hidden p-0">
            ${el.colorcode}
          </div>`;
      //*/

      let sourcecode =
        `<div class="card-footer p-0 overflow-hidden">
          <div id="ace_${el.id}"></div>
        </div>`;

      let doc = el.doc;

      if (!doc)
        doc = 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html';

      let article = $(`<article class="${article_class}" id="${el.id}">
        <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
          <h3>${el.title.replace(' (', '<br>(')}</h3>
          <a class="d-flex align-items-center" target="_blank" href="${doc}">Documentation</a>
        </div>

        <div class="position-relative">
          <div class="card">
            ${desc}
            <div class="card-body grid-container position-relative">
              <div class="d-grid">
                <button type="button"
                  class="btn btn-outline-danger"
                  id="btn_activate_${el.id}"
                  data-section="${opt.id}"
                  data-value="${el.id}"
                  disabled
                >Run Code</button>
              </div>
              ${body}
            </div>
            ${sourcecode}
          </div>
        </div>
      </article>`);

      if (el.static) {
        if (el.desc)
          desc = `<div class="card-body">${el.desc}</div>`;

        article = $(`<article class="${article_class}" id="${el.id}">
          <div class="bd-heading sticky-xl-top align-self-start mt-5 mb-3 mt-xl-0 mb-xl-2">
            <h3>${el.title.replace(' (', '<br>(')}</h3>
            <a class="d-flex align-items-center" target="_blank" href="${doc}">Documentation</a>
          </div>

          <div class="position-relative">
            <div class="card">
              ${desc}
              ${sourcecode}
            </div>
          </div>
        </article>`);
      }

      section.append(article);

      const syntax = `syntax/${id}_${el.id}.txt`;

      $.get(syntax)
      .done(function(rText, success, event) {
        const editor = ace.edit(`ace_${el.id}`, config_ace_monokai_js);

        editor.session.setValue(rText);

        $(`#btn_activate_${el.id}`).prop('disabled', false);
      })
      .fail(function(event, error, errMsg) {
        console.log(event);
        console.log(error);
        console.log(errMsg);
      });
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


  $.get('syntax/defaultfunc.txt')
  .done(function(rText, success, event) {
    const editor = ace.edit('ace_defaultfunc', config_ace_monokai_js);
    editor.session.setValue(rText);
  })
  .fail(function(event, error, errMsg) {
    console.log(event);
    console.log(error);
    console.log(errMsg);
  });

  // $(document).ready(function() {});

  // Append aside content
  const aside_list = [
    // {
    //   // Append default section
    //   id    : 'defaults',
    //   title : 'Default',
    //   menu  : [
    //     {
    //       id    : 'defaultfunc',
    //       title : `Default Functionality`,
    //       doc   : null,
    //       desc  : `EnhanceDataGrid default showing row number with aggregate Row Total.`,
    //     },
    //   ],
    // },
    {
      // Append search input section
      id    : 'searchinputs',
      title : 'Search Input',
      menu  : [
        {
          id    : 'enterfilter',
          title : `Filter ( Enter )`,
          doc   : null,
          desc  : `Property <i class="text-danger">searchInput : true</i> setup grid in Filter (Enter) mode [Default mode].
            Filter mode filters out unmatched data in the desire column.
            Simply sort the desire column, key in the keyword in the search input, then press ENTER.
            Press ESC to clear the filter.`,
          init  : function() {
            // Search Input : Filter Data
            const edg_enterfilter = new EnhanceDataGrid({
              id          : '#edg_enterfilter',
              buttonTheme : 'material-purple',
              altrows     : true,
              searchInput : true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
            });
          },
        },
        {
          id    : 'enterfind',
          title : `Find ( Ctrl+Enter )`,
          doc   : null,
          desc  : `If you prefer 'Find' data instead of 'Filter' data, setup grid in Find mode using property <i class="text-danger">showFindButton : true</i>.
            The (Ctrl + Enter) keyboard shortcut feature is included with Find mode and can be enabled by setup the property <i class="text-danger">enterFind : true</i>.
            The example below shows a grid in pure Find mode. `,
          init  : function() {
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
          },
        },
        {
          id    : 'enterfilterfind',
          title : `Find & Fitler`,
          doc   : null,
          desc  : `Filter and Find modes can be enabled at the same time.`,
          init  : function() {
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
          },
        },
        {
          id    : 'autofilter',
          title : `Auto Fitler`,
          doc   : null,
          desc  : `Auto Filter enables automatic data filtering after user input.`,
          init  : function() {
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
          },
        },
        {
          id    : 'autofind',
          title : `Auto Find`,
          doc   : null,
          desc  : `Auto Find enables automatic data finding after user input.`,
          init  : function() {
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
          },
        },
        {
          id    : 'autodelaytiming',
          title : `Auto Delay Timing`,
          doc   : null,
          desc  : `Auto Filter/Find performs data filtering/finding after certain amount of time after user input.
            The delay timing can be altered by setting the property <i class="text-danger">autoDelayTiming</i>.`,
          init  : function() {
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
          },
        },
        {
          id    : 'filterrow',
          title : `Filter Row`,
          doc   : null,
          desc  : `The Search Input comes with a Filter Row show/hide control button.
            Property <i class="text-danger">showFilterRowButton</i> controls the Filter Row button's visibility.
            The example below enables the Filter Row and hides the Filter Row control button.`,
          init  : function() {
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
          },
        },
      ],
    },
    {
      // Append button components
      id    : 'tbelements',
      title : 'Components',
      menu  : [
        {
          id    : 'reloadbutton',
          title : 'Reload Button',
          doc   : null,
          desc  : `The Reload button will update the bound data, refresh the grid, and clear all row selections.
            If the data source is binding to an URL, it will trigger the AJAX request to re-get the bound data.`,
          init  : function() {
            // Components : Reload
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
          },
        },
        {
          id    : 'addbutton',
          title : 'Add Button',
          doc   : null,
          desc: `The Add button comes with some useful features.
            <ul>
              <li>You can set the <i class="text-danger">click</i> property with your self-defined function.</li>
              <li>Setting the <i class="text-danger">win</i> property with an ID will auto-open related jQWidget's jqxWndow widget.</li>
              <li>Setting the <i class="text-danger">modal</i> property with an ID will auto-open related Bootstrap Modal.</li>
              <li>Setting the <i class="text-danger">form</i> property with an ID will auto-clear all the relevant inputs within the form tag.</li>
            </ul>`,
          init  : function() {
            function disableScroll() {
              // Get the current page scroll position
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

              // if any scroll is attempted, set this to the previous value
              window.onscroll = function () {
                window.scrollTo(scrollLeft, scrollTop);
              };

              console.log('run me')
            }

            function enableScroll() {
              window.onscroll = function () { };
            }

            // Components : Add
            const edg_addbutton = new EnhanceDataGrid({
              id          : '#edg_addbutton',
              buttonTheme : 'material-purple',
              altrows     : true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
              tbElement   : [
                { button: 'add',
                  click: function() {
                    window.alert('You clicked the add button');
                  },
                },
                { button: 'add',
                  text: 'Open jqxWindow',
                  win: '#edg_jqxWindow',
                  form: '#exampleJqwidgetsForm',
                },
                // TODO: page auto-scroll to top, why ??? may need enhance to calculate the centered position by myself
                // { button: 'add',
                //   text: 'Open jqxWindow (Centered)',
                //   win: '#edg_jqxWindow',
                //   winOpenOnButton: false,
                //   // beforeClick: function() {
                //   //   disableScroll();
                //   //   console.log('hey run')
                //   // }
                // },
                { button: 'add',
                  text: 'Open Modal',
                  modal: '#exampleModal',
                  form: '#exampleBootstrapForm',
                },
              ]
            });
          },
        },
        {
          id    : 'editbutton',
          title : 'Edit Button',
          doc   : null,
          desc  : `The Edit button has the same features as the Add button except that it does not support the <i class="text-danger">form</i> property.
            There are two properties which are very useful in Edit button :
            <ul>
              <li><i class="text-danger">beforeClick</i> property, which supports a callback function for the Edit button click-keydown event</li>
              <li><i class="text-danger">afterClick</i> property, which supports a callback function for the Edit button click-keyup event</li>
            </ul>
            Please take note that the <i class="text-danger">win</i>/<i class="text-danger">modal</i> property that auto-open <i class="text-black">jqxWindow</i>/<i class="text-black">Modal</i> happened between the click-keydown and click-keyup events.<br /><br />
            When click on Edit button, event trigger sequence : <i>click-keydown</i> <i class="fa-solid fa-chevron-right"></i> <i>auto-open</i> <i class="fa-solid fa-chevron-right"></i> <i>click-keyup</i>.`,
          init  : function() {
            // Components : Edit
            const edg_editbutton = new EnhanceDataGrid({
              id          : '#edg_editbutton',
              buttonTheme : 'material-purple',
              altrows     : true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
              tbElement   : [
                { button: 'edit',
                  click: function() {
                    window.alert('You clicked the edit button');
                  },
                },
                { button: 'edit',
                  text: 'Open jqxWindow',
                  win: '#edg_jqxWindow',
                  beforeClick: function() {
                    $('#jqxInput').val('new hello world');

                    $('#jqxDateTimeInput').val('2022-12-31');

                    $('#jqxCheckBox').val(true);
                    $('#jqxCheckBox2').val(true);
                    $('#jqxCheckBox3').val(true);

                    $('#jqxRadioButton').val(true);

                    $('#jqxComboBox').val('Hanna Moos');

                    $('#jqxTextArea').val('new hello world');
                  },
                },
                { button: 'edit',
                  text: 'Open Modal',
                  modal: '#exampleModal',
                  beforeClick: function() {
                    $('#input').val('tesing abc');

                    $('#date').val('2022-12-31');

                    $('#checksDefault').prop('checked', true);
                    $('#checksChecked').prop('checked', false);

                    $('#flexRadioDefault1').prop('checked', true);

                    $('#select').val(3);

                    $('#textarea').val('new hello world');
                  },
                },
              ]
            });
          },
        },
        {
          id    : 'deletebutton',
          title : 'Delete Button',
          doc   : null,
          desc  : `The Delete button comes with some useful features to deal with AJAX request.
            <ul>
              <li>Setting the <i class="text-danger">url</i> property in <i class="text-primary">String</i> will fire POST AJAX with selected row's ID appended as URL query string.</li>
              <li>Setting the <i class="text-danger">url</i> property with a <i class="text-primary">Function</i> will receive two arguments: function(<i class="text-success">selected_row_data</i>, <i class="text-success">selected_row_data_id</i>).</li>
              <li>If you would like to have some checking done before firing default POST AJAX, set the <i class="text-danger">check</i> property with a <i class="text-primary">Function</i>, then return true to continue POST and vice versa.</li>
              <li>Setting the <i class="text-danger">param</i> property in an Object will have it appended as static query string to the POST AJAX.</li>
              <li>If you would like to append some dynamic query string, setthe param property with a <i class="text-primary">Function</i> and return with an Object.</li>
            </ul>`,
          init  : function() {
            // Components : Delete
            const edg_deletebutton = new EnhanceDataGrid({
              id          : '#edg_deletebutton',
              buttonTheme : 'material-purple',
              altrows     : true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
              tbElement   : [
                { button: 'delete',
                  debug: true, // TODO: need specified in doc that 'debug' only works when 'url' is 'string'
                  text: "url in '<b><i>string</i></b>'",
                  url: 'post_delete.php?mod=delete_data',
                },
                { button: 'delete',
                  text: "url in '<b><i>function</i></b>'",
                  title: 'View result in console',
                  url: function(data, id) {
                    window.alert(`Selected Row ID : ${id}. Continue with your own coding...`);
                    console.warn(`Selected Row ID : ${id}`);
                    console.warn('Selected Row Data :');
                    console.log(data);
                  }
                },
                { button: 'delete',
                  debug: true,
                  text: '<b><i>check</i></b> function',
                  url: 'delete.php',
                  check: function() {
                    const passed = edg_deletebutton.getSelectedRowData().id % 2 == 0;

                    if (passed)
                      window.alert('Checking passed, continue delete progress.');
                    else
                      $.alert({
                        columnClass       : 'medium',
                        animation         : 'zoom',
                        closeAnimation    : 'zoom',
                        animateFromElement: false,
                        backgroundDismiss : true,
                        escapeKey         : true,
                        title             : '',
                        content           :'Odd row return <span style="color:red;">false</span>, click on even row to return <span style="color:blue;">true</span>.',
                      });

                    return passed
                      ? true
                      : false;
                  }
                },
                { button: 'delete',
                  debug: true,
                  text: 'static <b><i>param</i></b>',
                  title: 'View result in console',
                  url: 'delete.php',
                  param: { p1: 1, p2: 2 },
                },
                { button: 'delete',
                  debug: true,
                  text: 'dynamic <b><i>param</i></b>',
                  title: 'View result in console',
                  url: 'delete.php',
                  param: function() {
                    return {
                      random: (Math.random() * 100).toFixed(2)
                    };
                  }
                },
                // { button: 'delete'
                // },
              ]
            });
          },
        },
        {
          id    : 'printbutton',
          title : 'Print Button',
          doc   : null,
          desc  : `The Print button open URL in new window tab.`,
          init  : function() {
            // Components : Print
            const edg_printbutton = new EnhanceDataGrid({
              id          : '#edg_printbutton',
              buttonTheme : 'material-purple',
              altrows     : true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
              tbElement   : [
                {
                  button: 'print',
                  text  : 'Open Documentation',
                  url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html'
                },
              ]
            });
          },
        },
        {
          id    : 'excelbutton',
          title : 'Excel Button',
          doc   : null,
          desc  : `The Excel button exports the bound data to an Excel file.`,
          init  : function() {
            // Components : Excel
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
          },
        },
        {
          id    : 'csvbutton',
          title : 'CSV Button',
          doc   : null,
          desc  : `The CSV button exports the bound data to a CSV file.`,
          init  : function() {
            // Components : CSV
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
          },
        },
        {
          id    : 'custombtnbutton',
          title : 'Custom Button',
          doc   : null,
          desc  : `You can use the CustomButton button to create your customised button.`,
          init  : function() {
            // Components : Custom Button
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
          },
        },
        {
          id    : 'custombutton',
          title : 'Custom Node',
          doc   : null,
          desc  : `You can use the Custom button to create your own element.`,
          init  : function() {
            // Components : Custom Node
            const edg_custombutton = new EnhanceDataGrid({
              id          : '#edg_custombutton',
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
          },
        },
        {
          id    : 'divider',
          title : 'Divider',
          doc   : null,
          desc  : `Divider is used to expand the space between two elements.`,
          init  : function() {
            // Components : Divider
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
                  url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html'
                },
              ]
            });
          },
        },
        {
          id    : 'separator',
          title : 'Separator',
          doc   : null,
          desc  : 'Separator create a gap between two elements.',
          init  : function() {
            // Components : Divider
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
          },
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
          id    : 'json_source',
          title : 'JSON Source',
          doc   : null,
          desc  : `Property <i class="text-danger">jsonSource</i> is the simplest data source declaration.
            It is the same as the <i class="text-danger">dataSource</i> property with preset options : { datatype: 'json', id: 'id', cache: false }.
            You just need to specify the object property <i class="text-danger">url</i> and <i class="text-danger">datafields</i>.`,
          init  : function() {
            // Data Sources : json source
            const edg_json_source = new EnhanceDataGrid({
              id        : '#edg_json_source',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              columns   : [
                { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                { text: 'Contact Name', datafield: 'ContactName', width: 150 },
                { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
                { text: 'City', datafield: 'City', width: 120 },
                { text: 'Country', datafield: 'Country' },
              ],
              jsonSource: {
                url: 'demo/customers.txt',
                datafields: [
                  { name: 'CompanyName', type: 'string' },
                  { name: 'ContactName', type: 'string' },
                  { name: 'ContactTitle', type: 'string' },
                  { name: 'Address', type: 'string' },
                  { name: 'City', type: 'string' },
                  { name: 'Country', type: 'string' },
                ]
              },
            });
          },
        },
        {
          id    : 'data_source',
          title : 'DataSource',
          doc   : null,
          desc  : `Property <i class="text-danger">dataSource</i> is the basic data source declaration for EnhanceDataGrid.
            It will be automatically passed into the jqxGrid's <i class="text-danger">source</i> property as the option object of <i class="text-primary">new</i> <i class="text-black">$.jqx.dataAdapter(<b>dataSource</b>)</i>.`,
          init  : function() {
            // Data Sources : data source
            const edg_data_source = new EnhanceDataGrid({
              id        : '#edg_data_source',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              columns   : [
                { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                { text: 'Contact Name', datafield: 'ContactName', width: 150 },
                { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
                { text: 'City', datafield: 'City', width: 120 },
                { text: 'Country', datafield: 'Country' },
              ],
              dataSource: {
                datatype: 'json',
                id: 'CustomerID',
                url: 'demo/customers.txt',
                datafields: [
                  { name: 'CompanyName', type: 'string' },
                  { name: 'ContactName', type: 'string' },
                  { name: 'ContactTitle', type: 'string' },
                  { name: 'Address', type: 'string' },
                  { name: 'City', type: 'string' },
                  { name: 'Country', type: 'string' },
                ]
              },
            });
          },
        },
        // {
        //   id        : 'dataadapter',
        //   title     : 'DataAdapter',
        //   doc       : null,
        //   desc      : null,
        //   sourcecode: '',
        // },
      ],
    },
    {
      // Append features
      id    : 'features',
      title : 'Features',
      menu  : [
        {
          id    : 'rowindex',
          title : `Row Index`,
          doc   : null,
          desc  : `By default, EnhanceDataGrid displays the row number along with the aggregate Row Total.
            You can simply hide the aggregate Row by setting jqxGrid's property <i class="text-danger">showstatusbar: false</i>.
            The <i class="text-danger">rowIndexWidth</i> property allows you to change the width of the row number column.`,
          init  : function() {
            // Features : Row Index
            const edg_rowindex = new EnhanceDataGrid({
              id            : '#edg_rowindex',
              altrows       : true,
              showstatusbar : false,
              rowIndexWidth : 100,
              columns       : JSON.parse(JSON.stringify(columns)),
              dataSource    : JSON.parse(JSON.stringify(source)),
            });
          },
        },
        {
          id    : 'centeredcolumns',
          title : `Centered Columns`,
          doc   : null,
          desc  : `By setting <i class="text-danger">centeredColumns: true</i>, you can centre all columns at once. (All columns and column groups)`,
          init  : function() {
            // Features : Centered Columns
            const edg_centeredcolumns = new EnhanceDataGrid({
              id              : '#edg_centeredcolumns',
              altrows         : true,
              centeredColumns : true,
              columns         : JSON.parse(JSON.stringify(columns)),
              dataSource      : JSON.parse(JSON.stringify(source)),
              columngroups    : [
                { text: 'Buyer Details', name: 'buyer' },
              ],
            });
          },
        },
        {
          id    : 'usebootstrap',
          title : `Bootstrap Modal`,
          doc   : null,
          desc  : `Property <i class="text-danger">useBootstrap: true</i> will change the EnhanceDataGrid meseage to using Bootstrap Modal, if Bootstrap default variable is found.`,
          init  : function() {
            // Features : Bootstrap Modal
            const edg_usebootstrap = new EnhanceDataGrid({
              id          : '#edg_usebootstrap',
              buttonTheme : 'material-purple',
              altrows     : true,
              useBootstrap: true,
              columns     : JSON.parse(JSON.stringify(columns)),
              dataSource  : JSON.parse(JSON.stringify(source)),
              tbElement   : [
                { button: 'reload' },
                { button: 'edit' },
                { button: 'print' },
              ]
            });
          },
        },
        // {
        //   id        : 'article_id',
        //   title     : `article_name`,
        //   doc       : null,
        //   desc      : null,
        //   sourcecode: null,
        //   colorcode : null
        // },
      ],
    },
    {
      // Append methods
      id    : 'methods',
      title : 'Methods',
      menu  : [
        {
          id    : 'clearselection',
          title : `clearSelection()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#clearSelection',
          desc  : 'Clears the selection.',
          ratio : '7,5',
          init  : function() {
            // Methods : clearSelection()
            $('#edg_clearselection_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_clearselection_button" type="button" class="btn btn-outline-secondary disabled">Clear Selection</button>
              </div>
              <div id="edg_clearselection_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                No selection...
              </div>
            </div>`));

            $('#edg_clearselection').on('bindingcomplete', function() {
              $('#clearselection .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_clearselection = new EnhanceDataGrid({
              id        : '#edg_clearselection',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            const edg_clearselection_result = $('#edg_clearselection_result');

            $('#edg_clearselection_button').on('click', function(e) {
              edg_clearselection.clearSelection();
              edg_clearselection_result.html('Selection cleared...');
            });

            edg_clearselection.on('rowselect', function(e) {
              const rowData = e.args.row;
              const result = JSON.stringify(rowData);

              edg_clearselection_result.html(result);
            });
          },
        },
        {
          id    : 'refresh',
          title : `refresh()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#refresh',
          desc  : 'Clears the selection, updates the bound data and refreshed the grid.',
          ratio : '7,5',
          init  : function() {
            // Methods : refresh()
            $('#edg_refresh_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_refresh_button" type="button" class="btn btn-outline-secondary disabled">Refresh</button>
              </div>
              <div id="edg_refresh_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                No selection...
              </div>
            </div>`));

            $('#edg_refresh').on('bindingcomplete', function() {
              $('#refresh .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_refresh = new EnhanceDataGrid({
              id        : '#edg_refresh',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            const edg_refresh_result = $('#edg_refresh_result');

            $('#edg_refresh_button').on('click', function(e) {
              edg_refresh.refresh();
              edg_refresh_result.html('Grid refreshed...');
            });

            edg_refresh.on('rowselect', function(e) {
              const args = e.args;
              const rowData = args.row;
              const result = JSON.stringify(rowData);

              edg_refresh_result.html(result);
            });
          },
        },
        {
          id    : 'updatebounddata',
          title : `updateBoundData()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#updateBoundData',
          desc  : 'Updates the bound data and refreshes the grid.',
          ratio : '7,5',
          init  : function() {
            // Methods : updateBoundData()
            $('#edg_updatebounddata_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_updatebounddata_button" type="button" class="btn btn-outline-secondary disabled">Update Bound Data</button>
              </div>
              <div id="edg_updatebounddata_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Try sort any column and then select a row...
              </div>
            </div>`));

            $('#edg_updatebounddata').on('bindingcomplete', function() {
              $('#updatebounddata .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_updatebounddata = new EnhanceDataGrid({
              id        : '#edg_updatebounddata',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            const edg_updatebounddata_result = $('#edg_updatebounddata_result');

            $('#edg_updatebounddata_button').on('click', function(e) {
              edg_updatebounddata.updateBoundData();
              edg_updatebounddata_result.html('Bound data updated...');
            });

            edg_updatebounddata.on('rowselect', function(e) {
              const args = e.args;
              const rowData = args.row;
              const result = JSON.stringify(rowData);

              edg_updatebounddata_result.html(result);
            });
          },
        },
        {
          id    : 'on',
          title : `on()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#on',
          desc  : 'Register grid event listener.',
          ratio : '7,5',
          init  : function() {
            // Nethods : on()
            $('#edg_on_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="mb-3 border rounded p-1">
                The '<i class="text-danger">rowselect</i>' event was registerd with Grid.
                Try selecting a row to display the row data.
              </div>
              <div id="edg_on_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Try select a row...
              </div>
            </div>`));

            const edg_on = new EnhanceDataGrid({
              id        : '#edg_on',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            edg_on.on('rowselect', function(e) {
              const args = e.args;
              const rowData = args.row;
              const result = JSON.stringify(rowData);

              $('#edg_on_result').html(result);
            });
          },
        },
        {
          id    : 'getalldirty',
          title : `getAllDirty()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getAllDirty',
          desc  : 'Gets all dirty { key:value } pairs.',
          ratio : '7,5',
          init  : function() {
            // Methods : getAllDirty()
            $('#edg_getalldirty_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="mb-3 border rounded p-1">
                Try editing the data in the grid; all dirty data will appear in the result box with the format<br />
                { <span class="text-primary">row_id</span> : { <span class="text-success">dirty_data</span> } }.
              </div>
              <div id="edg_getalldirty_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                All changed data will be displayed here...
              </div>
            </div>`));

            const edg_getalldirty = new EnhanceDataGrid({
              id        : '#edg_getalldirty',
              altrows   : true,
              editable  : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            edg_getalldirty.on('cellvaluechanged', function(e) {
              const all_dirty = edg_getalldirty.getAllDirty();

              $('#edg_getalldirty_result').html(JSON.stringify(all_dirty));
            });
          },
        },
        {
          id    : 'getdirty',
          title : `getDirty()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getDirty',
          desc  : 'Gets all dirty { id:value } pairs.',
          ratio : '7,5',
          init  : function() {
            // Methods : getDirty()
            $('#edg_getdirty_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="mb-3 border rounded p-1">
                The <b>getDirty</b>() method only works with the <i class="text-danger">checkedDatafield</i> property.
                It is useful in situations where you want to keep track of only one column's data changes.<br />
                Return result format { <span class="text-primary">row_id</span> : <span class="text-success">dirty_data</span> }.
              </div>
              <div id="edg_getdirty_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                All changed data will be displayed here...
              </div>
            </div>`));

            const edg_getdirty = new EnhanceDataGrid({
              id        : '#edg_getdirty',
              altrows   : true,
              editable  : true,
              columns   : [
                { text: 'Is Valid ?', datafield: 'selected', width: 70, align: 'center', columntype: 'checkbox' },
                { text: 'Name', datafield: 'firstname', width: 100, editable: false },
                { text: 'Product', datafield: 'productname', minWidth: 200, editable: false },
                { text: 'Unit Price', datafield: 'price', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', editable: false },
              ],
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            edg_getdirty.on('cellvaluechanged', function(e) {
              const all_dirty = edg_getdirty.getDirty();

              $('#edg_getdirty_result').html(JSON.stringify(all_dirty));
            });
          },
        },
        {
          id    : 'getcheckeditems',
          title : `getCheckedItems()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getCheckedItems',
          desc  : 'Gets all selected data ID.',
          ratio : '7,5',
          init  : function() {
            // Methods : getCheckedItems()
            $('#edg_getcheckeditems_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="mb-3 border rounded p-1">
                The <b>getCheckedItems</b>() method has the same function as the <b>getDiry</b>() method, except that getCheckedItems only keep track of valid data,
                and the return result is an Array of the row IDs of the valid data.<br />
                Return result format [<span class="text-primary">row_id</span>].
              </div>
              <div id="edg_getcheckeditems_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                All changed data will be displayed here...
              </div>
            </div>`));

            const edg_getcheckeditems = new EnhanceDataGrid({
              id        : '#edg_getcheckeditems',
              altrows   : true,
              editable  : true,
              columns   : [
                { text: 'Is Valid ?', datafield: 'selected', width: 70, align: 'center', columntype: 'checkbox' },
                { text: 'Name', datafield: 'firstname', width: 100, editable: false },
                { text: 'Product', datafield: 'productname', minWidth: 200, editable: false },
                { text: 'Unit Price', datafield: 'price', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', editable: false },
              ],
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            edg_getcheckeditems.on('cellvaluechanged', function(e) {
              const all_dirty = edg_getcheckeditems.getCheckedItems();

              $('#edg_getcheckeditems_result').html(JSON.stringify(all_dirty));
            });
          },
        },
        {
          id    : 'getcellvalue',
          title : `<del class="text-danger">getCellValue()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getCellValue',
          desc  : 'Gets the value of a cell.',
          ratio : '7,5',
          init  : function() {
            // Methods : getCellValue()
            $('#edg_getcellvalue_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getcellvalue_button" type="button" class="btn btn-outline-secondary disabled">getCellValue(1, 'firstname')</button>
              </div>
              <div id="edg_getcellvalue_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to display the value of rowindex 1, datafield 'firstname' here...<br /><br />
                It is exactly the same with jqxGrid's "getcellvalue" method.
              </div>
            </div>`));

            $('#edg_getcellvalue').on('bindingcomplete', function() {
              $('#getcellvalue .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getcellvalue = new EnhanceDataGrid({
              id        : '#edg_getcellvalue',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getcellvalue_button').on('click', function(e) {
              $('#edg_getcellvalue_result').html(edg_getcellvalue.getCellValue(1, 'firstname'));
            });
          },
        },
        {
          id    : 'getrows',
          title : `<del class="text-danger">getRows()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getRows',
          desc  : 'Gets all rows.',
          ratio : '7,5',
          init  : function() {
            // Methods : getRows()
            $('#edg_getrows_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getrows_button" type="button" class="btn btn-outline-secondary disabled">Get Rows</button>
              </div>
              <div id="edg_getrows_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to display bound data here...<br /><br />
                It is exactly the same with jqxGrid's "getrows" method.
              </div>
            </div>`));

            $('#edg_getrows').on('bindingcomplete', function() {
              $('#getrows .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getrows = new EnhanceDataGrid({
              id        : '#edg_getrows',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getrows_button').on('click', function(e) {
              $('#edg_getrows_result').html(JSON.stringify(edg_getrows.getRows()));
            });
          },
        },
        {
          id    : 'getrowdata',
          title : `<del class="text-danger">getRowData()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getRowData',
          desc  : 'Gets the data of a row.',
          ratio : '7,5',
          init  : function() {
            // Methods : getRowData()
            $('#edg_getrowdata_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getrowdata_button" type="button" class="btn btn-outline-secondary disabled">Get Row Data</button>
              </div>
              <div id="edg_getrowdata_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to display data of rowindex 1 here...<br /><br />
                It is exactly the same with jqxGrid's "getrowdata" method.
              </div>
            </div>`));

            $('#edg_getrowdata').on('bindingcomplete', function() {
              $('#getrowdata .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getrowdata = new EnhanceDataGrid({
              id        : '#edg_getrowdata',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getrowdata_button').on('click', function(e) {
              $('#edg_getrowdata_result').html(JSON.stringify(edg_getrowdata.getRowData(1)));
            });
          },
        },
        {
          id    : 'getselectedrowdata',
          title : `getSelectedRowData()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowData',
          desc  : 'Gets the data of the selected row.',
          ratio : '7,5',
          init  : function() {
            // Methods : getSelectedRowData()
            $('#edg_getselectedrowdata_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getselectedrowdata_button" type="button" class="btn btn-outline-secondary disabled">Get Selected Row Data</button>
              </div>
              <div id="edg_getselectedrowdata_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Select a row and click the button to display the row data here...
              </div>
            </div>`));

            $('#edg_getselectedrowdata').on('bindingcomplete', function() {
              $('#getselectedrowdata .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getselectedrowdata = new EnhanceDataGrid({
              id        : '#edg_getselectedrowdata',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getselectedrowdata_button').on('click', function(e) {
              $('#edg_getselectedrowdata_result').html(JSON.stringify(edg_getselectedrowdata.getSelectedRowData()));
            });
          },
        },
        {
          id    : 'getselectedcellvalue',
          title : `getSelectedCellValue()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedCellValue',
          desc  : 'Gets the value of a cell of the selected row.',
          ratio : '7,5',
          init  : function() {
            // Methods : getSelectedCellValue()
            $('#edg_getselectedcellvalue_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getselectedcellvalue_button" type="button" class="btn btn-outline-secondary disabled">Get Selected Cell Value</button>
              </div>
              <div id="edg_getselectedcellvalue_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Select a row and click the button to display the Name here...
              </div>
            </div>`));

            $('#edg_getselectedcellvalue').on('bindingcomplete', function() {
              $('#getselectedcellvalue .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getselectedcellvalue = new EnhanceDataGrid({
              id        : '#edg_getselectedcellvalue',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getselectedcellvalue_button').on('click', function(e) {
              $('#edg_getselectedcellvalue_result').html(JSON.stringify(edg_getselectedcellvalue.getSelectedCellValue('firstname')));
            });
          },
        },
        {
          id    : 'getselectedrowindex',
          title : `<del class="text-danger">getSelectedRowIndex()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowIndex',
          desc  : 'Gets the bound index of the selected row.',
          ratio : '7,5',
          init  : function() {
            // Methods : getSelectedRowIndex()
            $('#edg_getselectedrowindex_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getselectedrowindex_button" type="button" class="btn btn-outline-secondary disabled">Get Selected Row Index</button>
              </div>
              <div id="edg_getselectedrowindex_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Select a row and click the button to display the rowindex here...<br /><br />
                It is exactly the same with jqxGrid's "getselectedrowindex" method.
              </div>
            </div>`));

            $('#edg_getselectedrowindex').on('bindingcomplete', function() {
              $('#getselectedrowindex .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getselectedrowindex = new EnhanceDataGrid({
              id        : '#edg_getselectedrowindex',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getselectedrowindex_button').on('click', function(e) {
              $('#edg_getselectedrowindex_result').html(JSON.stringify(edg_getselectedrowindex.getSelectedRowIndex()));
            });
          },
        },
        {
          id    : 'getselectedrowindexes',
          title : `<del class="text-danger">getSelectedRowIndexes()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowIndexes',
          desc  : 'Gets the indexes of the selected rows.',
          ratio : '7,5',
          init  : function() {
            // Methods : getSelectedRowIndexes()
            $('#edg_getselectedrowindexes_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getselectedrowindexes_button" type="button" class="btn btn-outline-secondary disabled">Get Selected Row Index</button>
              </div>
              <div id="edg_getselectedrowindexes_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Select few rows and click the button to display the rowindexes here...<br /><br />
                It is exactly the same with jqxGrid's "getselectedrowindexes" method.
              </div>
            </div>`));

            $('#edg_getselectedrowindexes').on('bindingcomplete', function() {
              $('#getselectedrowindexes .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getselectedrowindexes = new EnhanceDataGrid({
              id        : '#edg_getselectedrowindexes',
              altrows   : true,
              selectionmode: 'multiplerows',
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_getselectedrowindexes_button').on('click', function(e) {
              $('#edg_getselectedrowindexes_result').html(JSON.stringify(edg_getselectedrowindexes.getSelectedRowIndexes()));
            });
          },
        },
        {
          id    : 'hidecolumn',
          title : `hideColumn()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#hideColumn',
          desc  : 'Hide column.',
          ratio : '7,5',
          init  : function() {
            // Methods : hideColumn()
            $('#edg_hidecolumn_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid gap-2">
                <button id="edg_hidecolumn_button1" type="button" class="btn btn-outline-secondary disabled">Hide Product</button>
                <button id="edg_hidecolumn_button2" type="button" class="btn btn-outline-secondary disabled">Hide Name and Last Name</button>
                <button id="edg_hidecolumn_button3" type="button" class="btn btn-outline-secondary disabled">Show Hidden Columns</button>
              </div>
            </div>`));

            $('#edg_hidecolumn').on('bindingcomplete', function() {
              $('#hidecolumn .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_hidecolumn = new EnhanceDataGrid({
              id        : '#edg_hidecolumn',
              altrows   : true,
              selectionmode: 'multiplerows',
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_hidecolumn_button1').on('click', function(e) {
              edg_hidecolumn.hideColumn('productname');
            });

            $('#edg_hidecolumn_button2').on('click', function(e) {
              edg_hidecolumn.hideColumn(['firstname', 'lastname']);
            });

            $('#edg_hidecolumn_button3').on('click', function(e) {
              edg_hidecolumn.showColumn(['productname', 'firstname', 'lastname']);
            });
          },
        },
        {
          id    : 'showcolumn',
          title : `showColumn()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#showColumn',
          desc  : 'Shows column.',
          ratio : '7,5',
          init  : function() {
            // Methods : showColumn()
            $('#edg_showcolumn_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid gap-2">
                <button id="edg_showcolumn_button1" type="button" class="btn btn-outline-secondary disabled">Show Product</button>
                <button id="edg_showcolumn_button2" type="button" class="btn btn-outline-secondary disabled">Show Name and Last Name</button>
                <button id="edg_showcolumn_button3" type="button" class="btn btn-outline-secondary disabled">Hide Product, Name, Last Name</button>
              </div>
            </div>`));

            $('#edg_showcolumn').on('bindingcomplete', function() {
              $('#showcolumn .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_showcolumn = new EnhanceDataGrid({
              id        : '#edg_showcolumn',
              altrows   : true,
              selectionmode: 'multiplerows',
              columns   : [
                { text: 'Name', datafield: 'firstname', width: 100, columngroup: 'buyer', hidden: true },
                { text: 'Last Name', datafield: 'lastname', width: 100, columngroup: 'buyer', hidden: true },
                { text: 'Product', datafield: 'productname', minWidth: 200, hidden: true },
                { text: 'Sales Date', datafield: 'salesdate', width: 100, align: 'center', cellsalign: 'center', cellsformat: dateFormat, columntype: 'datetimeinput' },
                { text: 'Quantity', datafield: 'quantity', width: 80, align: 'right', cellsalign: 'right', columntype: 'numberinput' },
                { text: 'Unit Price', datafield: 'price', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput' },
                { text: 'Total', datafield: 'total', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', columntype: 'numberinput' },
                { text: 'Check', datafield: 'selected', width: 50, columntype: 'checkbox' },
              ],
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_showcolumn_button1').on('click', function(e) {
              edg_showcolumn.showColumn('productname');
            });

            $('#edg_showcolumn_button2').on('click', function(e) {
              edg_showcolumn.showColumn(['firstname', 'lastname']);
            });

            $('#edg_showcolumn_button3').on('click', function(e) {
              edg_showcolumn.hideColumn(['productname', 'firstname', 'lastname']);
            });
          },
        },
        {
          id    : 'updatecellvalue',
          title : `<del class="text-danger">updateCellValue()</del>`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#updateCellValue',
          desc  : 'Sets a new value to a cell.',
          ratio : '7,5',
          init  : function() {
            // Methods : updateCellValue()
            $('#edg_updatecellvalue_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_updatecellvalue_button" type="button" class="btn btn-outline-secondary disabled">Update Cell Value</button>
              </div>
              <div id="edg_updatecellvalue_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to set the Name of Row 2 to "hello world"...<br /><br />
                It is exactly the same with jqxGrid's "setcellvalue" method.
              </div>
            </div>`));

            $('#edg_updatecellvalue').on('bindingcomplete', function() {
              $('#updatecellvalue .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_updatecellvalue = new EnhanceDataGrid({
              id        : '#edg_updatecellvalue',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_updatecellvalue_button').on('click', function(e) {
              edg_updatecellvalue.updateCellValue(1, 'firstname', 'hello world');
            });
          },
        },
        {
          id    : 'setselectedcellvalue',
          title : `setSelectedCellValue()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#setSelectedCellValue',
          desc  : 'Sets a new value to a cell of the selected row.',
          ratio : '7,5',
          init  : function() {
            // Methods : setSelectedCellValue()
            $('#edg_setselectedcellvalue_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_setselectedcellvalue_button" type="button" class="btn btn-outline-secondary disabled">Update Selected Cell Value</button>
              </div>
              <div id="edg_setselectedcellvalue_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Select a row and click the button to set the Name of Row to "hello world"...<br /><br />
              </div>
            </div>`));

            $('#edg_setselectedcellvalue').on('bindingcomplete', function() {
              $('#setselectedcellvalue .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_setselectedcellvalue = new EnhanceDataGrid({
              id        : '#edg_setselectedcellvalue',
              altrows   : true,
              columns   : JSON.parse(JSON.stringify(columns)),
              dataSource: JSON.parse(JSON.stringify(source)),
            });

            $('#edg_setselectedcellvalue_button').on('click', function(e) {
              edg_setselectedcellvalue.setSelectedCellValue('firstname', 'hello world');
            });
          },
        },
        {
          id    : 'getsourceurl',
          title : `getSourceUrl()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSourceUrl',
          desc  : 'Get URL of data source.',
          ratio : '7,5',
          init  : function() {
            // Methods : getSourceUrl()
            $('#edg_getsourceurl_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid mb-3">
                <button id="edg_getsourceurl_button" type="button" class="btn btn-outline-secondary disabled">Get Source URL</button>
              </div>
              <div id="edg_getsourceurl_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to display the source url here...
              </div>
            </div>`));

            $('#edg_getsourceurl').on('bindingcomplete', function() {
              $('#getsourceurl .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_getsourceurl = new EnhanceDataGrid({
              id        : '#edg_getsourceurl',
              altrows   : true,
              columns   : [
                { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                { text: 'Contact Name', datafield: 'ContactName', width: 150 },
                { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
                { text: 'City', datafield: 'City', width: 120 },
                { text: 'Country', datafield: 'Country' },
              ],
              jsonSource: {
                url: 'demo/customers.txt',
                datafields: [
                  { name: 'CompanyName', type: 'string' },
                  { name: 'ContactName', type: 'string' },
                  { name: 'ContactTitle', type: 'string' },
                  { name: 'Address', type: 'string' },
                  { name: 'City', type: 'string' },
                  { name: 'Country', type: 'string' },
                ]
              },
            });

            $('#edg_getsourceurl_button').on('click', function(e) {
              $('#edg_getsourceurl_result').html(edg_getsourceurl.getSourceUrl());
            });
          },
        },
        {
          id    : 'setsourceurl',
          title : `setSourceUrl()`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#setSourceUrl',
          desc  : 'Update URL of data source and refresh Grid.',
          ratio : '7,5',
          init  : function() {
            // Methods : setSourceUrl()
            $('#edg_setsourceurl_box2').append($(`<div class="d-flex flex-column h-100 ms-3">
              <div class="d-grid gap-2 mb-3">
                <button id="edg_setsourceurl_button1" type="button" class="btn btn-outline-secondary disabled">Update To New URL</button>
                <button id="edg_setsourceurl_button2" type="button" class="btn btn-outline-secondary disabled">Update To Original Source URL</button>
              </div>
              <div id="edg_setsourceurl_result" class="flex-fill border rounded p-1 text-muted overflow-auto">
                Click the button to display the source url here...
              </div>
            </div>`));

            $('#edg_setsourceurl').on('bindingcomplete', function() {
              $('#setsourceurl .btn-outline-secondary.disabled').removeClass('disabled');
            });

            const edg_setsourceurl = new EnhanceDataGrid({
              id        : '#edg_setsourceurl',
              altrows   : true,
              columns   : [
                { text: 'Company Name', datafield: 'CompanyName', width: 250 },
                { text: 'Contact Name', datafield: 'ContactName', width: 150 },
                { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
                { text: 'City', datafield: 'City', width: 120 },
                { text: 'Country', datafield: 'Country' },
              ],
              jsonSource: {
                url: 'demo/customers.txt',
                datafields: [
                  { name: 'CompanyName', type: 'string' },
                  { name: 'ContactName', type: 'string' },
                  { name: 'ContactTitle', type: 'string' },
                  { name: 'Address', type: 'string' },
                  { name: 'City', type: 'string' },
                  { name: 'Country', type: 'string' },
                ]
              },
            });

            const edg_setsourceurl_result = $('#edg_setsourceurl_result');

            $('#edg_setsourceurl_button1').on('click', function(e) {
              edg_setsourceurl.setSourceUrl('demo/customers-2.txt');
              edg_setsourceurl_result.html('Grid source URL updated to <i class="text-danger">demo/customers-2.txt</i>');
            });

            $('#edg_setsourceurl_button2').on('click', function(e) {
              edg_setsourceurl.setSourceUrl('demo/customers.txt');
              edg_setsourceurl_result.html('Grid source URL updated to <i class="text-danger">demo/customers.txt</i>');
            });
          },
        },
      ],
    },
    {
      // Append static methods
      id    : 'statics',
      title : 'Static Methods',
      menu  : [
        {
          id    : 'debounce',
          title : `debounce`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.debounce',
          desc  : 'Debounce function.',
          static: true,
        },
        {
          id    : 'getsearchparameters',
          title : `getSearchParameters`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.getSearchParameters',
          desc  : 'Get query string of an URL.',
          static: true,
        },
        {
          id    : 'insertquerystring',
          title : `insertQueryString`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.insertQueryString',
          desc  : 'Append query string to an URL.',
          static: true,
        },
        {
          id    : 'isemptystring',
          title : `isEmptyString`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isEmptyString',
          desc  : 'Check input is an empty string.',
          static: true,
        },
        {
          id    : 'isnull',
          title : `isNull`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isNull',
          desc  : 'Check input is null.',
          static: true,
        },
        {
          id    : 'isundefined',
          title : `isUndefined`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isUndefined',
          desc  : 'Check input is undefined.',
          static: true,
        },
        {
          id    : 'isunset',
          title : `isUnset`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isUnset',
          desc  : 'Check input is unset.',
          static: true,
        },
        {
          id    : 'isvalidkeyboardinput',
          title : `isValidKeyboardInput`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isValidKeyboardInput',
          desc  : 'Check whether is a valid keyboard input.',
          static: true,
        },
        {
          id    : 'throttle',
          title : `throttle`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.throttle',
          desc  : 'Throttle function.',
          static: true,
        },
        {
          id    : 'transformobjecttostring',
          title : `transformObjectToString`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.transformObjectToString',
          desc  : 'Transform Object to String.',
          static: true,
        },
        {
          id    : 'transformstringtoobject',
          title : `transformStringToObject`,
          doc   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.transformStringToObject',
          desc  : 'Transform String to Object.',
          static: true,
        },
      ],
    },
    // {
    //   // Append xxx
    //   id    : 'ids',
    //   title : 'title',
    //   menu  : [
    //     {
    //       id    : 'article_id',
    //       title : `article_name`,
    //       doc   : null,
    //       desc  : null,
    //     },
    //   ],
    // },
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

  $('button[id^=btn_activate]').on('click', function(e) {
    var section_id = $(this).data('section');
    var value_id = $(this).data('value');

    // console.log(section_id)
    // console.log(value_id)

    var section = aside_list.filter((section, index) => section.id == section_id);
    var component = section[0].menu.filter((component, index) => component.id == value_id);

    // console.log(section)
    // console.log(component)

    if ($(this).parent().hasClass('grid-container'))
      $(this).parent().addClass('active');

    if ($(this).parent().parent().hasClass('grid-container'))
      $(this).parent().parent().addClass('active');

    $(this).hide();

    component[0].init();
  });

  // ===================================================================================================================

  // Init EnhanceDataGrid

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

  for (let i = 0; i < 50; i++) {
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
    { text: 'Name', datafield: 'firstname', width: 100, columngroup: 'buyer', /* editable: false */ },
    { text: 'Last Name', datafield: 'lastname', width: 100, columngroup: 'buyer', /* editable: false */ },
    { text: 'Product', datafield: 'productname', minWidth: 200, /* editable: false */ },
    { text: 'Sales Date', datafield: 'salesdate', width: 100, align: 'center', cellsalign: 'center', cellsformat: dateFormat, /* editable: false */ },
    { text: 'Quantity', datafield: 'quantity', width: 80, align: 'right', cellsalign: 'right', /* editable: false */ },
    { text: 'Unit Price', datafield: 'price', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', /* editable: false */ },
    { text: 'Total', datafield: 'total', width: 90, align: 'right', cellsalign: 'right', cellsformat: 'c2', /* editable: false */ },
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

  // ===================================================================================================================

  // Init form widgets

  $('#jqxInput')
    .jqxInput({ width: '100%', height: 31, value: 'hello world' });

  $('#jqxDateTimeInput')
    .jqxDateTimeInput({ width: '100%', height: 31, value: '2022-01-01' });

  $('div[id^=jqxCheckBox]')
    .jqxCheckBox({ width: 'auto', height: 26 });

  $('#jqxCheckBox2').val(true);

  $('div[id^=jqxRadioButton]')
    .jqxRadioButton({ width: 'auto', height: 26 });

  $('#jqxRadioButton2').val(true);

  $('#jqxTextArea')
    .jqxTextArea({ width: '100%', height: 31 }).val('hello world');

  $('#jqxComboBox')
    .jqxComboBox({
      width: '100%',
      height: 31,
      selectedIndex: 1,
      displayMember: "ContactName",
      source: new $.jqx.dataAdapter({
        datatype    : 'json',
        url         : 'demo/customers.txt',
        async       : false,
        valueMember : 'CompanyName',
        datafields  : [
          { name: 'CompanyName' },
          { name: 'ContactName' }
        ],
      }),
    });

  // TODO: enhance jqxWindow declaration
  // https://www.jqwidgets.com/jquery-widgets-demo/demos/jqxwindow/index.htm#demos/jqxwindow/defaultfunctionality.htm
  $('#edg_jqxWindow')
    .jqxWindow({ width: 500, height: 420, isModal: true, autoOpen: false });

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
