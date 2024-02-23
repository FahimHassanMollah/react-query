import Index from "./Index"
import { SelectedProductIdProvider } from "./providers"


const App = () => {
  console.log('app rendering ............');
  return (
    <SelectedProductIdProvider>
      <Index />
    </SelectedProductIdProvider>
  )
}

export default App