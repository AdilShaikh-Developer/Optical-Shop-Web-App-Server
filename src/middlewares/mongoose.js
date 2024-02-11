import mongoose from "mongoose";

export const mongooseConnection = (URI) => {
  mongoose
    .connect(URI, {
      dbName: "E-Commerce",
    })
    .then((e) =>
      console.log(`connected to ${e.connection.host} - E-Commerce collection`)
    )
    .catch((error) => console.log(error));
};
