import express from 'express';
import { flaschenpost, getMiddleware } from 'flaschenpost';

// Rest of the code remains same
const app = express();
const port = '8000';

const logger = flaschenpost.getLogger();

// Add Express middleware
app.use(getMiddleware({ logOn: 'request' }));

app.get('/', (request, response): any => {
  response.send('Express + TypeScript Server');
});

app.listen(port, (): void => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
