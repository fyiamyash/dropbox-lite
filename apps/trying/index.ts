import fs from "node:fs";
import { pipeline } from "node:stream";

// function myPromise(promises: Promise<any>[]) {
//   return new Promise((resolve, reject) => {
//     const result: any[] = [];
//     let completed = 0;

//     promises.forEach((item, index) => {
//       Promise.resolve(item)
//         .then((value) => {
//           result[index] = value;
//           console.log(value);
//           completed += 1;
//           if (completed === promises.length) {
//             resolve(result);
//             return;
//           }
//         })
//         .catch(reject);
//     });
//   });
// }

// // async function delayp(timeforp: number) {
// //   return new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //       resolve(timeforp);
// //     }, timeforp);
// //   });
// // }
// // let p1 = delayp(3000);
// // let p2 = delayp(2000);
// // let p = await myPromise([p1, p2]);

// // console.log(p);
