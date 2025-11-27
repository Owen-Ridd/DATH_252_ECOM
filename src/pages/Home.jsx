import { Navbar, Main, Product, Footer } from "../components";

function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <div id="products-section">
          <Product />
      </div>
      <Footer />
    </>
  )
}

export default Home