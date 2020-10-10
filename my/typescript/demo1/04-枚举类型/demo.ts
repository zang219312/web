// Enum
function primaryGetServe(status: number) {
  if (status === 0) {
    return 'message';
  } else if (status === 1) {
    return 'SPA';
  } else if (status === 2) {
    return 'daBaoJia';
  }
}

const res = primaryGetServe(0);
console.log(`我要去${res}`);

interface Status {
  MESSAGE: number;
  SPA: number;
  DABAOJIAN: number;
}

const state: Status = {
  MESSAGE: 0,
  SPA: 1,
  DABAOJIAN: 2,
};

function middleGetSevers(status: number) {
  if (status === state.MESSAGE) {
    return 'message';
  } else if (status === state.SPA) {
    return 'SPA';
  } else if (status === state.DABAOJIAN) {
    return 'daBaoJian';
  }
}
const res2 = middleGetSevers(state.SPA);
console.log(`我要去${res2}`);

enum Form {
  MESSAGE = 1,
  SPA,
  DABAOJIAN,
}

function expertGetSevers(status: any) {
  if (status === Form.MESSAGE) {
    return 'massage';
  } else if (status === Form.SPA) {
    return 'spa';
  } else if (status === Form.DABAOJIAN) {
    return 'dabaojian';
  }
}

let res3 = expertGetSevers(Form.DABAOJIAN);
console.log(`我要去${res3}`);

// 知道下标后，也可以通过反查的方法，得到枚举的值。
console.log(Form.SPA, Form[1]); // 2  MESSAGE
