// App root: renders the `Home` page. Keep minimal to avoid re-renders.
import Home from './pages/Home/Home'


function App() {
  

  return (
    <>
     <Home/>
    </>
  )
}

export default App
 

// Notes:
// - Main data and UI live in `pages/Home`.
// - Styling is provided via global SCSS in `src/styles` and component SCSS files.