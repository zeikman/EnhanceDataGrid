# [EnhanceDataGrid.js](https://www.rightpristine.com/zeikman/EnhanceDataGrid/) (Beta v0.3.0)

EnhanceDataGrid is a library that extends [jQWidgets](https://www.jqwidgets.com/)' [jqxGrid](https://www.jqwidgets.com/jquery-widgets-demo/demos/jqxgrid/index.htm) widget and provides a lot of useful built-in methods and functionalities to deal with data retrieving, updateing, filtering, finding, etc.

## Get Started

Include EnhanceDataGrid library after jqxGrid library.

```sh
<link rel="stylesheet" href="path-to-jqwidgets/jqwidgets/styles/jqx.base.css" type="text/css" />
<script type="text/javascript" src="path-to-jqwidgets/jqwidgets/jqxgrid.js"></script>
<!-- ## Remember to include all jqxgrid related libraries and other necessary dependency libraries ## -->

<link rel="stylesheet" href="path-to-EnhanceDataGrid/EnhanceDataGrid.css" type="text/css" />
<script type="text/javascript" src="path-to-EnhanceDataGrid/EnhanceDataGrid.js"></script>
```

It is recommended to use with the following libraries to have a prettier UI experience.

[Font-Awesome](https://fontawesome.com/) - Default icon library. (Tested version: 6.2.1)

[Bootstrap](https://getbootstrap.com/) - Utilizes Modal, etc. (Tested version: 5.2.3)

[jQuery-Confirm](https://craftpip.github.io/jquery-confirm/) - Utilizes jQuery.confirm, jQuery.alert, and etc. (Tested version: 3.3.4)

### How to use

Full [documentation](https://www.rightpristine.com/zeikman/EnhanceDataGrid/documentation/) is over here.

```javascript
// jsonSource comes with some preset options
const source_json_object = {
  url: 'url.php',
  datafields: [
    { name: 'id', type: 'number' },
    ...
  ],
};
// standard jqxGrid source
const source_url_object = {
  id: 'id',
  datafields: [
    { name: 'id', type: 'number' },
    ...
  ],
  // example for JSON
  datatype: "json",
  url: 'url.php',
  // example for local Array
  datatype: "array",
  localdata: [Array of Object],
};
const grid = new EnhanceDataGrid({
  // jqxGrid properties
  column: [...],
  source: new $.jqx.dataAdapter(source_url_object),
  ...
  // EnhanceDataGrid properties
  id                  : '#grid_id',
  jsonSource          : source_json_object,
  dataSource          : source_url_object,
  checkedDatafield    : 'checked',
  useBootstrap        : true,
  searchInput         : true,
  showRowIndex        : false,
  rowIndexWidth       : 100,
  tbElement           : [
    { button: 'reload' },
    { button: 'add' },
    { button: 'edit' },
    ...
  ],
});
```

## Properties

<table>
  <thead>
    <tr>
      <th style="text-align: left;">Properties</th>
      <th style="text-align: left;">Type</th>
      <th style="text-align: left;">Description</th>
      <th style="text-align: left;">Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>Grid's ID</td>
      <td></td>
    </tr>
    <tr>
      <td>jsonSource</td>
      <td>String</td>
      <td>Grid's data source, same as dataSource with preset options : { datatype:'json', id:'id', cache:false }.</td>
      <td></td>
    </tr>
    <tr>
      <td>dataSource</td>
      <td>String</td>
      <td>Grid's data source object.</td>
      <!-- <td>Grid's data source, needed when dataAdapter not provided.</td> -->
      <td></td>
    </tr>
    <!-- <tr>
      <td>dataAdapter</td>
      <td>Object</td>
      <td>Grid's data adapter, needed when dataSource not provided.</td>
      <td></td>
    </tr> -->
    <!-- <tr>
      <td>dateFormat</td>
      <td>String</td>
      <td>Date format applied when filtering data in a 'date' column.</td>
      <td>''</td>
    </tr> -->
    <tr>
      <td>checkedDatafield</td>
      <td>String</td>
      <td>Data field which use to get all selected data ID.</td>
      <td>'selected'</td>
    </tr>
    <tr>
      <td>buttonTheme</td>
      <td>String</td>
      <td>Default theme for built-in button component.</td>
      <td>''</td>
    </tr>
    <tr>
      <td>useBootstrap</td>
      <td>Boolean</td>
      <td>Enable/Disable Bootstrap Theme on Grid message.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>centeredColumns</td>
      <td>Boolean</td>
      <td>Sets True to auto append { align: 'center' } to all columns.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showRowIndex</td>
      <td>Boolean</td>
      <td>Show row index.</td>
      <td>true</td>
    </tr>
    <tr>
      <td>rowIndexWidth</td>
      <td>Number</td>
      <td>Row index width.</td>
      <td>50</td>
    </tr>
    <tr>
      <td>searchInput</td>
      <td>Boolean</td>
      <td>Show search bar (in toolbar).</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showFindButton</td>
      <td>Boolean</td>
      <td>Show 'Find' button (in toolbar).</td>
      <td>false</td>
    </tr>
    <tr>
      <td>showFilterButton</td>
      <td>Boolean</td>
      <td>Show 'Filter' button (in toolbar).</td>
      <td>true</td>
    </tr>
    <tr>
      <td>showFilterRowButton</td>
      <td>Boolean</td>
      <td>Show 'Filter Row' toggle button (in toolbar).</td>
      <td>true</td>
    </tr>
    <tr>
      <td>enterFilter</td>
      <td>Boolean</td>
      <td>Keyboard shortcut Filter (Enter key).</td>
      <td>true</td>
    </tr>
    <tr>
      <td>enterFind</td>
      <td>Boolean</td>
      <td>Keyboard shortcut Find (Ctrl+Enter key).</td>
      <td>false</td>
    </tr>
    <tr>
      <td>autoFilter</td>
      <td>Boolean</td>
      <td>Auto filter after certain timing delay.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>autoFind</td>
      <td>Boolean</td>
      <td>Auto find after certain timing delay.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>autoDelayTiming</td>
      <td>Number</td>
      <td>Timing delay for autoFilter/autoFind.</td>
      <td>300 (in miliseconds)</td>
    </tr>
    <tr>
      <td>tbElement</td>
      <td>Object[]</td>
      <td>
        Grid's toolbar built-in component.<br />
        <br />Button component: 'reload', 'add', 'edit', 'delete', 'print', 'excel', 'csv', 'custombutton', 'custom'.<br />
        <br />Other component: 'divider', 'separator'.
      </td>
      <td>[ ]</td>
    </tr>
  </tbody>
</table>

## Methods

<table>
  <thead>
    <tr>
      <th style="text-align: left;">Method</th>
      <th style="text-align: left;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>clearSelection</td>
      <td>Clears the selection.</td>
    </tr>
    <tr>
      <td>getAllDirty</td>
      <td>Gets all dirty { key:value } pairs.</td>
    </tr>
    <tr>
      <td>getCellValue</td>
      <td>Gets the value of a cell.</td>
    </tr>
    <tr>
      <td>getCheckedItems</td>
      <td>Gets all selected data ID.</td>
    </tr>
    <tr>
      <td>getDirty</td>
      <td>Gets all dirty { id:value } pairs.</td>
    </tr>
    <tr>
      <td>getRowData</td>
      <td>Gets the data of a row.</td>
    </tr>
    <tr>
      <td>getRows</td>
      <td>Gets all rows.</td>
    </tr>
    <tr>
      <td>getSelectedCellValue</td>
      <td>Gets the value of a cell of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowData</td>
      <td>Gets the data of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowIndex</td>
      <td>Gets the bound index of the selected row.</td>
    </tr>
    <tr>
      <td>getSelectedRowIndexes</td>
      <td>Gets the indexes of the selected rows.</td>
    </tr>
    <tr>
      <td>getSourceUrl</td>
      <td>Get URL of data source.</td>
    </tr>
    <tr>
      <td>hideColumn</td>
      <td>Hide column.</td>
    </tr>
    <tr>
      <td>on</td>
      <td>Register grid event listener.</td>
    </tr>
    <tr>
      <td>refresh</td>
      <td>Repaints the Grid View.</td>
    </tr>
    <tr>
      <td>showColumn</td>
      <td>Show column.</td>
    </tr>
    <tr>
      <td>updateBoundData</td>
      <td>Updates the bound data and refreshes the grid.</td>
    </tr>
    <tr>
      <td>updateCellValue</td>
      <td>Sets a new value to a cell.</td>
    </tr>
    <tr>
      <td>updateSelectedCellValue</td>
      <td>Sets a new value to a cell of the selected row.</td>
    </tr>
    <tr>
      <td>updateSourceUrl</td>
      <td>Update URL of data source and refresh Grid.</td>
    </tr>
  </tbody>
</table>

## Static Methods

<table>
  <thead>
    <tr>
      <th style="text-align: left;">Static Method</th>
      <th style="text-align: left;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>isNull</td>
      <td>Check input is <code>null</code>.</td>
    </tr>
    <tr>
      <td>isUndefined</td>
      <td>Check input is <code>undefined</code>.</td>
    </tr>
    <tr>
      <td>isEmptyString</td>
      <td>Check input is empty string.</td>
    </tr>
    <tr>
      <td>isUnset</td>
      <td>Check input is unset.</td>
    </tr>
    <tr>
      <td>transformStringToObject</td>
      <td>Transform String to Object.</td>
    </tr>
    <tr>
      <td>transformObjectToString</td>
      <td>Transform Object to String.</td>
    </tr>
    <tr>
      <td>getSearchParameters</td>
      <td>Get query string of an URL.</td>
    </tr>
    <tr>
      <td>insertQueryString</td>
      <td>Append query string to an URL.</td>
    </tr>
    <tr>
      <td>debounce</td>
      <td>Returns a Debounce function. <a href="https://remysharp.com/2010/07/21/throttling-function-calls">Reference</a></td>
    </tr>
    <tr>
      <td>throttle</td>
      <td>Returns a Throttle function. <a href="https://remysharp.com/2010/07/21/throttling-function-calls">Reference</a></td>
    </tr>
    <tr>
      <td>isValidKeyboardInput</td>
      <td>Check whether is a valid keyboard input.</td>
    </tr>
  </tbody>
</table>