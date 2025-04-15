import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell laptop",
        image:
          "https://i.pcmag.com/imagery/roundups/04OtgLS2CSnpQsNfHODkh5S-43.fit_lim.size_1050x.jpg",
        price: 300,
        stock: 10,
      },
      {
        title: "Asus laptop",
        image:
          "https://content.ibuypower.com/Images/Components/27413/ASUS-FX5072ZM-ES94-400-01.png",
        price: 500,
        stock: 20,
      },
      {
        title: "Hp laptop",
        image:
          "https://www.shutterstock.com/image-photo/bangkok-thailand-hp-launch-new-260nw-2126914553.jpg",
        price: 550,
        stock: 8,
      },
    ];

    const existingProduct = await getAllProducts();

    if (existingProduct.length === 0) {
      productModel.insertMany(products);
    }
  } catch (err) {
    console.error("cannot see database", err);
  }
};
