var Model = Class.extend(function()
{
	/**
	 * Properties
	 */

	this.columns = null;
	this.dataset = null;
	this.subset = null;

	/**
	 * Setters / getters
	 */

	this.setColumns = function(columns)
	{
		this.columns = columns;
		return this;
	}

	this.getColumns = function()
	{
		return this.columns
	}

	this.setDataset = function(dataset)
	{
		this.dataset = dataset;
		return this;
	}

	this.getDataset = function()
	{
		return this.dataset;
	}

	this.setSubset = function(subset)
	{
		this.subset = subset;
		return this;
	}

	this.getSubset = function()
	{
		if (!this.subset) {
			this.setSubset(this.getDataset());
		}
		return this.subset;
	}

	/**
	 * Subset interaction methods
	**/

	this.filter = function(column, operation, value)
	{
		var filter = new Filter({
			column: column,
			operation: operation,
			value: value
		});
		this.setSubset(filter.operate(this.getSubset()));
		return this;
	}

	this.sort = function(column, direction)
	{
		var sorter = new Sorter([{
			column: column,
			direction: direction
		}]);
		this.setSubset(sorter.operate(this.getSubset()));
		return this;
	}

	this.limit = function(amount, start)
	{
		var limiter = new Limiter({
			amount: amount,
			start: typeof start !== 'undefined' ? start : 0
		});
		this.setSubset(limiter.operate(this.getSubset()));
		return this;
	}

	/**
	 * Subset getters
	 */
	this.get = function()
	{
		var dataset = this.getSubset();
		this.setSubset(null);
		return dataset;
	}

	this.getModel = function()
	{
		var dataset = this.get();
		var model = new Model();
		model.setColumns(this.getColumns());
		model.setDataset(dataset);
		return model;
	}
});
