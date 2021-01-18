import expresss from 'express';
import { logger } from 'utilities/logger';
import { CONFIG, configureDB, applyExpressMiddlewares, setCurrentDB } from './config';
import rootRouter from './router';
// globals
const app: expresss.Application = expresss();
const PORT: number = CONFIG.PORT;

// middlewares and configurations
configureDB();
applyExpressMiddlewares(app);

// set current db for every request (for tenant db isolation)
app.use(setCurrentDB);

// router setup
app.use('/', rootRouter);

// listeners
app.listen(PORT, () => logger('express', `SellerSpot POS Server Started at the PORT ${PORT}`));
