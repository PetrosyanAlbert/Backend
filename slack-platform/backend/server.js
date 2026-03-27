import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectMongo, connectRedis } from "./src/db/index.js";
import { initSocket } from "./src/modules/socket/index.js";

(async () => {
    await connectMongo();
    await connectRedis();
    
    const server = app.listen(env.PORT, () => {
        console.log(`Server running on ${env.BASE_URL}`);
    });

    initSocket(server);
})();
