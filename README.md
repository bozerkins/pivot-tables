# Pivot Tables

Creating Pivot Tables in JavaScript

# Usage example

the usage example can be seen in ./index.html

## Define dataset

an example dataset can be seen in ./dataset/mps.json
though it's just a simple **array of json objects** (preferably of the same structure)
```json
[ 
    {"Province": "Quebec", "Party": "NDP", "Age": 22, "Name": "Liu, Laurin", "Gender": "Female"},
    {"Province": "Quebec", "Party": "Bloc Quebecois", "Age": 43, "Name": "Mourani, Maria", "Gender": "Female"}
]
```

## Transform Data to a Model
```javascript
var model = new Model(
    ['_row','am','carb','cyl','disp','drat','gear','hp','mpg','qsec','vs','wt'],
    dataset
);
```
a model should contain **columns list** as a first variable, and the **dataset** as a second

## Create a query object, that would be the interface for handling model data
```javascript
var query = new Query();
```
there is a ready example of a query, but you can craete your own with a simmilar interface

## Render everything
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

## Define custom aggregate functions
```javascript
renderer.render(function(model) { return model.getDataset().length; });
```
and aggregation function gets model (representing a dataset of a given grouping) as first parameter

# TODO
- add custom events/classes for binding additional functionality to the table
- add promises for data manipulation within the renderer
