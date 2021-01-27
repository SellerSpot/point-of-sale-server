import expresss from 'express';
import { logger } from 'utilities/logger';
import { CONFIG, configureDB, applyExpressMiddlewares } from './config/config';
import rootRouter from './router';
// globals
const app: expresss.Application = expresss();
const PORT: number = CONFIG.PORT;

// middlewares and configurations
configureDB();
applyExpressMiddlewares(app);

// router setup
app.use('/', rootRouter);

// listeners
app.listen(PORT, () => logger.express(`SellerSpot POS Server Started at the PORT ${PORT}`));
