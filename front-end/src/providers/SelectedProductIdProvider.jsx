import { useState } from 'react'
import { selectedProductIdContext } from '../context'

const SelectedProductIdProvider = ({children}) => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    console.log(selectedProductId, "selectedProductId from the provider ............");

    return (
        <selectedProductIdContext.Provider value={{selectedProductId,setSelectedProductId}}>
            {children}
        </selectedProductIdContext.Provider>
    )
}

export default SelectedProductIdProvider