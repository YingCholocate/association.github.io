/* eslint-disable @typescript-eslint/no-require-imports */
const Mock = require('mockjs');

const { Random } = Mock;
Random.url();
Random.title();
Random.date();
const data = Mock.mock({
  'array|7': [
    {
      id: () => Random.integer(0, 100),
      uploadtime: () => Random.date(),
      link: () => Random.url(),
      title: () => Random.title(),
      type: 1,
      rl: [{ id: () => Random.integer(0, 100), typevalue: '推文' }],
    },
  ],
});
const data3 = Mock.mock({
  'array|4': [
    {
      'id|1-100': 9,
      link: '@url',
      rl: [{ 'id|1-100': 9, typevalue: '技术部资源' }],
      title: '@title',
      'type|1-100': 3,
      uploadtime: '@date',
    },
  ],
});
const data4 = Mock.mock({
  'array|4': [
    {
      'id|1-100': 9,
      link: '@url',
      rl: [{ 'id|1-100': 9, typevalue: '秘书处资源' }],
      title: '@title',
      'type|1-100': 3,
      uploadtime: '@date',
    },
  ],
});
const data5 = Mock.mock({
  'array|4': [
    {
      'id|1-100': 9,
      link: '@url',
      rl: [{ 'id|1-100': 9, typevalue: '研策部资源' }],
      title: '@title',
      'type|1-100': 3,
      uploadtime: '@date',
    },
  ],
});
const data2 = Mock.mock({
  'array|4': [
    {
      'id|1-100': 9,
      link: '@url',
      rl: [{ 'id|1-100': 9, typevalue: '数资部资源' }],
      title: '@title',
      'type|1-100': 3,
      uploadtime: '@date',
    },
  ],
});
const getDepartmentData = [
  {
    url: `/resourcedata`,
    type: 'get',
    response: (config) => {
      const obj = config.query;
      if (obj.type) {
        const type = parseInt(obj.type, 10);
        const newData = () => {
          if (type === 4) return data4.array;
          if (type === 3) return data3.array;
          if (type === 5) return data5.array;
          if (type === 2) return data2.array;
          return data4.array;
        };

        return {
          code: 200,
          msg: 'success',
          data: newData(),
        };
      } else if (obj.currentPage) {
        const newdata = data.array.slice(
          (parseInt(obj.currentPage, 10) - 1) * 3,
          (parseInt(obj.currentPage, 10) - 1) * 3 + 3,
        );

        return {
          code: 200,
          msg: 'success',
          data: newdata,
        };
      }
    },
  },
];
module.exports = { getDepartmentData };
