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
        const ratio = el.ratio.split(',');
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
      //*/

      section.append(article);
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

  const defaultfunc_sourcecode =
    "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
    "  id          : '#edg_defaultfunc',\n" +
    "  altrows     : true,\n" +
    "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
    "  columngroups: [\n" +
    "    { text: 'Buyer Details', name: 'buyer' },\n" +
    "  ],\n" +
    "  dataSource  : source,\n" +
    "});";
  // $('#defaultfunc')
  //   .find('pre')
  //   .html(defaultfunc_sourcecode);

  const defaultfunc_colorcode =
    '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
    ' 2\n' +
    ' 3\n' +
    ' 4\n' +
    ' 5\n' +
    ' 6\n' +
    ' 7\n' +
    ' 8\n' +
    ' 9\n' +
    '10\n' +
    '11\n' +
    '12</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">const</span> grid <span style="color: #666666">=</span> <span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
    '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_defaultfunc&#39;</span>,\n' +
    '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
    '  columns     <span style="color: #666666">:</span> columns_array,\n' +
    '  columngroups<span style="color: #666666">:</span> [\n' +
    '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Buyer Details&#39;</span>, name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;buyer&#39;</span> },\n' +
    '  ],\n' +
    '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
    '});\n' +
    '\n' +
    '<span style="color: #60a0b0; font-style: italic">// get original jqxGrid object</span>\n' +
    '<span style="color: #007020; font-weight: bold">const</span> jqxGridObject = grid.jqxGrid;\n' +
    '</pre></td></tr></table></div>';

  $('#defaultfunc')
    .find('.card-footer')
    .replaceWith(`<div class="card-footer text-muted overflow-hidden p-0">
      ${defaultfunc_colorcode}
    </div>`);

  // Append aside content
  const aside_list = [
    // {
    //   // Append default section
    //   id    : 'defaults',
    //   title : 'Default',
    //   menu  : [
    //     {
    //       id        : 'defaultfunc',
    //       title     : `Default Functionality`,
    //       doc       : null,
    //       desc      : `EnhanceDataGrid default showing row number with aggregate Row Total.`,
    //       sourcecode:
    //         "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
    //         "  id          : '#edg_defaultfunc',\n" +
    //         "  altrows     : true,\n" +
    //         "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
    //         "  columngroups: [\n" +
    //         "    { text: 'Buyer Details', name: 'buyer' },\n" +
    //         "  ],\n" +
    //         "  dataSource  : source,\n" +
    //         "});",
    //     },
    //   ],
    // },
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
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%">1\n' +
            '2\n' +
            '3\n' +
            '4\n' +
            '5\n' +
            '6\n' +
            '7\n' +
            '8</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_enterfilter&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">searchInput <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'enterfind',
          title     : `Find ( Ctrl+Enter )`,
          doc       : null,
          desc      : `If you prefer 'Find' data instead of 'Filter' data, setup grid in Find mode using property <i class="text-danger">showFindButton : true</i>.
            The (Ctrl + Enter) keyboard shortcut feature is included with Find mode and can be enabled by setup the property <i class="text-danger">enterFind : true</i>.
            The example below shows a grid in pure Find mode.??`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id              <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_enterfind&#39;</span>,\n' +
            '  buttonTheme     <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows         <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">showFindButton  <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  <i class="hl">enterFind       <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  <i class="hl">showFilterButton<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">false</span></i>,\n' +
            '  <i class="hl">enterFilter     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">false</span></i>,\n' +
            '  columns         <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource      <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'enterfilterfind',
          title     : `Find & Fitler`,
          doc       : null,
          desc      : `Filter and Find modes can be enabled at the same time.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id            <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_enterfilterfind&#39;</span>,\n' +
            '  buttonTheme   <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows       <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput   <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">showFindButton<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  <i class="hl">enterFind     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns       <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource    <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'autofilter',
          title     : `Auto Fitler`,
          doc       : null,
          desc      : `Auto Filter enables automatic data filtering after user input.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%">1\n' +
            '2\n' +
            '3\n' +
            '4\n' +
            '5\n' +
            '6\n' +
            '7\n' +
            '8\n' +
            '9</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_autofilter&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">autoFilter  <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'autofind',
          title     : `Auto Find`,
          doc       : null,
          desc      : `Auto Find enables automatic data finding after user input.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%">1\n' +
            '2\n' +
            '3\n' +
            '4\n' +
            '5\n' +
            '6\n' +
            '7\n' +
            '8\n' +
            '9</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_autofind&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">autoFind    <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'autodelaytiming',
          title     : `Auto Delay Timing`,
          doc       : null,
          desc      : `Auto Filter/Find performs data filtering/finding after certain amount of time after user input.
            The delay timing can be altered by setting the property <i class="text-danger">autoDelayTiming</i>.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id              <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_autodelaytiming&#39;</span>,\n' +
            '  buttonTheme     <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows         <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  autoFilter      <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">autoDelayTiming <span style="color: #666666">:</span> <span style="color: #40a070">500</span></i>,\n' +
            '  columns         <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource      <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'filterrow',
          title     : `Filter Row`,
          doc       : null,
          desc      : `The Search Input comes with a Filter Row show/hide control button.
            Property <i class="text-danger">showFilterRowButton</i> controls the Filter Row button's visibility.
            The example below enables the Filter Row and hides the Filter Row control button.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id                  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_filterrow&#39;</span>,\n' +
            '  buttonTheme         <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows             <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  searchInput         <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">showfilterrow       <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  <i class="hl">showFilterRowButton <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">false</span></i>,\n' +
            '  columns             <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource          <span style="color: #666666">:</span> source_object,\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
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
          desc      : `The Reload button will update the bound data, refresh the grid, and clear all row selections.
            If the data source is binding to an URL, it will trigger the AJAX request to re-get the bound data.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_reloadbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  searchInput <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { <i class="hl">button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;reload&#39;</span></i> },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'addbutton',
          title     : 'Add Button',
          doc       : null,
          desc: `The Add button comes with some useful features.
            <ul>
              <li>You can set the <i class="text-danger">click</i> property with your self-defined function.</li>
              <li>Setting the <i class="text-danger">win</i> property with an ID will auto-open related jQWidget's jqxWndow widget.</li>
              <li>Setting the <i class="text-danger">modal</i> property with an ID will auto-open related Bootstrap Modal.</li>
              <li>Setting the <i class="text-danger">form</i> property with an ID will auto-clear all the relevant inputs within the form tag.</li>
            </ul>`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18\n' +
            '19\n' +
            '20\n' +
            '21\n' +
            '22\n' +
            '23\n' +
            '24</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_addbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { <i class="hl">button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;add&#39;</span></i>,\n' +
            '      click<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #007020">window</span>.alert(<span style="color: #4070a0">&#39;You clicked the add button&#39;</span>);\n' +
            '      },\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;add&#39;</span>,\n' +
            '      text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Open jqxWindow&#39;</span>,\n' +
            '      <i class="hl">win<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_jqxWindow&#39;</span></i>,\n' +
            '      <i class="hl">form<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#exampleJqwidgetsForm&#39;</span></i>,\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;add&#39;</span>,\n' +
            '      text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Open Modal&#39;</span>,\n' +
            '      <i class="hl">modal<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#exampleModal&#39;</span></i>,\n' +
            '      <i class="hl">form<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#exampleBootstrapForm&#39;</span></i>,\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'editbutton',
          title     : 'Edit Button',
          doc       : null,
          desc      : `The Edit button has the same features as the Add button except that it does not support the <i class="text-danger">form</i> property.
            There are two properties which are very useful in Edit button :
            <ul>
              <li><i class="text-danger">beforeClick</i> property, which supports a callback function for the Edit button click-keydown event</li>
              <li><i class="text-danger">afterClick</i> property, which supports a callback function for the Edit button click-keyup event</li>
            </ul>
            Please take note that the <i class="text-danger">win</i>/<i class="text-danger">modal</i> property that auto-open <i class="text-black">jqxWindow</i>/<i class="text-black">Modal</i> happened between the click-keydown and click-keyup events.<br /><br />
            When click on Edit button, event trigger sequence : <i>click-keydown</i> <i class="fa-solid fa-chevron-right"></i> <i>auto-open</i> <i class="fa-solid fa-chevron-right"></i> <i>click-keyup</i>.`,
          colorcode:
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18\n' +
            '19\n' +
            '20\n' +
            '21\n' +
            '22\n' +
            '23\n' +
            '24\n' +
            '25\n' +
            '26\n' +
            '27\n' +
            '28</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_editbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { <i class="hl">button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;edit&#39;</span></i>,\n' +
            '      click<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #007020">window</span>.alert(<span style="color: #4070a0">&#39;You clicked the edit button&#39;</span>);\n' +
            '      },\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;edit&#39;</span>,\n' +
            '      text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Open jqxWindow&#39;</span>,\n' +
            '      <i class="hl">win<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_jqxWindow&#39;</span></i>,\n' +
            '      <i class="hl">beforeClick</i><span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #60a0b0; font-style: italic">// fill in data before jqxWindow open</span>\n' +
            '      },\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;edit&#39;</span>,\n' +
            '      text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Open Modal&#39;</span>,\n' +
            '      <i class="hl">modal<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#exampleModal&#39;</span></i>,\n' +
            '      <i class="hl">beforeClick</i><span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #60a0b0; font-style: italic">// fill in data before Bootstrap Modal open</span>\n' +
            '      },\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'deletebutton',
          title     : 'Delete Button',
          doc       : null,
          desc      : `The Delete button comes with some useful features to deal with AJAX request.
            <ul>
              <li>Setting the <i class="text-danger">url</i> property in <i class="text-primary">String</i> will fire POST AJAX with selected row's ID appended as URL query string.</li>
              <li>Setting the <i class="text-danger">url</i> property with a <i class="text-primary">Function</i> will receive two arguments: function(<i class="text-success">selected_row_data</i>, <i class="text-success">selected_row_data_id</i>).</li>
              <li>If you would like to have some checking done before firing default POST AJAX, set the <i class="text-danger">check</i> property with a <i class="text-primary">Function</i>, then return true to continue POST and vice versa.</li>
              <li>Setting the <i class="text-danger">param</i> property in an Object will have it appended as static query string to the POST AJAX.</li>
              <li>If you would like to append some dynamic query string, setthe param property with a <i class="text-primary">Function</i> and return with an Object.</li>
            </ul>`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18\n' +
            '19\n' +
            '20\n' +
            '21\n' +
            '22\n' +
            '23\n' +
            '24\n' +
            '25\n' +
            '26\n' +
            '27\n' +
            '28\n' +
            '29\n' +
            '30\n' +
            '31\n' +
            '32\n' +
            '33\n' +
            '34\n' +
            '35\n' +
            '36\n' +
            '37</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_deletebutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> JSON.parse(JSON.stringify(columns)),\n' +
            '  dataSource  <span style="color: #666666">:</span> JSON.parse(JSON.stringify(source)),\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete&#39;</span>,\n' +
            '      url<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;post_delete.php?mod=delete_data&#39;</span>,\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete&#39;</span>,\n' +
            '      url<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>(data, id) {\n' +
            '        <span style="color: #60a0b0; font-style: italic">// coding...</span>\n' +
            '      }\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete&#39;</span>,\n' +
            '      url<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete.php&#39;</span>,\n' +
            '      check<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #007020; font-weight: bold">return</span> _condition_to_pass_\n' +
            '          <span style="color: #666666">?</span> <span style="color: #007020; font-weight: bold">true</span>\n' +
            '          <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">false</span>;\n' +
            '      }\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete&#39;</span>,\n' +
            '      url<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete.php&#39;</span>,\n' +
            '      param<span style="color: #666666">:</span> { p1<span style="color: #666666">:</span> <span style="color: #40a070">1</span>, p2<span style="color: #666666">:</span> <span style="color: #40a070">2</span> },\n' +
            '    },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete&#39;</span>,\n' +
            '      url<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;delete.php&#39;</span>,\n' +
            '      param<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #007020; font-weight: bold">return</span> {\n' +
            '          random<span style="color: #666666">:</span> (<span style="color: #007020">Math</span>.random() <span style="color: #666666">*</span> <span style="color: #40a070">100</span>).toFixed(<span style="color: #40a070">2</span>)\n' +
            '        };\n' +
            '      }\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'printbutton',
          title     : 'Print Button',
          doc       : null,
          desc: `The Print button open URL in new window tab.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_printbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;print&#39;</span></i>,\n' +
            '      text  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Open Documentation&#39;</span>,\n' +
            '      url   <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;url_link&#39;</span>\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'excelbutton',
          title     : 'Excel Button',
          doc       : null,
          desc      : `The Excel button exports the bound data to an Excel file.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_excelbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;excel&#39;</span></i>,\n' +
            '      filename<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;My_Excel_File&#39;</span>,\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'csvbutton',
          title     : 'CSV Button',
          doc       : null,
          desc      : `The CSV button exports the bound data to a CSV file.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_csvbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;csv&#39;</span></i>,\n' +
            '      filename<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;My_CSV_File&#39;</span>,\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'custombtnbutton',
          title     : 'Custom Button',
          doc       : null,
          desc      : `You can use the CustomButton button to create your customised button.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_custombtnbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button    <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;custombutton&#39;</span></i>,\n' +
            '      icon      <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;fa-solid fa-earth&#39;</span>,\n' +
            '      iconColor <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;yellow&#39;</span>,\n' +
            '      text      <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Hello World !&#39;</span>,\n' +
            '      click<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
            '        <span style="color: #007020">window</span>.alert(<span style="color: #4070a0">&#39;Hello World !&#39;</span>);\n' +
            '      },\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'custombutton',
          title     : 'Custom Node',
          doc       : null,
          desc      : `You can use the Custom button to create your own element.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_custombutton&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button    <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;custom&#39;</span></i>,\n' +
            '      buttonNode<span style="color: #666666">:</span> $(<span style="color: #4070a0">&#39;&lt;i class=&quot;text-primary&quot;&gt;Welcome to EnhanceDataGrid.js !&#39;</span>)\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'divider',
          title     : 'Divider',
          doc       : null,
          desc      : `Divider is used to expand the space between two elements.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_divider&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { button <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;reload&#39;</span> },\n' +
            '    { <i class="hl">button <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;divider&#39;</span></i> },\n' +
            '    {\n' +
            '      button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;print&#39;</span>,\n' +
            '      text  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Documentation&#39;</span>,\n' +
            '      url   <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html&#39;</span>\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'separator',
          title     : 'Separator',
          doc       : null,
          desc      : 'Separator create a gap between two elements.',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_separator&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { button <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;reload&#39;</span> },\n' +
            '    { <i class="hl">button <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;separator&#39;</span></i> },\n' +
            '    {\n' +
            '      button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;custombutton&#39;</span>,\n' +
            '      icon  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;none&#39;</span>,\n' +
            '      text  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Oh no... Do not leave me T_T&#39;</span>,\n' +
            '    },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
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
          id        : 'json_source',
          title     : 'JSON Source',
          doc       : null,
          desc      : `Property <i class="text-danger">jsonSource</i> is the simplest data source declaration.
            It is the same as the <i class="text-danger">dataSource</i> property with preset options : { datatype: 'json', id: 'id', cache: false }.
            You just need to specify the object property <i class="text-danger">url</i> and <i class="text-danger">datafields</i>.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18\n' +
            '19\n' +
            '20\n' +
            '21\n' +
            '22\n' +
            '23</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_jsonsource&#39;</span>,\n' +
            '  altrows<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns<span style="color: #666666">:</span> columns_array,\n' +
            '  columns<span style="color: #666666">:</span> [\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Company Name&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;CompanyName&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">250</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Contact Name&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactName&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">150</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Contact Title&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactTitle&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">180</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">120</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span> },\n' +
            '  ],\n' +
            '  <i class="hl">jsonSource</i><span style="color: #666666">:</span> {\n' +
            '    <i class="text-black"><b>url</b></i><span style="color: #666666">:</span> <span style="color: #4070a0">&#39;demo/customers.txt&#39;</span>,\n' +
            '    <i class="text-black"><b>datafields</b></i><span style="color: #666666">:</span> [\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;CompanyName&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactName&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactTitle&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Address&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '    ]\n' +
            '  },\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'data_source',
          title     : 'DataSource',
          doc       : null,
          desc      : `Property <i class="text-danger">dataSource</i> is the basic data source declaration for EnhanceDataGrid.
            It will be automatically passed into the jqxGrid's <i class="text-danger">source</i> property as the option object of <i class="text-primary">new</i> <i class="text-black">$.jqx.dataAdapter(<b>dataSource</b>)</i>.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13\n' +
            '14\n' +
            '15\n' +
            '16\n' +
            '17\n' +
            '18\n' +
            '19\n' +
            '20\n' +
            '21\n' +
            '22\n' +
            '23\n' +
            '24</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id        <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_data_source&#39;</span>,\n' +
            '  altrows   <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns   <span style="color: #666666">:</span> [\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Company Name&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;CompanyName&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">250</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Contact Name&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactName&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">150</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Contact Title&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactTitle&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">180</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, width<span style="color: #666666">:</span> <span style="color: #40a070">120</span> },\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span>, datafield<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span> },\n' +
            '  ],\n' +
            '  <i class="hl">dataSource</i><span style="color: #666666">:</span> {\n' +
            '    datatype<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;json&#39;</span>,\n' +
            '    id<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;CustomerID&#39;</span>,\n' +
            '    url<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;demo/customers.txt&#39;</span>,\n' +
            '    datafields<span style="color: #666666">:</span> [\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;CompanyName&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactName&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;ContactTitle&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Address&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;City&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '      { name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Country&#39;</span>, type<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;string&#39;</span> },\n' +
            '    ]\n' +
            '  },\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
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
          id        : 'rowindex',
          title     : `Row Index`,
          doc       : null,
          desc      : `By default, EnhanceDataGrid displays the row number along with the aggregate Row Total.
            You can simply hide the aggregate Row by setting jqxGrid's property <i class="text-danger">showstatusbar: false</i>.
            The <i class="text-danger">rowIndexWidth</i> property allows you to change the width of the row number column.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%">1\n' +
            '2\n' +
            '3\n' +
            '4\n' +
            '5\n' +
            '6\n' +
            '7\n' +
            '8</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id            <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_rowindex&#39;</span>,\n' +
            '  altrows       <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  showstatusbar <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">false</span>,\n' +
            '  rowIndexWidth <span style="color: #666666">:</span> <span style="color: #40a070">100</span>,\n' +
            '  columns       <span style="color: #666666">:</span> JSON.parse(JSON.stringify(columns)),\n' +
            '  dataSource    <span style="color: #666666">:</span> JSON.parse(JSON.stringify(source)),\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'centeredcolumns',
          title     : `Centered Columns`,
          doc       : null,
          desc      : `By setting <i class="text-danger">centeredColumns: true</i>, you can centre all columns at once. (All columns and column groups)`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id              <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_centeredcolumns&#39;</span>,\n' +
            '  altrows         <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">centeredColumns <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns         <span style="color: #666666">:</span> JSON.parse(JSON.stringify(columns)),\n' +
            '  dataSource      <span style="color: #666666">:</span> JSON.parse(JSON.stringify(source)),\n' +
            '  columngroups    <span style="color: #666666">:</span> [\n' +
            '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Buyer Details&#39;</span>, name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;buyer&#39;</span> },\n' +
            '  ],\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'usebootstrap',
          title     : `Bootstrap Modal`,
          doc       : null,
          desc      : `Property <i class="text-danger">useBootstrap: true</i> will change the EnhanceDataGrid meseage to using Bootstrap Modal, if Bootstrap default variable is found.`,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1\n' +
            ' 2\n' +
            ' 3\n' +
            ' 4\n' +
            ' 5\n' +
            ' 6\n' +
            ' 7\n' +
            ' 8\n' +
            ' 9\n' +
            '10\n' +
            '11\n' +
            '12\n' +
            '13</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_usebootstrap&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  <i class="hl">useBootstrap<span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span></i>,\n' +
            '  columns     <span style="color: #666666">:</span> JSON.parse(JSON.stringify(columns)),\n' +
            '  dataSource  <span style="color: #666666">:</span> JSON.parse(JSON.stringify(source)),\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;reload&#39;</span> },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;edit&#39;</span> },\n' +
            '    { button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;print&#39;</span> },\n' +
            '  ]\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
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
          id        : 'clearselection',
          title     : `clearSelection()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#clearSelection',
          desc      : 'Clears the selection.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.clearSelection();\n' +
            '</pre></div>'
        },
        {
          id        : 'refresh',
          title     : `refresh()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#refresh',
          desc      : 'Clears the selection, updates the bound data and refreshed the grid.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.refresh();\n' +
            '</pre></div>'
        },
        {
          id        : 'updatebounddata',
          title     : `updateBoundData()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#updateBoundData',
          desc      : 'Updates the bound data and refreshes the grid.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.updateBoundData();\n' +
            '</pre></div>'
        },
        {
          id        : 'on',
          title     : `on()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#on',
          desc      : 'Register grid event listener.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.on(<span style="color: #4070a0">&#39;&lt;jqxGrid-event&gt;&#39;</span>, callback_function() { <span style="color: #60a0b0; font-style: italic">/* coding... */</span> });\n' +
            '</pre></div>'
        },
        {
          id        : 'getalldirty',
          title     : `getAllDirty()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getAllDirty',
          desc      : 'Gets all dirty { key:value } pairs.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getAllDirty();\n' +
            '</pre></div>'
        },
        {
          id        : 'getdirty',
          title     : `getDirty()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getDirty',
          desc      : 'Gets all dirty { id:value } pairs.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getDirty();\n' +
            '</pre></div>'
        },
        {
          id        : 'getcheckeditems',
          title     : `getCheckedItems()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getCheckedItems',
          desc      : 'Gets all selected data ID.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getCheckedItems();\n' +
            '</pre></div>'
        },
        {
          id        : 'getcellvalue',
          title     : `<del class="text-danger">getCellValue()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getCellValue',
          desc      : 'Gets the value of a cell.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getCellValue(<span style="color: #666666">&lt;</span>rowBoundIndex<span style="color: #666666">&gt;</span>, <span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : get Name of Row 2</span>\n' +
            'grid.getCellValue(<span style="color: #40a070">1</span>, <span style="color: #4070a0">&#39;firstname&#39;</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'getrows',
          title     : `<del class="text-danger">getRows()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getRows',
          desc      : 'Gets all rows.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getRows();\n' +
            '</pre></div>'
        },
        {
          id        : 'getrowdata',
          title     : `<del class="text-danger">getRowData()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getRowData',
          desc      : 'Gets the data of a row.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getRowData(<span style="color: #666666">&lt;</span>rowBoundIndex<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : get data of Row 2</span>\n' +
            'grid.getRowData(<span style="color: #40a070">1</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'getselectedrowdata',
          title     : `getSelectedRowData()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowData',
          desc      : 'Gets the data of the selected row.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getSelectedRowData();\n' +
            '</pre></div>'
        },
        {
          id        : 'getselectedcellvalue',
          title     : `getSelectedCellValue()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedCellValue',
          desc      : 'Gets the value of a cell of the selected row.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getSelectedCellValue(<span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : get selected row&#39;s Name</span>\n' +
            'grid.getSelectedCellValue(<span style="color: #4070a0">&#39;firstname&#39;</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'getselectedrowindex',
          title     : `<del class="text-danger">getSelectedRowIndex()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowIndex',
          desc      : 'Gets the bound index of the selected row.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getSelectedRowIndex();\n' +
            '</pre></div>'
        },
        {
          id        : 'getselectedrowindexes',
          title     : `<del class="text-danger">getSelectedRowIndexes()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSelectedRowIndexes',
          desc      : 'Gets the indexes of the selected rows.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getSelectedRowIndexes();\n' +
            '</pre></div>'
        },
        {
          id        : 'hidecolumn',
          title     : `hideColumn()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#hideColumn',
          desc      : 'Hide column.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// Syntax 1</span>\n' +
            'grid.hideColumn(<span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : hide Product</span>\n' +
            'grid.hideColumn(<span style="color: #4070a0">&#39;productname&#39;</span>);\n' +
            '\n' +
            '<span style="color: #60a0b0; font-style: italic">// Syntax 2</span>\n' +
            'grid.hideColumn(<span style="color: #666666">&lt;</span><span style="color: #007020">Array</span><span style="color: #666666">-</span>of<span style="color: #666666">-</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : hide Name and Last Name</span>\n' +
            'grid.hideColumn([<span style="color: #4070a0">&#39;firstname&#39;</span>, <span style="color: #4070a0">&#39;lastname&#39;</span>]);\n' +
            '</pre></div>'
        },
        {
          id        : 'showcolumn',
          title     : `showColumn()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#showColumn',
          desc      : 'Shows column.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// Syntax 1</span>\n' +
            'grid.showColumn(<span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : show Product</span>\n' +
            'grid.showColumn(<span style="color: #4070a0">&#39;productname&#39;</span>);\n' +
            '\n' +
            '<span style="color: #60a0b0; font-style: italic">// Syntax 2</span>\n' +
            'grid.showColumn(<span style="color: #666666">&lt;</span><span style="color: #007020">Array</span><span style="color: #666666">-</span>of<span style="color: #666666">-</span>dataField<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : show Name and Last Name</span>\n' +
            'grid.showColumn([<span style="color: #4070a0">&#39;firstname&#39;</span>, <span style="color: #4070a0">&#39;lastname&#39;</span>]);\n' +
            '</pre></div>'
        },
        {
          id        : 'updatecellvalue',
          title     : `<del class="text-danger">updateCellValue()</del>`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#updateCellValue',
          desc      : 'Sets a new value to a cell.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.updateCellValue(<span style="color: #666666">&lt;</span>rowBoundIndex<span style="color: #666666">&gt;</span>, <span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>, <span style="color: #666666">&lt;</span>newValue<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : update Name of Row 2 to &quot;hello world&quot;</span>\n' +
            'grid.updateCellValue(<span style="color: #40a070">1</span>, <span style="color: #4070a0">&#39;firstname&#39;</span>, <span style="color: #4070a0">&#39;hello world&#39;</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'setselectedcellvalue',
          title     : `setSelectedCellValue()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#setSelectedCellValue',
          desc      : 'Sets a new value to a cell of the selected row.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.setSelectedCellValue(<span style="color: #666666">&lt;</span>dataField<span style="color: #666666">&gt;</span>, <span style="color: #666666">&lt;</span>newValue<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : update selected row&#39;s Name to &quot;hello world&quot;</span>\n' +
            'grid.setSelectedCellValue(<span style="color: #4070a0">&#39;firstname&#39;</span>, <span style="color: #4070a0">&#39;hello world&#39;</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'getsourceurl',
          title     : `getSourceUrl()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#getSourceUrl',
          desc      : 'Get URL of data source.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.getSourceUrl();\n' +
            '</pre></div>'
        },
        {
          id        : 'setsourceurl',
          title     : `setSourceUrl()`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#setSourceUrl',
          desc      : 'Update URL of data source and refresh Grid.',
          ratio     : '7,5',
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">grid.setSourceUrl(<span style="color: #666666">&lt;</span>newUrl<span style="color: #666666">&gt;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// example : update source url to &quot;demo/customers-2.txt&quot;</span>\n' +
            'grid.setSourceUrl(<span style="color: #4070a0">&#39;demo/customers-2.txt&#39;</span>);\n' +
            '</pre></div>'
        },
      ],
    },
    {
      // Append static methods
      id    : 'statics',
      title : 'Static Methods',
      menu  : [
        {
          id        : 'debounce',
          title     : `debounce`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.debounce',
          desc      : 'Debounce function.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">const</span> msg <span style="color: #666666">=</span> <span style="color: #4070a0">&#39;3 seconds passed without function being called again.&#39;</span>;\n' +
            '<span style="color: #007020; font-weight: bold">const</span> debounce_func <span style="color: #666666">=</span> EDG.debounce(() <span style="color: #666666">=&gt;</span> console.log(msg), <span style="color: #40a070">3000</span>);\n' +
            'debounce_func();\n' +
            '</pre></div>'
        },
        {
          id        : 'getsearchparameters',
          title     : `getSearchParameters`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.getSearchParameters',
          desc      : 'Get query string of an URL.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// get current browser tab query string</span>\n' +
            'EDG.getSearchParameters();\n' +
            '<span style="color: #60a0b0; font-style: italic">// get given url query string</span>\n' +
            'EDG.getSearchParameters(<span style="color: #4070a0">&quot;url.php?a=1&amp;b=2&quot;</span>);\n' +
            '</pre></div>'
        },
        {
          id        : 'insertquerystring',
          title     : `insertQueryString`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.insertQueryString',
          desc      : 'Append query string to an URL.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%">EDG.insertQueryString(<span style="color: #4070a0">&quot;url.php&quot;</span>, { p1<span style="color: #666666">:</span> <span style="color: #40a070">1</span>, p2<span style="color: #666666">:</span> <span style="color: #40a070">2</span> });\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'isemptystring',
          title     : `isEmptyString`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isEmptyString',
          desc      : 'Check input is an empty string.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// return true</span>\n' +
            'EDG.isEmptyString(<span style="color: #4070a0">&#39;&#39;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// return false</span>\n' +
            'EDG.isEmptyString(<span style="color: #4070a0">&#39;string&#39;</span>);\n' +
            'EDG.isEmptyString(<span style="color: #40a070">1</span>);\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'isnull',
          title     : `isNull`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isNull',
          desc      : 'Check input is null.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// return true</span>\n' +
            'EDG.isNull(<span style="color: #007020; font-weight: bold">null</span>);\n' +
            'EDG.isNull(<span style="color: #4070a0">&#39;null&#39;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// return false</span>\n' +
            'EDG.isNull(<span style="color: #4070a0">&#39;null&#39;</span>, <span style="color: #007020; font-weight: bold">true</span><span style="color: #60a0b0; font-style: italic">/* identital equal */</span>);\n' +
            'EDG.isNull(<span style="color: #40a070">1</span>);\n' +
            'EDG.isNull(<span style="color: #4070a0">&#39;string&#39;</span>);\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'isundefined',
          title     : `isUndefined`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isUndefined',
          desc      : 'Check input is undefined.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// return true</span>\n' +
            'EDG.isUndefined(<span style="color: #007020; font-weight: bold">undefined</span>);\n' +
            'EDG.isUndefined(<span style="color: #4070a0">&#39;undefined&#39;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// return false</span>\n' +
            'EDG.isUndefined(<span style="color: #4070a0">&#39;undefined&#39;</span>, <span style="color: #007020; font-weight: bold">true</span><span style="color: #60a0b0; font-style: italic">/* identital equal */</span>);\n' +
            'EDG.isUndefined(<span style="color: #40a070">1</span>);\n' +
            'EDG.isUndefined(<span style="color: #4070a0">&#39;string&#39;</span>);\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'isunset',
          title     : `isUnset`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isUnset',
          desc      : 'Check input is unset.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #60a0b0; font-style: italic">// return true</span>\n' +
            'EDG.isUnset(<span style="color: #007020; font-weight: bold">null</span>);\n' +
            'EDG.isUnset(<span style="color: #007020; font-weight: bold">undefined</span>);\n' +
            'EDG.isUnset(<span style="color: #4070a0">&#39;&#39;</span>);\n' +
            '<span style="color: #60a0b0; font-style: italic">// return false</span>\n' +
            'EDG.isUndefined(<span style="color: #4070a0">&#39;0&#39;</span>);\n' +
            'EDG.isUndefined(<span style="color: #40a070">0</span>);\n' +
            'EDG.isUndefined({ a<span style="color: #666666">:</span> <span style="color: #40a070">1</span> });\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'isvalidkeyboardinput',
          title     : `isValidKeyboardInput`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.isValidKeyboardInput',
          desc      : 'Check whether is a valid keyboard input.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%">$(<span style="color: #4070a0">&#39;input&#39;</span>).keyup(e <span style="color: #666666">=&gt;</span> {\n' +
            '  <span style="color: #007020; font-weight: bold">if</span> (EDG.isValidKeyboardInput(e)) {\n' +
            '    <span style="color: #60a0b0; font-style: italic">// coding...</span>\n' +
            '  }\n' +
            '});\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'throttle',
          title     : `throttle`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.throttle',
          desc      : 'Throttle function.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">cosnt msg <span style="color: #666666">=</span> <span style="color: #4070a0">&#39;This function will execute at most once every 3 seconds.&#39;</span>;\n' +
            '<span style="color: #007020; font-weight: bold">const</span> throttle_func <span style="color: #666666">=</span> EDG.throttle(() <span style="color: #666666">=&gt;</span> console.log(msg), <span style="color: #40a070">3000</span>);\n' +
            'throttle_func();\n' +
            '</pre></div>'
        },
        {
          id        : 'transformobjecttostring',
          title     : `transformObjectToString`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.transformObjectToString',
          desc      : 'Transform Object to String.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"></pre></td><td><pre style="margin: 0; line-height: 125%">EDG.transformObjectToString({ a<span style="color: #666666">:</span> <span style="color: #40a070">1</span>, b<span style="color: #666666">:</span> <span style="color: #40a070">2</span> });\n' +
            '</pre></td></tr></table></div>'
        },
        {
          id        : 'transformstringtoobject',
          title     : `transformStringToObject`,
          doc       : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html#.transformStringToObject',
          desc      : 'Transform String to Object.',
          static    : true,
          colorcode :
            '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><pre style="margin: 0; line-height: 125%">EDG<span style="color: #666666">.</span>transformStringToObject(<span style="color: #4070a0">&quot;a=1&amp;b=2&quot;</span>);\n' +
            '</pre></div>'
        },
      ],
    },
    // {
    //   // Append xxx
    //   id    : 'ids',
    //   title : 'title',
    //   menu  : [
    //     {
    //       id        : 'article_id',
    //       title     : `article_name`,
    //       doc       : null,
    //       desc      : null,
    //       sourcecode: null,
    //       colorcode : null
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

  // setTimeout(() => {
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
          url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/doc/EnhanceDataGrid.html'
        },
      ]
    });

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

    // Features : Row Index
    const edg_rowindex = new EnhanceDataGrid({
      id            : '#edg_rowindex',
      altrows       : true,
      showstatusbar : false,
      rowIndexWidth : 100,
      columns       : JSON.parse(JSON.stringify(columns)),
      dataSource    : JSON.parse(JSON.stringify(source)),
    });

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
  // }, 500);

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
