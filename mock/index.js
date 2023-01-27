/* eslint-disable @typescript-eslint/no-require-imports */
const Mock = require('mockjs');

const qs = require('qs');
const { param2Obj } = require('./utils.js');
const { getAuth, registerUser, deleteUser } = require('./controller/user.js');
const { getDepartmentData } = require('./controller/resourceData.js');
const { getAllCourse, addCourse } = require('./controller/course.js');
const { deleteTuiwen, addTuiwen } = require('./controller/tuiwen');

const mocks = [
  ...getAuth,
  ...registerUser,
  ...deleteUser,
  ...getDepartmentData,
  ...getAllCourse,
  ...addCourse,

  ...deleteTuiwen,
  ...addTuiwen,
];

function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    // eslint-disable-next-line prefer-rest-params
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        result = respond({
          method: type,
          body: qs.parse(body),
          query: param2Obj(url),
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
  }
}

module.exports = {
  mocks,
  mockXHR,
};
