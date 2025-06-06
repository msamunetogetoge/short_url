# Short URL Service
<!-- このリポジトリはDenoで実装されたURL短縮サービスの例です -->

Simple URL shortening service using Deno.

Initial setup using Deno following Clean Architecture principles.

Initial setup using Deno following Clean Architecture principles.

- `deno test` - run unit tests.

- `deno run --allow-net dev` - start the API server on port 8000 using Oak.

This project is intended to be run with Deno.

## Frontend

A simple React + MUI UI is provided under `frontend/`. It allows you to input a URL and receive a shortened one from the running API.

```
# install dependencies (once)
cd frontend && npm install

# start development server
npm run dev
```

The server proxy in Vite expects the API to be running on `http://localhost:8000`.
