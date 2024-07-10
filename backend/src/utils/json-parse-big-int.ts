export const JSONParseBigInt = (data: any) => {
  const replacer = (_, value) =>
    typeof value === 'bigint' ? value.toString() : value;

  const reviver = (_, value) =>
    /(-?\d+)n/.test(value) ? BigInt(value.replace('n', '')) : value;

  const stringified = JSON.stringify(data, replacer);

  return JSON.parse(stringified, reviver);
};
