import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { state: product } = useLocation(); 

  if (!product) {
    return <div className="text-center mt-10 text-xl">No product information available.</div>;
  }

  return (
    <>
    </>
  );
};

export default ProductDetails;
