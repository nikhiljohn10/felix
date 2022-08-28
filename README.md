# Felix

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
