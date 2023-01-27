// 表格数据
// 摊位数据
export const TANWEIData = [
  { time: '8:00-10:00', content: '', person: '', notice: '', key: 0 },
  { time: '10:00-12:00', content: '', person: '', notice: '', key: 1 },
  { time: '12:00-14:00', content: '', person: '', notice: '', key: 2 },
  { time: '14:00-16:00', content: '', person: '', notice: '', key: 3 },
  { time: '16:00-17:40', content: '', person: '', notice: '', key: 4 },
  { time: '17:40-18:00', content: '', person: '', notice: '', key: 5 },
];

// 摊位列数据
export const TANWEICOLData = [
  {
    id: 'time',
    title: '时间',
    type: 'input',
    dataIndex: '时间',
    key: '时间',
  },
  {
    id: 'content',
    title: '内容',
    type: 'input',
    dataIndex: '内容',
    key: '时间',
  },
  {
    id: 'person',
    title: '人员',
    type: 'select',
    dataIndex: '人员',
    key: '人员',
  },
  {
    id: 'notice',
    title: '注意事项',
    type: 'input',
    dataIndex: '注意事项',
    key: '注意事项',
  },
];

// 初始普通活动数据
export const NORMALACTData = [
  { group: '技术组', notice: '调试现场设备，调试摄像设备', principal: '', member: '', key: 0 },
  { group: '物资组', notice: '清点物资', principal: '', member: '', key: 1 },
  {
    group: '控场组',
    notice: '维持活动现场秩序（入场、活动过程中及出场）',
    principal: '',
    member: '',
    key: 2,
  },
  { group: '工作人员签到组', notice: '负责工作人员签到', principal: '', member: '', key: 3 },
  { group: '活动报名负责组', notice: 'Python训练营的报名', principal: '', member: '', key: 4 },
  { group: '布场、清场组', notice: '布置、清理场地', principal: '', member: '', key: 5 },
];

// 初始普通活动列数据
export const NORMALACTCOLData = [
  {
    id: 'group',
    title: '组别',
    type: 'input',
    dataIndex: '组别',
    key: '组别',
  },
  {
    id: 'notice',
    title: '事项',
    type: 'input',
    dataIndex: '事项',
    key: '事项',
  },
  {
    id: 'principal',
    title: '负责人',
    dataIndex: '负责人',
    key: '负责人',
    type: 'select',
  },
  {
    id: 'member',
    title: '成员',
    dataIndex: '成员',
    key: '成员',
    type: 'select',
  },
];

// 静态的用户信息
export const USERSTATICInfo = [
  ['admin数资部工作人员', '32156789'],
  ['people数资部工作人员', '35456'],
  ['b技术部工作人员', '66667'],
  ['a秘书处工作人员', '67890'],
  ['d主席', '6888'],
  ['c研策部工作人员', '896667'],
];
export interface IColumns {
  title: string;
  dataIndex: string;
}
export interface IData {
  key: string;
  name: string;
  C1?: string;
  C2?: string;
  C3?: string;
  C4?: string;
  C5?: string;
  C6?: string;
  C7?: string;
}
export const initialData = [
  {
    key: '1',
    name: '1',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '2',
    name: '2',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '3',
    name: '3',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '4',
    name: '4',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '5',
    name: '5',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '6',
    name: '6',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '7',
    name: '7',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '8',
    name: '8',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '9',
    name: '9',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '10',
    name: '10',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '11',
    name: '11',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
  {
    key: '12',
    name: '12',
    C1: '',
    C2: '',
    C3: '',
    C4: '',
    C5: '',
    C6: '',
    C7: '',
  },
];
interface Icd {
  id: number;
  zc: string;
  kcmc: number;
  jcdm: string;
  jcdm2: string;
  jxcdmc?: string;
  xq: number;
  courseid: number;
  cou: [{ bgcolor: string; cid: number; cname: string; courseid: number }];
}
export interface ICourse {
  id: number;
  stuid: string;
  courseid: number;
  cd: Icd[];
}
export const courcearr: ICourse[] = [
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '7,8',
        kcmc: 8,
        jcdm: '0304',
        jcdm2: '03,04',
        xq: 1,
        courseid: 1,
        cou: [{ bgcolor: '#FF6699', cid: 0, cname: '形势与政策', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '11,14',
        kcmc: 7,
        jcdm: '0304',
        jcdm2: '03,04',
        jxcdmc: '教109',
        xq: 1,
        courseid: 1,
        cou: [{ bgcolor: '#CC0066', cid: 0, cname: '大学生就业创业指导', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '1,12',
        kcmc: 1,
        jcdm: '0304',
        jcdm2: '06,07',
        jxcdmc: '教109',
        xq: 1,
        courseid: 1,
        cou: [{ bgcolor: 'pink', cid: 0, cname: '大数据存储及应用', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '1,12',
        kcmc: 4,
        jcdm: '0304',
        jcdm2: '03,04',
        jxcdmc: '教109',
        xq: 3,
        courseid: 1,
        cou: [{ bgcolor: '#FF0099', cid: 0, cname: '大数据可视化', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '1,16',
        kcmc: 2,
        jcdm: '0304',
        jcdm2: '01,02',
        jxcdmc: '教109',
        xq: 4,
        courseid: 1,
        cou: [{ bgcolor: 'yellow', cid: 0, cname: '互联网金融大数据分析', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '4,19',
        kcmc: 6,
        jcdm: '0304',
        jcdm2: '03,04',
        jxcdmc: '教109',
        xq: 4,
        courseid: 1,
        cou: [{ bgcolor: 'orange', cid: 0, cname: '决策理论与方法', courseid: 1 }],
      },
    ],
  },
  {
    id: 0,
    stuid: '32156789',
    courseid: 1,
    cd: [
      {
        id: 0,
        zc: '1,12',
        kcmc: 3,
        jcdm: '0304',
        jcdm2: '03,04',
        jxcdmc: '教109',
        xq: 5,
        courseid: 1,
        cou: [{ bgcolor: '#FF3333', cid: 0, cname: '人工智能基础', courseid: 1 }],
      },
    ],
  },
];

// 课程初始及结束日期
export const STARTANDEND: string[] = ['2023,01, 16', '2023 ,07, 19'];
