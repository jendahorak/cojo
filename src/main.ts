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

type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function argumentsLength(...args: JSONValue[]): number {
  return args.length;
}

/**
 * ; // 3
 */
console.log(argumentsLength([1, 2, 3, 'prdel', { asdf: 'kas' }]));
