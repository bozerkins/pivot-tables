var Query = (function()
{
    this.filter = function(model, column, operation, value)
    {
        var filter = new Filter({
            column: column,
            operation: operation,
            value: value
        });
        return model.produce(model.getColumns(), filter.operate(model.getDataset()));
    };

    this.sort = function(model, column, direction)
    {
        var sorter = new Sorter([{
            column: column,
            direction: direction
        }]);
        return model.produce(model.getColumns(), sorter.operate(model.getDataset()));
    };

    this.limit = function(model, amount, start)
    {
        var limiter = new Limiter({
            amount: amount,
            start: typeof start !== 'undefined' ? start : 0
        });
        return model.produce(model.getColumns(), limiter.operate(model.getDataset()));
    };

    this.distinct = function(model, column)
    {
        var dataset = model.getDataset();
        var distinct = [];
        $.each(dataset, function(key, value){
            if ($.inArray(value[column], distinct) === -1) {
                distinct.push(value[column]);
            }
        });
        return distinct;
    };


    this.pick = function(model, columns)
    {
        var picked = [];
        var dataset = model.getDataset();
        $.each(dataset, function(recordKey, record){
            var pickedRecord = {};
            $.each(columns, function(colKey, col){
                pickedRecord[col] = record[col];
            });
            picked.push(pickedRecord);
        });
        return picked;
    };
});

var Filter = (function(instruction)
{
    /**
     * Properties
     */

    this.operations = [
        // collection operations
        'includes',
        'excludes',
        // number operations
        'greater than',
        'less than',
        'equals',
        'not equals',
        'between',
        'not between',
        // string operations
        'begins with',
        'not begins with',
        'ends with',
        'not ends with',
        'contains',
        'not contains',
        // boolean operations
        'exists',
        'not exists'
    ];

    /**
     * Setters / getters
     */

    this.getColumn = function()
    {
        if (!instruction.column) {
            throw "No column property passed to Instruction";
        }
        return instruction.column;
    };

    this.getOperation = function()
    {
        if (!instruction.operation) {
            throw "No operation property passed to Instruction";
        }

        if ($.inArray(instruction.operation, this.operations) === -1) {
            throw "Invalid operation requested in Instruction"
        }
        return this[instruction.operation.replace(/\s+/g, '_')];
    };

    this.getValue = function()
    {
        return instruction.value;
    };

    this.operate = function(dataset)
    {
        return $.grep(dataset, (this.getOperation()).bind(this));
    };

    /**
     * Filter methods
     */
    this.includes = function(item)
    {
        return $.inArray(item[this.getColumn()], this.getValue()) !== -1;
    };
    this.excludes = function(item)
    {
        return !this.includes(item);
    };
    this.greater_than = function(item)
    {
        return item[this.getColumn()] > this.getValue();
    };
    this.less_than = function(item)
    {
        return item[this.getColumn()] < this.getValue();
    };
    this.equals = function(item)
    {
        return item[this.getColumn()] === this.getValue();
    };
    this.not_equals = function(item)
    {
        return !this.equals(item)
    };
    this.between = function(item)
    {
        return item[this.getColumn()] < this.getValue()[0] && item[this.getColumn()] > this.getValue()[1];
    };
    this.not_between = function(item)
    {
        return !this.between(item);
    };
    this.begins_with = function(item)
    {
        return item[this.getColumn()].indexOf(this.getValue()) === 0;
    };
    this.not_begins_with = function(item)
    {
        return !this.begins_with(item);
    };
    this.ends_with = function(item)
    {
        return item[this.getColumn()].lastIndexOf(this.getValue()) === (item[this.getColumn()].length - this.getValue().length);
    };
    this.not_ends_with = function(item)
    {
        return !this.ends_with(item);
    };
    this.contains = function(item)
    {
        return item[this.getColumn()].indexOf(this.getValue()) !== -1;
    };
    this.not_contains = function(item)
    {
        return !this.contains(item);
    };
    this.exists = function(item)
    {
        return item[this.getColumn()] === null;
    };
    this.not_exists = function(item)
    {
        return !this.exists(item);
    };
});
