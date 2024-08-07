"use strict";

const app = require("./src/app");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.info(`🚀 Server is listening on port http://localhost:${PORT}`);
});
