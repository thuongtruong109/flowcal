import { envConf } from "./env.config";
import initSampleSeed from "./seed";
import mongoose from "mongoose";

function ConnectDB() {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.set("strictQuery", true);
  mongoose.connect(envConf.mongoUrl, options);

  initSampleSeed();
}

const connect = mongoose.connection;

connect.on("error", (err): void => {
  console.error.bind(console, "• MongoDB ::: connection error ");
  connect.close().catch(() => {
    console.log(
      `• MongoDB ::: failed to closed connection  ${JSON.stringify(err)}`
    );
  });
});

connect.on("open", (): void => {
  console.log("• Database connected");
});

connect.on("connected", (): void => {
  mongoose.set("debug", (col: string, method: string, query, doc) => {
    console.log(
      `• MongoDB ::: Query executed ${col} - ${method} - ${JSON.stringify(
        query
      )} - ${JSON.stringify(doc)})`
    );
  });
});

connect.on("disconnected", (err): void => {
  console.log(`• Database disconnected ${JSON.stringify(err)}`);
});

export default ConnectDB;
