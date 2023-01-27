/* eslint-disable @typescript-eslint/no-require-imports */
const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const path = require('path');

const chalk = require('chalk');

const Mock = require('mockjs');

const mockDir = path.join(process.cwd(), 'mock');
/**
 *
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
  // console.log('11', 'mock');
  return {
    url: new RegExp(`/mock${url}.*`),
    type: type || 'get',
    response(req, res) {
      res.status(200);
      if (JSON.stringify(req.body) !== '{}') {
        // eslint-disable-next-line no-console
        console.log(chalk.green(`> 请求地址：${req.path}`));
        // eslint-disable-next-line no-console
        console.log(chalk.green(`> 请求参数：${JSON.stringify(req.body)}\n`));
      } else {
        // eslint-disable-next-line no-console
        console.log(chalk.green(`> 请求地址：${req.path}\n`));
      }
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
    },
  };
};
/**
 *
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
const registerRoutes = (app) => {
  let mockLastIndex;
  const { mocks } = require('./index');
  // console.log('mocks', mocks);
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
  // eslint-disable-next-line no-console
  console.log('mockForSerce', mocksForServer);

  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
};
// registerRoutes();
/**
 *
 * @param app
 */
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );

  const mockRoutes = registerRoutes(app);
  let { mockRoutesLength } = mockRoutes;
  let { mockStartIndex } = mockRoutes;

  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          Object.keys(require.cache).forEach((item) => {
            if (item.includes(mockDir)) {
              delete require.cache[require.resolve(item)];
            }
          });

          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(chalk.red(error));
        }
      }
    });
};
