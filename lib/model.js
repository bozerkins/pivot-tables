var Model = (function(columns, dataset)
{
    this.getDataset = function()
    {
        return dataset;
    };

    this.getColumns = function()
    {
        return columns;
    };

    this.replicate = function()
    {
        return new Model(this.getColumns(), this.getDataset());
    };

    this.produce = function(_columns, _dataset)
    {
        return new Model(_columns, _dataset);
    };
});