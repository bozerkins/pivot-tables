# pivot-tables

a simple javascript example of how to create pivot table

# usage example

the usage example can be seen in ./index.html

## 1) get your dataset into a variable

an example dataset can be seen in ./dataset/mps.json
though it's just a simple **array of json objects** (preferably of the same structure)
```json
[ 
    {"Province": "Quebec", "Party": "NDP", "Age": 22, "Name": "Liu, Laurin", "Gender": "Female"},
    {"Province": "Quebec", "Party": "Bloc Quebecois", "Age": 43, "Name": "Mourani, Maria", "Gender": "Female"}
]
```

## 2) create a model, which would contain the dataset
```javascript
var model = new Model(
    ['_row','am','carb','cyl','disp','drat','gear','hp','mpg','qsec','vs','wt'],
    dataset
);
```
a model should contain **columns list** as a first variable, and the **dataset** as a second

## 3) create a query, which would execute basic operations with the dataset (distinct, sort, filter)
```javascript
var query = new Query();
```
there is a ready example of a query, but you can craete your own with a simmilar interface

## 4) create a renderer
```javascript
var renderer = new PivotTableRenderer(
    $('.container'),
    query,
    model,
    ['Party', 'Gender Imbalance'],
    ['Age Bin', 'Gender']
);
```
last two arguments represent **rows** and **columns** to group by the data

## 5) render the pivot table with a custom aggregation function
```javascript
renderer.render(function(model) { return model.getDataset().length; });
```
and aggregation function gets model (representing a dataset of a given grouping) as first parameter

# TODO
- add custom events/classes for binding additional functionality to the table
- add promises for data manipulation within the renderer