const stockLevels = {
  noStock: [],
  inStock: [
    {
      plannedDate: null,
      quantity: 2,
      inStock: true
    }
  ],
  stockComing: [
    {
      plannedDate: '2021-12-02T00:00:00',
      quantity: 12,
      inStock: false
    }
  ],
  stockComingTwo: [
    {
      plannedDate: '2021-12-02T00:00:00',
      quantity: 12,
      inStock: false
    },
    {
      plannedDate: '2022-01-05T00:00:00',
      quantity: 10,
      inStock: false
    }
  ],
  stockAndStockComing: [
    {
      plannedDate: null,
      quantity: 4,
      inStock: true
    },
    {
      plannedDate: '2021-12-02T00:00:00',
      quantity: 12,
      inStock: false
    }
  ]
};

export { stockLevels };
