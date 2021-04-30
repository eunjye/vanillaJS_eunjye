'use strict';

const { default: axios } = require("axios");

// import "@babel/polyfill"; // Promise, Object.assign, Array.from ...
// import { pi, power, Foo } from './lib';

// // console.log(pi);
// // console.log(power(pi, pi));

// // const f = new Foo();
// // console.log(f.foo());
// // console.log(f.bar());

// // console.log(new Promise((resolve, reject) => {
// //   setTimeout(() => resolve(1), 100);
// // }));

// // console.log(Object.assign({}, { x: 1 }, { y: 2}));

// // console.log(Array.from([1, 2, 3], v => v + v));

// console.log('sss')


const aaa = () => {
  console.log('!!!');
  let div = document.createElement("div")
  let p = document.createElement("p")
  div.append(p);
}


document.addEventListener('DOMContentLoaded', () => {
  aaa();

  axios.get('http://localhost:3000/').then((res) => {
    console.log(`${res} !!!`);
  }).catch((err) => {
    console.log(err);
  })
})