import '../styles/App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

// import comportent 

import Main from './Main';
import Result from './Result';
import Quiz from './Quiz';

//routers

const router = createBrowserRouter([

{
  path:'/',
  element:<Main/>
},
{
  path:'/quiz',
  element:<Quiz/>
},
{
  path:'/result',
  element:<Result/>
}

])

function App() {
  return (
  <RouterProvider router={router}/>
  );
}

export default App;