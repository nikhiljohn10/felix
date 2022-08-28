# Felix

![node-current](https://img.shields.io/node/v/@hapi/hapi)
![Typescript](https://img.shields.io/badge/language-Typescript-blue)
![GitHub package.json version](https://img.shields.io/github/package-json/v/nikhiljohn10/felix)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/nikhiljohn10/felix)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nikhiljohn10/felix/Testing)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/9d1de4495abe44bfaa96ad16b6c4721a)](https://www.codacy.com/gh/nikhiljohn10/felix/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nikhiljohn10/felix&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/nikhiljohn10/felix/branch/main/graph/badge.svg?token=A7Y2JJZEET)](https://codecov.io/gh/nikhiljohn10/felix)
![MIT LICENSE](https://img.shields.io/github/license/nikhiljohn10/felix)

> Felix means happy in latin

A HapiJS server in typescript using Hapipal boilerplate.

## Development

```
git clone https://github.com/nikhiljohn10/felix.git
cd felix
npm install
cp .env-keep .env
npm run dev
```

Development server have debugging and auto-reload features.

Sever will be live at: [http://localhost:4000](http://localhost:4000)

To lint and fix:
```
npm run lint
```

To test the felix server:
```
npm test
```
Test report will be in `./coverage`.

To build the felix server:
```
npm run build
```
The build output will be in `./dist` directory.

To run the felix server:
```
npm start
```

## Production

For production server,
```
npm run prod
```

## TODO

 - Add [Prisma Client](https://www.prisma.io/)
 - Implement authentication
 - Implement typescript code generator
 - Optimise code and adopt all best practices
