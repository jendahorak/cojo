// type F = (x: number) => number;

// function compose(functions: F[]): F {
//   return function (x) {
//     for (let i = functions.length - 1; i >= 0; i--) {
//       x = functions[i](x);
//     }
//     return x;
//   };
// }

// /**
//  * const fn = compose([x => x + 1, x => 2 * x])
//  * fn(4) // 9
//  */

// const fn = compose([(x) => x + 1, (x) => 2 * x]);
// console.log(fn(4));

// type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

// function argumentsLength(...args: JSONValue[]): number {
//   return args.length;
// }

// /**
//  * ; // 3
//  */
// console.log(argumentsLength([1, 2, 3, 'prdel', { asdf: 'kas' }]));

// type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
// type OnceFn = (...args: JSONValue[]) => JSONValue | undefined;

// function once(fn: Function): OnceFn {
//   let ran = true;
//   return function (...args) {
//     if (ran) {
//       ran = false;
//       return fn(args);
//     } else {
//       return undefined;
//     }
//   };
// }

// /**
//  * let fn = (a,b,c) => (a + b + c)
//  * let onceFn = once(fn)
//  *
//  * onceFn(1,2,3); // 6
//  * onceFn(2,3,6); // returns undefined without calling fn
//  */

// let fn = (a, b, c) => a + b + c;
// let onceFn = once(fn);

// onceFn(1, 2, 3); // 6
// onceFn(2, 3, 6); // returns undefined without calling fn

// type Fn = (...params: number[]) => number;

// function memoize(fn: Fn): Fn {
//   // check if it has already been called and has computed and stored the results of given set of arguments
//   // if it finds a cache in form of a object returns it
//   const cacheRes = new Map();
//   console.log(cacheRes);
//   return function (...args) {
//     const key = JSON.stringify({ fn: fn.toString(), args });
//     console.log(cacheRes);
//     if (!cacheRes.has(key)) {
//       console.log(cacheRes);

//       cacheRes.set(key, fn(...args));
//     }
//     return cacheRes.get(key);
//   };
// }

// /**
//  * let callCount = 0;
//  * const memoizedFn = memoize(function (a, b) {
//  *	 callCount += 1;
//  *   return a + b;
//  * })
//  * memoizedFn(2, 3) // 5
//  * memoizedFn(2, 3) // 5
//  * console.log(callCount) // 1
//  */

// let callCount = 0;

// const memoizedFn = memoize(function (a, b) {
//   callCount += 1;
//   return a + b;
// });

// console.log(memoizedFn(2, 3)); // 5
// console.log(memoizedFn(2, 3)); // 5
// console.log(callCount); // 1

// type P = Promise<number>;

// async function addTwoPromises(promise1: P, promise2: P): P {
//   let p1 = await promise1;
//   let p2 = await promise2;

//   return p1 + p2;
// }

// addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4

// async function sleep(millis: number): Promise<void> {
//   await new Promise((resolve) => setTimeout(resolve, millis));
// }

// /**

//  */

// let t = Date.now();
// sleep(100).then(() => console.log(Date.now() - t)); // 100

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Fn = (...args: JSONValue[]) => void;

function cancellable(fn: Fn, args: JSONValue[], t: number): Function {
  console.log(fn);
  console.log(...args);

  return function test() {
    return 0;
  };
}

const result = [];

const fn = (x) => x * 5; // doing something
const args = [2],
  t = 20,
  cancelT = 50;

const start = performance.now();

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn(...argsArr) });
};

const cancel = cancellable(log, args, t);

const maxT = Math.max(t, cancelT);

setTimeout(() => {
  cancel();
}, cancelT);

setTimeout(() => {
  console.log(result); // [{"time":20,"returned":10}]
}, maxT + 15);
