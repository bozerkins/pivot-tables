var PivotTableRenderer = Renderer.extend(function()
{
	this.rows = [];
	this.cols = [];

	this.setRows = function(rows)
	{
		this.rows = rows;
		return this;
	};

	this.getRows = function()
	{
		return this.rows;
	};

	this.setCols = function(cols)
	{
		this.cols = cols;
		return this;
	};

	this.getCols = function()
	{
		return this.cols;
	};

	this.makeRowsWithValues = function()
	{
		var rows = [];
		$.each(this.getRows(), function(key, row){
			var info = {};
			info.name = row;
			info.vals = model.distinct(row).sort();
			rows.push(info);
		});
		return rows;
	};

	this.makeColsWithValues = function()
	{
		var cols = [];
		$.each(this.getCols(), function(key, col){
			var info = {};
			info.name = col;
			info.vals = model.distinct(col).sort();
			cols.push(info);
		});
		return cols;
	};

	this.makeResultGrid = function(model, cols, rows)
	{
		var colsReverse = cols.slice(0).reverse();
		var rowsReverse = rows.slice(0).reverse();
		var result = [{filters: [], model: model}];

		$.each([].concat(colsReverse).concat(rowsReverse), function(groupKey, group){
			var modelsCollector = [];

			$.each(group.vals, function(valKey, val){

				$.each(result, function(modelKey, modelVal){

					var filters = modelVal.filters.slice(0); // clone

					filters.unshift({
						column: group.name,
						value: val
					})
					modelsCollector.push({
						filters: filters,
						model: modelVal.model.filter(group.name, 'equals', val).getModel()
					});
				});
			});
			result = modelsCollector;
		});
		return result;
	};

	this.makeResultRows = function(model, rows)
	{
		var rowsReverse = rows.slice(0).reverse();
		var result = [{filters: [], model: model}];

		$.each([].concat(rowsReverse), function(groupKey, group){
			var modelsCollector = [];

			$.each(group.vals, function(valKey, val){

				$.each(result, function(modelKey, modelVal){

					var filters = modelVal.filters.slice(0); // clone

					filters.unshift({
						column: group.name,
						value: val
					})
					modelsCollector.push({
						filters: filters,
						model: modelVal.model.filter(group.name, 'equals', val).getModel()
					});
				});
			});
			result = modelsCollector;
		});
		return result;
	};

	this.makeResultCols = function(model, cols)
	{
		var colsReverse = cols.slice(0).reverse();
		var result = [{filters: [], model: model}];

		$.each([].concat(colsReverse), function(groupKey, group){
			var modelsCollector = [];

			$.each(group.vals, function(valKey, val){

				$.each(result, function(modelKey, modelVal){

					var filters = modelVal.filters.slice(0); // clone

					filters.unshift({
						column: group.name,
						value: val
					})
					modelsCollector.push({
						filters: filters,
						model: modelVal.model.filter(group.name, 'equals', val).getModel()
					});
				});
			});
			result = modelsCollector;
		});
		return result;
	};

	this.render = function(aggregator)
	{
		var model = this.getConnector().getModel();
		var cols = this.makeColsWithValues();
		var rows = this.makeRowsWithValues();

		var result = this.makeResultGrid(model, cols, rows)
		$.each(result, function(key, val){
			val.value = aggregator(val.model);
		});

		var resultRows = this.makeResultRows(model, rows);
		var resultCols = this.makeResultRows(model, cols);
		var resultTotal = model;

		var containerEl = this.getContainer();
		var tableEl = $('<table>');

		// build "cols depth" trs
		var colsRepeats = 1;
		$.each(cols, function(key){
			var col = cols[key];
			var next = cols[key + 1];

			var tr = $('<tr>');
			if (key === 0) {
				var td = $('<td>');
				td.attr('rowspan', cols.length);
				td.attr('colspan', rows.length);
				tr.append(td);
			}
			var td = $('<td>');
			td.text(col.name);
			tr.append(td);
			for(var i = 0; i < colsRepeats; i++) {
				$.each(col.vals, function(key, val){
					var td = $('<td>');
					if (next) {
						td.attr('colspan', next.vals.length);
					} else if (rows.length) {
						td.attr('rowspan', 2);
					}
					td.text(val);
					tr.append(td);
				});
			}

			if (key === 0) {
				var td = $('<td>');
				td.attr('rowspan', cols.length + 1);
				td.text('Totals');
				tr.append(td);
			}

			colsRepeats *= col.vals.length;

			tableEl.append(tr);
		});


		// build "(rows depth > 0 ? 1 : 0)" trs
		if (rows.length) {
			var tr = $('<tr>');

			$.each(rows, function(key){
				var row = rows[key];
				var td = $('<td>');
				td.text(row.name);
				tr.append(td);
			});

			if (cols.length) {
				tr.append($('<td>'));
			}

			tableEl.append(tr);
		}


		// build "rows" trs
		var rowsCardinality = rows.reduce(function(result, item){
			return item.vals.length * result;
		}, 1);
		var colsCardinality = cols.reduce(function(result, item){
			return item.vals.length * result;
		}, 1);

		if (rows.length) {
			for(var i = 0; i < rowsCardinality; i++) {
				var tr = $('<tr>');
				var rowValIndex = i;
				var rowsReverse = rows.slice(0).reverse()
				var backCardinality = 1;
				$.each(rowsReverse, function(key){
					var row = rowsReverse[key];
					var next = rowsReverse[key + 1];
					var td = $('<td>');
					if (rowValIndex % 1 === 0) {
						td.text(row.vals[rowValIndex % row.vals.length]);
						td.attr('rowspan', backCardinality);
						if (key === 0) {
							td.attr('colspan', 2);
						}
						tr.prepend(td);

						rowValIndex = rowValIndex / row.vals.length;
						backCardinality *= row.vals.length;
					} else {
						return true;
					}
				});

				for(var j = 0; j < colsCardinality; j++) {
					var td = $('<td>');
					var tdValue = result[i * colsCardinality + j].value;
					td.text(tdValue != 0 ? tdValue : '');
					tr.append(td);
				}

				var td = $('<td>');
				td.text(aggregator(resultRows[i].model));
				tr.append(td);

				tableEl.append(tr);
			}
		}
		// build "Totals row" trs
		var tr = $('<tr>');
		var td = $('<td>');
		td.attr('colspan', rows.length + 1);
		td.text('Totals');
		tr.append(td);
		tableEl.append(tr);

		var rowValueSum = 0;
		for(var i = 0; i < colsCardinality; i++) {
			var td = $('<td>');
			td.text(aggregator(resultCols[i].model));
			tr.append(td);
		}

		var td = $('<td>');
		td.text(aggregator(resultTotal));
		tr.append(td);

		containerEl.append(tableEl);
	};
});
