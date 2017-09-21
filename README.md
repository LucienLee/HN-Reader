# HN Reader

> A simple hacker news reader built with VueJS.

<p align="center">
  <a href="https://lucienlee.github.io/HN-Reader/" target="_blank">
    <img src="https://i.imgur.com/UYFssGo.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

## Build Setup

**Requires Node.js 6+**

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Feature

- Infinite scroll to read stories on hacker news
- Support offline usage (To test offline capability, you should test in production and cut off internet instead of browser throttling. The reason is [here](https://github.com/goldhand/sw-precache-webpack-plugin) and [here](https://bugs.chromium.org/p/chromium/issues/detail?id=423246).)
