import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';

interface Props {
  products: Product[];
}

const Home = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtered, setFiltered] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const result = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(result);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, products]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  return (
    <div className="container my-4" >
      <h1 className="text-center mb-4">Product Listing</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search products..."
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="row g-4">
          {currentProducts.map(product => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, idx) => (
            <li key={idx} className={`page-item ${idx + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>
                {idx + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return { props: { products } };
};

export default Home;
