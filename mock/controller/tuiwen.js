/* eslint-disable @typescript-eslint/no-require-imports */
const Mock = require('mockjs');

const { Random } = Mock;
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
const addTuiwen = [
  {
    url: `/resourcedata`,
    type: 'post',
    response: (config) => {
      const obj = config.query;
      obj.id = () => Random.integer(0, 100);
      obj.rl = [{ id: () => Random.integer(0, 100), typevalue: '推文' }];
      data.array.push(obj);
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
];
const deleteTuiwen = [
  {
    url: `/resourcedata`,
    type: 'post',
    response: (config) => {
      const obj = config.query;
      if (!obj.id) {
        return {
          code: -999,
          message: '参数不正确',
        };
      } else {
        data.array = data.array.filter((u) => u.id !== obj.id);
        return {
          code: 200,
          msg: 'success',
        };
      }
    },
  },
];
module.exports = { deleteTuiwen, addTuiwen };
