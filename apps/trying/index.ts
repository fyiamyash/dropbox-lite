import axios from "axios";
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

console.log("Downloading service trial:");

async function getFile() {
  const BufferForFile = Buffer.alloc(14);
  const resp = await axios.get(
    "http://localhost:9000/drop-box/upload/Asfasda9834298h/testq4.txt/chunk-a3ae0d8c6e2a2223e0c22db39a768d26?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=admin%2F20260807%2Fasia-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260807T083901Z&X-Amz-Expires=3600&X-Amz-Signature=5d9ef26d5abf85022b441eb1c4c02729108be0f885870bf0d87772c47f498e8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    { responseType: "arraybuffer" },
  );
  console.log(resp.data);
}
await getFile();
