// Enum
function getServe(status: number) {
  if (status === 0) {
    return 'message';
  } else if (status === 1) {
    return 'SPA';
  } else if (status === 2) {
    return 'daBaoJia';
  }
}

const res = getServe(0);
console.log(`我要去${res}`);

const Status: {
  message: number;
} = {
  message: 0,
};
