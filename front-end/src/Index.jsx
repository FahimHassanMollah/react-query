import AddProduct from "./components/AddProduct"
import ProductDetails from "./components/ProductDetails"
import ProductList from "./components/ProductList"

const Index = () => {
  console.log('index rendering ............');
  return (
    <div className="flex m-2">
      <AddProduct/>
      <ProductList/>
      <ProductDetails />
    </div>
  )
}

export default Index