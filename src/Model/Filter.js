var Filter = Class.extend(function()
{
	/**
	 * Properties
	 */

	this.instruction = null;
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

	this.constructor = function(instruction)
	{
		this.instruction = instruction;
	}

	/**
	 * Setters / getters
	 */

	this.getColumn = function()
	{
		if (!this.instruction.column) {
			throw "No column property passed to Instruction";
		}
		return this.instruction.column;
	}

	this.getOperation = function()
	{
		if (!this.instruction.operation) {
			throw "No operation property passed to Instruction";
		}

		if ($.inArray(this.instruction.operation, this.operations) === -1) {
			throw "Invalid operation requested in Instruction"
		}
		return this[this.instruction.operation.replace(/\s+/g, '_')];
	}

	this.getValue = function()
	{
		return this.instruction.value;
	}

	this.operate = function(dataset)
	{
		return $.grep(dataset, (this.getOperation()).bind(this));
	}

	/**
	 * Filter methods
	 */
	this.includes = function(item)
	{
		return $.inArray(item[this.getColumn()], this.getValue()) !== -1;
	}
	this.excludes = function(item)
	{
		return !this.includes(item);
	}
	this.greater_than = function(item)
	{
		return item[this.getColumn()] > this.getValue();
	}
	this.less_than = function(item)
	{
		return item[this.getColumn()] < this.getValue();
	}
	this.equals = function(item)
	{
		return item[this.getColumn()] === this.getValue();
	}
	this.not_equals = function(item)
	{
		return !this.equals(item)
	}
	this.between = function(item)
	{
		return item[this.getColumn()] < this.getValue()[0] && item[this.getColumn()] > this.getValue()[1];
	}
	this.not_between = function(item)
	{
		return !this.between(item);
	}
	this.begins_with = function(item)
	{
		return item[this.getColumn()].indexOf(this.getValue()) === 0;
	}
	this.not_begins_with = function(item)
	{
		return !this.begins_with(item);
	}
	this.ends_with = function(item)
	{
		return item[this.getColumn()].lastIndexOf(this.getValue()) === (item[this.getColumn()].length - this.getValue().length);
	}
	this.not_ends_with = function(item)
	{
		return !this.ends_with(item);
	}
	this.contains = function(item)
	{
		return item[this.getColumn()].indexOf(this.getValue()) !== -1;
	}
	this.not_contains = function(item)
	{
		return !this.contains(item);
	}
	this.exists = function(item)
	{
		return item[this.getColumn()] === null;
	}
	this.not_exists = function(item)
	{
		return !this.exists(item);
	}
});
