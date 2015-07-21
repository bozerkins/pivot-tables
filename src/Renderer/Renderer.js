var Renderer = Class.extend(function()
{
	this.connector = null;
	this.container = null;

	this.setConnector = function(connector)
	{
		this.connector = connector;
		return this;
	}

	this.getConnector = function()
	{
		return this.connector;
	}

	this.setContainer = function(container)
	{
		this.container = container;
		return this;
	}

	this.getContainer = function()
	{
		return this.container;
	}

	this.render = function()
	{
		throw "Abstract class";
	}
});
