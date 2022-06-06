# EXPRESS TYPESCRIPT API < Backend Test >

## Requirements of the test

The api will have in total 3 endpoints:

1. First endpoint will return this data (https://api.jsonbin.io/b/5f69afbe65b18913fc510ce8). It also allows query params to filter by ‘country’ or ‘code’ and order by ‘vat’ the results. You should validate query params: filter (string), order (string and only[asc, desc]).
2. Second endpoint will return the string you sent (by url param) but reversed with all vowels in uppercase.
3. Third endpoint will add to the start and/or to the end of the array the string you provide in the query.
   Validate: start (string), end (string)

Create environment variables: NODE_ENV, SIMPLE_ARRAY. SIMPLE_ARRAY env variable will have the array that you will use to append the query params of the third endpoint.

Examples:

1. First endpoint
   - Request: /countries?filter=and&order=asc
   - Response: All the countries that have ‘and’ in the country or code. And in ascending order by vat
2. Second endpoint
   - Request: /reverse/hello
   - Response: OllEh
3. Third endpoint
   - Request: /append?start=hello&end=bye
   - Response: [hello, SIMPLE_ARRAY, bye]

Mandatory:

- Typescript
- Unit tests

Optional:

- Dockerfile
- Docker compose

## Downloading

```
git clone <repository URL>
```

## Installing NPM modules

```
npm install
```

## Building application

```
npm run build
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

```
npm test
```

## Development

### Running in development mode

```
npm run dev
```

### Auto-fix and format

```
npm run lint
```

## Docker

### Running from Dockerfile

From the app directory run:

```
docker build . -t <image name>
docker run -dp 3000:3000 <image name>
```

### Running from dockercompose.yml

From the app directory run:

```
docker-compose build
docker-compose up
```

## Documentation

---

## API endpoints:

### Rest Endpoint:

`http://localhost:3000`

## **Get Countries**

Returns json data with filtered and / or ordered countries. Without queries returns all countries.

| URL          | Method | Params | Query                                      | Success response | Error response |
| ------------ | ------ | ------ | ------------------------------------------ | ---------------- | -------------- |
| `/countries` | GET    | None   | `filter=[string], order=['asc' or 'desc']` | Status 200       | Status 422     |

## **Get Reversed String**

Returns json data with the string sent by url param but reversed with all vowels in uppercase.

| URL             | Method | Params         | Query | Success response | Error response |
| --------------- | ------ | -------------- | ----- | ---------------- | -------------- |
| `/reverse/:str` | GET    | `str=[string]` | None  | Status 200       | Status 404     |

## **Get Modified Array**

Returns json data with an array with added to the start and/or to the end of it the string you provide in the query.

| URL       | Method | Params | Query                          | Success response | Error response |
| --------- | ------ | ------ | ------------------------------ | ---------------- | -------------- |
| `/append` | GET    | None   | `start=[string], end=[string]` | Status 200       | Status 422     |
