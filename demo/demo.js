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
            ${sourcecode}
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
    '<!-- HTML generated using hilite.me --><div style="background: #f0f0f0; overflow:auto;width:auto;border:solid gray;border-width:.0em .0em .0em .8em;padding:.6em;"><table><tr><td><pre style="margin: 0; line-height: 125%">1\n' +
    '2\n' +
    '3\n' +
    '4\n' +
    '5\n' +
    '6\n' +
    '7\n' +
    '8\n' +
    '9</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
    '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_defaultfunc&#39;</span>,\n' +
    '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
    '  columns     <span style="color: #666666">:</span> columns_array,\n' +
    '  columngroups<span style="color: #666666">:</span> [\n' +
    '    { text<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Buyer Details&#39;</span>, name<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;buyer&#39;</span> },\n' +
    '  ],\n' +
    '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
    '});\n' +
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
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id          : '#edg_enterfilter',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  <i class='text-danger'>searchInput : true</i>,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
          colorcode:
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
            The example below shows a grid in pure Find mode. `,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id            : '#edg_enterfilterfind',\n" +
            "  buttonTheme   : 'material-purple',\n" +
            "  altrows       : true,\n" +
            "  <i class='text-danger'>searchInput   : true</i>,\n" +
            "  <i class='text-danger'>showFindButton: true</i>,\n" +
            "  <i class='text-danger'>enterFind     : true</i>,\n" +
            "  columns       : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource    : source,\n" +
            "});",
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id          : '#edg_autofilter',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  searchInput : true,\n" +
            "  autoFilter  : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
          colorcode:
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id          : '#edg_autofind',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  altrows     : true,\n" +
            "  searchInput : true,\n" +
            "  autoFind    : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "});",
          colorcode:
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id              : '#edg_autodelaytiming',\n" +
            "  buttonTheme     : 'material-purple',\n" +
            "  altrows         : true,\n" +
            "  searchInput     : true,\n" +
            "  autoFilter      : true,\n" +
            "  autoDelayTiming : 500,\n" +
            "  columns         : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource      : source,\n" +
            "});",
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id                  : '#edg_filterrow',\n" +
            "  buttonTheme         : 'material-purple',\n" +
            "  altrows             : true,\n" +
            "  searchInput         : true,\n" +
            "  showfilterrow       : true,\n" +
            "  showFilterRowButton : false,\n" +
            "  columns             : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource          : source,\n" +
            "});",
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id          : '#edg_reloadbutton',\n" +
            "  buttonTheme : 'material-purple',\n" +
            "  searchInput : true,\n" +
            "  columns     : JSON.parse(JSON.stringify(columns)),\n" +
            "  dataSource  : source,\n" +
            "  tbElement   : [\n" +
            "    { button: 'reload' },\n" +
            "  ]\n" +
            "});",
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
          desc      : 'Print button open URL in new window tab.',
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
            '17</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id          <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_custombtnbutton&#39;</span>,\n' +
            '  buttonTheme <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;material-purple&#39;</span>,\n' +
            '  altrows     <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns     <span style="color: #666666">:</span> columns_array,\n' +
            '  dataSource  <span style="color: #666666">:</span> source_object,\n' +
            '  tbElement   <span style="color: #666666">:</span> [\n' +
            '    {\n' +
            '      <i class="hl">button<span style="color: #666666">:</span> <span style="color: #4070a0">&#39;custombutton&#39;</span></i>,\n' +
            '      icon  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;fa-solid fa-earth&#39;</span>,\n' +
            '      text  <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;Hello World !&#39;</span>,\n' +
            '      click <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">function</span>() {\n' +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id          : '#edg_custombutton',\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
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
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id: '#edg_jsonsource',\n" +
            "  altrows: true,\n" +
            "  columns: JSON.parse(JSON.stringify(columns)),\n" +
            "  columns: [\n" +
            "    { text: 'Company Name', datafield: 'CompanyName', width: 250 },\n" +
            "    { text: 'Contact Name', datafield: 'ContactName', width: 150 },\n" +
            "    { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },\n" +
            "    { text: 'City', datafield: 'City', width: 120 },\n" +
            "    { text: 'Country', datafield: 'Country' },\n" +
            "  ],\n" +
            "  jsonSource: {\n" +
            "    url: 'demo/customers.txt',\n" +
            "    datafields: [\n" +
            "      { name: 'CompanyName', type: 'string' },\n" +
            "      { name: 'ContactName', type: 'string' },\n" +
            "      { name: 'ContactTitle', type: 'string' },\n" +
            "      { name: 'Address', type: 'string' },\n" +
            "      { name: 'City', type: 'string' },\n" +
            "      { name: 'Country', type: 'string' },\n" +
            "    ]\n" +
            "  },\n" +
            "});",
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
        {
          id        : 'data_source',
          title     : 'DataSource',
          doc       : null,
          desc      : null,
          sourcecode:
            "<span class='text-primary'>new</span> <span class='text-black'>EnhanceDataGrid</span>({\n" +
            "  id: '#edg_datasource',\n" +
            "  altrows: true,\n" +
            "  columns: JSON.parse(JSON.stringify(columns)),\n" +
            "  columns: [\n" +
            "    { text: 'Company Name', datafield: 'CompanyName', width: 250 },\n" +
            "    { text: 'Contact Name', datafield: 'ContactName', width: 150 },\n" +
            "    { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },\n" +
            "    { text: 'City', datafield: 'City', width: 120 },\n" +
            "    { text: 'Country', datafield: 'Country' },\n" +
            "  ],\n" +
            "  dataSource: {\n" +
            "    datatype: 'json',\n" +
            "    id: 'CustomerID',\n" +
            "    url: 'demo/customers.txt',\n" +
            "    datafields: [\n" +
            "      { name: 'CompanyName', type: 'string' },\n" +
            "      { name: 'ContactName', type: 'string' },\n" +
            "      { name: 'ContactTitle', type: 'string' },\n" +
            "      { name: 'Address', type: 'string' },\n" +
            "      { name: 'City', type: 'string' },\n" +
            "      { name: 'Country', type: 'string' },\n" +
            "    ]\n" +
            "  },\n" +
            "});",
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
            '25</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id        <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_data_source&#39;</span>,\n' +
            '  altrows   <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  columns   <span style="color: #666666">:</span> columns_array,\n' +
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
      // Append xxx
      id    : 'features',
      title : 'Features',
      menu  : [
        {
          id        : 'rowindex',
          title     : `Row Index`,
          doc       : null,
          desc      : null,
          sourcecode: null,
          colorcode:
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
          desc      : null,
          sourcecode: null,
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
            '10</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007020; font-weight: bold">new</span> EnhanceDataGrid({\n' +
            '  id              <span style="color: #666666">:</span> <span style="color: #4070a0">&#39;#edg_centeredcolumns&#39;</span>,\n' +
            '  altrows         <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
            '  centeredColumns <span style="color: #666666">:</span> <span style="color: #007020; font-weight: bold">true</span>,\n' +
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
          desc      : null,
          sourcecode: null,
          colorcode: null
        },
        // {
        //   id        : 'article_id',
        //   title     : `article_name`,
        //   doc       : null,
        //   desc      : null,
        //   sourcecode: null,
        //   colorcode: null
        // },
      ],
    },
    {
      // Append xxx
      id    : 'methods',
      title : 'Methods',
      menu  : [
        {
          id        : 'clearselection',
          title     : `clearSelection()`,
          doc       : null,
          desc      : null,
          sourcecode: null,
          colorcode: null
        },
        {
          id        : 'refresh',
          title     : `refresh()`,
          doc       : null,
          desc      : null,
          sourcecode: null,
          colorcode: null
        },
        // refresh
        // updateBoundData
        // on
        // getAllDirty
        // getDirty
        // getCheckedItems
        // getCellValue
        // getRows
        // getRowData
        // getSelectedRowData
        // getSelectedCellValue
        // getSelectedRowIndex
        // getSelectedRowIndexes
        // hideColumn
        // showColumn
        // updateCellValue
        // updateSelectedCellValue
        // getSourceUrl
        // updateSourceUrl

        // debounce
        // getSearchParameters
        // insertQueryString
        // isEmptyString
        // isNull
        // isUndefined
        // isUnset
        // isValidKeyboardInput
        // throttle
        // transformObjectToString
        // transformStringToObject
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
    //       colorcode: null
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
      { button: 'add',
        click: function() {
          window.alert('You clicked the add button');
        },
      },
      { button: 'add',
        text: 'Open jqxWindow',
        win: '#edg_jqxWindow',
      },
      // TODO: page auto-scroll to top, why ???
      // { button: 'add', text: 'Open jqxWindow (Centered)', win: '#edg_jqxWindow', winOpenOnButton: false },
      { button: 'add',
        text: 'Open Modal',
        modal: '#exampleModal',
        form: '#exampleForm',
      },
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
      { button: 'edit',
        click: function() {
          window.alert('You clicked the edit button');
        },
      },
      { button: 'edit',
        text: 'Open jqxWindow',
        win: '#edg_jqxWindow',
      },
      { button: 'edit',
        text: 'Open Modal',
        modal: '#exampleModal',
      },
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
        text  : 'Open Documentation',
        url   : 'https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/EnhanceDataGrid.html'
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

  // Component : json source
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

  // Component : data source
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

  // Feature : Row Index
  const edg_rowindex = new EnhanceDataGrid({
    id            : '#edg_rowindex',
    altrows       : true,
    showstatusbar : false,
    rowIndexWidth : 100,
    columns       : JSON.parse(JSON.stringify(columns)),
    dataSource    : JSON.parse(JSON.stringify(source)),
  });

  // Feature : Centered Columns
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

  // Feature : Centered Columns
  const edg_usebootstrap = new EnhanceDataGrid({
    id          : '#edg_usebootstrap',
    buttonTheme : 'material-purple',
    altrows     : true,
    useBootstrap: true,
    columns     : JSON.parse(JSON.stringify(columns)),
    dataSource  : JSON.parse(JSON.stringify(source)),
    tbElement   : [
      { button: 'edit' },
      { button: 'delete' },
      { button: 'print' },
    ]
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

  $('#edg_jqxWindow')
    .jqxWindow({ width: 500, height: 300, isModal: true, autoOpen: false });

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
