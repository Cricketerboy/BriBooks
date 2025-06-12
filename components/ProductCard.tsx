import React from 'react';
import Link from 'next/link';
import { Product } from '../types/Product';

const ProductCard = ({ product }: { product: Product }) => (
  <div className="card h-100">
    <img src={product.image} className="card-img-top p-3" alt={product.title} height={200} style={{ objectFit: 'contain' }} />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text">₹ {product.price}</p>
      <p className="text-muted">{product.category}</p>
      <p>⭐ {product.rating?.rate || 'N/A'}</p>
      <Link href={`/product/${product.id}`} className="btn btn-primary mt-auto">View Details</Link>
    </div>
  </div>
);

export default ProductCard;
