var Sorter = Class.extend(function()
{
	/**
	 * Properties
	 */

	this.instructions = null;

	this.constructor = function(instructions)
	{
		this.instructions = instructions;

		// prepare instructions
		$.each(this.instructions, function(key, value){
			value.flag = 0;
			if (value.direction === 'ASC') {
				value.flag = 1;
			}
			if (value.direction === 'DESC') {
				value.flag = -1;
			}
		});
	};


	/**
	 * Setters / getters
	 */

	this.operate = function(dataset)
	{
		return dataset.sort((this.sortPairCallback).bind(this));
	};

	this.sortPairCallback = function(item1, item2)
	{
		var result = 0;
		$.each(this.instructions, function(key, value) {
			if (item1[value.column] !== item2[value.column]) {
				result = item1[value.column] > item2[value.column] ? (value.flag * 1) : (value.flag * -1);
			}
		});
		return result;
	};
});
