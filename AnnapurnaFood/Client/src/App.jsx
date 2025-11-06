import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import PagePagination from "./components/common/Pagination";
import SearchBar from "./components/common/Searchbar";

function App() {
  return (
    <>
    <Navbar/>
      <SearchBar />
      <PagePagination/>
      <Footer/>
    </>
  );
}

export default App;
