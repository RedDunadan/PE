const [, , method, resource, ...args] = process.argv;

const BASE_URL = "https://fakestoreapi.com";

(async () => {
  try {
    if (!method || !resource) {
      console.log("❗Uso correcto:");
      console.log("npm run start GET products");
      console.log("npm run start GET products/<id>");
      console.log("npm run start POST products <title> <price> <category>");
      console.log("npm run start DELETE products/<id>");
      return;
    }