const keyword = 'app';

const results = data.filter(item => {
  return item.name.includes(keyword) || item.category.includes(keyword);
});

// 出力: [ { id: 1, name: 'Apple', category: 'Fruit' }, { id: 4, name: 'Avocado', category: 'Fruit' } ]