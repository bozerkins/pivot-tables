var TableRenderer = Renderer.extend(function()
{
	this.render = function()
	{
		// create table elements
		var containerEl = this.getContainer();
		var tableEl = $('<table>');
		var headerEl = $('<thead>');
		var bodyEl = $('<tbody>');
		// get model information
		var columns = this.getConnector().getModel().getColumns();
		var rows = this.getConnector().getModel().getDataset();
		// draw columns
		$.each(columns, function(key, value) {
			headerEl.append('<th>' + value + '</th>');
		});
		// draw raws
		$.each(rows, function(key, row) {
			var rowEl = $('<tr>');
			$.each(columns, function(colKey, colName) {
				rowEl.append($('<td>' + row[colName] + '</td>'));
			});
			bodyEl.append(rowEl);
		});

		// render into container
		containerEl.empty();
		containerEl.append(tableEl);
		tableEl.append(headerEl);
		tableEl.append(bodyEl);
		return this;
	};
});
