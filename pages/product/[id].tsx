import { GetServerSideProps } from 'next';
import { Product } from '../../types/Product';

const ProductDetail = ({ product }: { product: Product }) => (
  <div className="container my-5">
    <div className="row">
      <div className="col-md-6 text-center">
        <img src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: '400px' }} />
      </div>
      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p className="text-muted">{product.category}</p>
        <h4 className="text-success">₹ {product.price}</h4>
        <p>{product.description}</p>
        <p>⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
      </div>
    </div>
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product = await res.json();
  return { props: { product } };
};

export default ProductDetail;
