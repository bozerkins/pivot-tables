var Connector = Class.extend(function()
{
	this.model = null;

	this.setModel = function(model)
	{
		this.model = model;
		return this;
	}

	this.getModel = function()
	{
		return this.model;
	}
});
