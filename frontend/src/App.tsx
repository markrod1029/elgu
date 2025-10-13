import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { FormProvider } from '@/context/FormContext';

function App() {
  return (
    <FormProvider>
      <RouterProvider router={router} />
    </FormProvider>
  );
}

export default App;