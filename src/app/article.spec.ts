import { Article } from './article';
import { ArticleService } from './article.service';


describe('Article', () => {
  it('should create an instance', () => {
    expect(new ArticleService()).toBeTruthy();
  });
});
