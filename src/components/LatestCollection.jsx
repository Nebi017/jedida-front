import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  console.log("Latest Products:", latestProducts);

  return (
    <div>
      <div className="my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[6vw] ">
        <div className="text-center py-8 text-3xl">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Elegant and authentic Habesha dresses crafted with premium cotton
            and intricate Tibeb embroidery. Perfect for cultural celebrations,
            weddings, and everyday elegance
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4">
          {latestProducts.length > 0 &&
            latestProducts.map((item, index) =>
              item ? ( // ✅ Ensure item exists
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ) : null
            )}
        </div>
        {/* Line image from left to right of the screen */}
      </div>
    </div>
  );
}

export default LatestCollection;
