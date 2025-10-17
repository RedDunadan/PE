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


    switch (method.toUpperCase()) {
      case "GET":
        if (productId) {
          const res = await fetch(`${BASE_URL}/${endpoint}/${productId}`);
          const data = await res.json();
          console.log("📦 Producto encontrado:");
          console.log(data);
        } else {
          const res = await fetch(`${BASE_URL}/${endpoint}`);
          const data = await res.json();
          console.log("🛍️ Lista de productos:");
          data.forEach(({ id, title, price }) => {
            console.log(`#${id} - ${title} ($${price})`);
          });
        }
        break;

        case "POST":
        const [title, price, category] = args;
        if (!title || !price || !category) {
          console.error("❗Debes ingresar: <title> <price> <category>");
          return;
        }

        const newProduct = { title, price: parseFloat(price), category };

        const postRes = await fetch(`${BASE_URL}/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });

        const postData = await postRes.json();
        console.log("✅ Producto creado:");
        console.log(postData);
        break;

        case "DELETE":
        if (!productId) {
          console.error("❗Debes indicar un ID de producto para eliminar.");
          return;
        }

        const delRes = await fetch(`${BASE_URL}/${endpoint}/${productId}`, {
          method: "DELETE",
        });

        const delData = await delRes.json();
        console.log("🗑️ Producto eliminado:");
        console.log(delData);
        break;

      default:
        console.error("❗Método no soportado. Usa GET, POST o DELETE.");
    }
  } catch (error) {
    console.error("💥 Error:", error.message);
  }
})();