import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Categories from './components/categories/categories';
import Products from './components/products/products';
import Users from './components/users/users';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Categories />
        <Products />
        <Users />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
