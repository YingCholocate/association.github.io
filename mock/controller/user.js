/* eslint-disable @typescript-eslint/no-require-imports */
const Mock = require('mockjs');

const { Random } = Mock;
Random.string();
const allUserInfo = [
  {
    department: 2,
    username: 'admin',
    password: '234567',
    number: '32156789',
    role: [
      {
        id: 0,
        rolevalue: '数资部工作人员',
      },
    ],
  },
  {
    department: 2,
    username: 'people',
    password: '345',
    number: '35456',
    role: [
      {
        id: 0,
        rolevalue: '数资部工作人员',
      },
    ],
  },
  {
    department: 4,
    username: 'b',
    password: '464',
    number: '66667',
    role: [
      {
        id: 0,
        rolevalue: '技术部工作人员',
      },
    ],
  },
  {
    department: 3,
    username: 'a',
    password: '3456',
    number: '67890',
    role: [
      {
        id: 0,
        rolevalue: '秘书处工作人员',
      },
    ],
  },
  {
    department: 6,
    username: 'd',
    password: '64',
    number: '6888',
    role: [
      {
        id: 0,
        rolevalue: '主席',
      },
    ],
  },
  {
    department: 5,
    username: 'c',
    password: '46',
    number: '896667',
    role: [
      {
        id: 0,
        rolevalue: '研策部工作人员',
      },
    ],
  },
];
//  Mock.mock({
//   'array|6': [
//     {
//       username: () => Random.name(),
//       department: () => Random.integer(1, 6),
//       password: '@string("number", 5)',
//       number: '@string("number", 5)',
//       role: [
//         {
//           id: Random.integer(0, 10),
//           'roleValue|1': [
//             '数资部工作人员',
//             '技术部工作人员',
//             '秘书处工作人员',
//             '主席',
//             '研策部工作人员',
//           ],
//         },
//       ],
//     },
//   ],
// });
// console.log(oneData);
const getAuth = [
  {
    url: '/users',
    type: 'get',
    response: (config) => {
      const obj = config.query;

      if (obj.method === 'getone') {
        const oneData = allUserInfo.filter(
          (item) => item.number === obj.number && item.password === obj.password,
        );
        return {
          code: 200,
          msg: 'success',
          data: oneData[0],
          token: '@string(20)',
        };
      } else if (obj.method === 'getall') {
        return {
          code: 200,
          msg: 'success',
          data: allUserInfo,
        };
      }
    },
  },
];

const deleteUser = [
  {
    url: '/users',
    type: 'post',
    response: (config) => {
      const obj = config.query;
      if (!obj.number) {
        return {
          code: -999,
          message: '参数不正确',
        };
      } else {
        allUserInfo.array = allUserInfo.array.filter((u) => u.number !== obj.number);
        return {
          code: 200,
          msg: 'success',
        };
      }
    },
  },
];
const registerUser = [
  {
    url: '/users',
    type: 'post',
    response: (config) => {
      const obj = config.query;
      obj.id = Mock.Random.id();
      allUserInfo.array.unshift(obj);

      return {
        code: 20000,
        message: '添加成功',
      };
    },
  },
];

module.exports = { getAuth, registerUser, deleteUser };
