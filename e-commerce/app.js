require("dotenv").config({ quiet: true });
const express = require("express");
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/products", require("./routes/product.routes"));
app.use("/orders", require("./routes/order.routes"));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});