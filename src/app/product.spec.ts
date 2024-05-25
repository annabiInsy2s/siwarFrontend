import { Product } from './product';
import { ProductService } from './product.service';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new ProductService()).toBeTruthy();
  });
});
