
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { selectedProductIdContext } from '../context';

const retriveProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}?_page=${queryKey[1]?.page}&_per_page=5`);
  return response.data;
}
const deleteProduct = async (id) => {
  const response = await axios.delete(`http://localhost:3000/products/${id}`);
  return response.data;

}

const ProductList = () => {
 
  const queryClient = useQueryClient();

  const { selectedProductId,setSelectedProductId } = useContext(selectedProductIdContext)
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, error, isLoading } = useQuery({
    queryKey: ['products', {
      page: currentPage,
    }],
    queryFn: retriveProducts,
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onMutate: (id) => {
      // console.log(id)
    },
    onError: (error, id, context) => {
      console.log(error)
    },
    onSuccess: (data, id, context) => {
    
      // setSelectedProductId(null);
   
      if (id === selectedProductId) {
        console.log('same product');
        setSelectedProductId(null);
      }
      queryClient.invalidateQueries({ queryKey: ['products',{
        page: 1,
      
      }]});
      setCurrentPage(1);
      // if (selectedProductIdContext !==  id && selectedProductIdContext !== null) {
      //   console.log('different product');
        
      //   setSelectedProductId(id);
        
      // }
    },
  });
  const handleDeleteProduct = (id) => {
    deleteMutation.mutate(id);
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>

  }
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center" >
        {products?.data && products?.data?.map(product => (
          <li
            key={product.id}
            className="flex flex-col items-center m-2 border rounded-sm"
          >
            <img
              className="object-cover h-64 w-96 rounded-sm"
              src={product.thumbnail}
              alt={product.title} />
            <p className="text-xl my-3">{product.title}</p>
            <button className='btn bg-lime-600 text-white px-2 py-1 rounded-md' onClick={() => {
            return  setSelectedProductId(product?.id)
            }}>view details</button>
            <br />
            <button className='mt-3 bg-red-600 text-white px-2 py-1 rounded-md' onClick={() => handleDeleteProduct(product?.id)}>delete</button>
            <button onClick={()=> {
      queryClient.invalidateQueries('products');

            }}>re fetch</button>
          </li>
        ))}
      </ul>
      {
        products?.prev && (
          <button
            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
            onClick={() => setCurrentPage(products.prev)} > Previous </button>
        )
      }
      {
        products?.next && (
          <button
            className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm'
            onClick={() => setCurrentPage(products.next)} > Next </button>
        )
      }

    </div>
  )
}

export default ProductList