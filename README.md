# yournexttrip-be

## How to run:

- Fork and clone in your account
- Create a ``.env`` file and give your own **MONGO_URL=<yourMongoDBConnectionString>** 
- `npm install`
- `nodemon src/index.ts`

## Available endpoints:

- `/api/v1/city` : All Cities
- `/api/v1/tour` : All Tour packages
- `/api/v1/tour?cityName=xyz` : All tour packages for city name = xyz
- `/api/v1/city/summary` : All Cities and Tours
- `/api-docs` : OpenAPI documentation (Swagger UI)