var Limiter = Class.extend(function()
{
	/**
	 * Properties
	 */
	this.instruction = null;

	this.constructor = function(instruction)
	{
		this.instruction = instruction;
	}
	/**
	 * Setters / getters
	 */

	this.getAmount = function()
	{
		if (!$.isNumeric(this.instruction.amount)) {
			throw "Invalid amount property passed to Instruction";
		}
		return this.instruction.amount;
	}

	this.getStart = function()
	{
		if (!$.isNumeric(this.instruction.start)) {
			throw "Invalid start property passed to Instruction";
		}
		return this.instruction.start;
	}

	this.operate = function(dataset)
	{
		return dataset.slice(this.getStart(), this.getAmount() + this.getStart());
	}
});
