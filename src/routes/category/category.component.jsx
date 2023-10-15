import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/categories.selector';

import { CategoryContainer, CategoryTitle } from './category.styles';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
  
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading)
  const [ products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  
  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
        ) : (
        <CategoryContainer>
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </CategoryContainer>
      )}
    </>
  );
};

export default Category;