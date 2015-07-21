var PivotTableRenderer = Renderer.extend(function()
{
	this.rows = null;
	this.cols = null;

	this.setRows = function(rows)
	{
		this.rows = rows;
		return this;
	}

	this.getRows = function()
	{
		return this.rows;
	}

	this.setCols = function(cols)
	{
		this.cols = cols;
		return this;
	}

	this.getCols = function()
	{
		return this.cols;
	}

	this.render = function()
	{

	}
});
