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
    const [endpoint, productId] = resource.split("/");
     // Rutas según método
    switch (method.toUpperCase()) {
      case "GET":
        if (productId) {
          // Obtener producto por ID
          const res = await fetch(`${BASE_URL}/${endpoint}/${productId}`);
          const data = await res.json();
          console.log("📦 Producto encontrado:");
          console.log(data);
        } else {
          // Obtener todos los productos
          const res = await fetch(`${BASE_URL}/${endpoint}`);
          const data = await res.json();
          console.log("🛍️ Lista de productos:");
          data.forEach(({ id, title, price }) => {
            console.log(`#${id} - ${title} ($${price})`);
          });
        }
        break;
  }