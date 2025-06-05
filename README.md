# Short URL Service

Initial setup using Deno and Vitest following Clean Architecture principles.

## Scripts

- `npm test` - run unit tests with Vitest.

This project is intended to be run with Deno but uses Vitest for unit testing.

## Running tests with Deno

After installing dependencies using `npm install`, the test suite can be run
directly with the Deno CLI. The Node compatibility layer is required so pass the
`--compat` flag and allow read access for the `node_modules` directory:

```bash
deno test --compat --allow-read
```
