const PORT = process.env.PORT || 3333

import app from './ServerAppExpress';

app.listen(PORT, () => console.log(`🐱‍👤> Server is running! PORT -> ${PORT}`));
