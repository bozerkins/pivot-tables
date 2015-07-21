$.ajaxSetup({async:false});
var dataset = null;
$.post('../dataset/mtcars.json', function(response) {
	dataset = response;
})
$.ajaxSetup({async:true});

var model = new Model();
model.setColumns(['_row','am','carb','cyl','disp','drat','gear','hp','mpg','qsec','vs','wt']);
model.setDataset(dataset);
// model.filter('_row', 'begins with', 'Merc').sort('disp', 'DESC');
// model.limit(5, 2);

var connector = new Connector();
connector.setModel(model.getModel());

var renderer = new PivotTableRenderer();
renderer.setConnector(connector);
renderer.setContainer($('div.container'));
// renderer.setRows(['_row', 'cyl', 'vs']);
renderer.setRows(['vs']);
// renderer.setCols(['gear', 'carb']);
renderer.setCols(['cyl']);
renderer.render();
// model.operation().column('carb').greaterThan(10).filter(model);
// model.filter('carb', 'greater than', 10);
//
// model.operation().column('carb').greaterThan(15).filter();
// model.operation().asc('carb').sort(model);
//
// model.operation('sort').desc('carb').asc('drat').do();
// model.operation('filter').column('disp').lessThan(10).do();
// model.get();
