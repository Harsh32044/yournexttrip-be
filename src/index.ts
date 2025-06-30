import express from 'express';
import rootRouter from './routes/index';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerDef';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1', rootRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => console.log(`Listening on ${port}`))