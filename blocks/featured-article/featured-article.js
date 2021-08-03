/* eslint-disable import/named, import/extensions */

import {
  getOptimizedImageURL,
  getBlogArticle,
} from '../../scripts/scripts.js';

async function decorateFeaturedArticle(featuredArticleEl, articlePath) {
  const article = await getBlogArticle(articlePath);
  const {
    title, description, image, category,
  } = article;

  const path = article.path.split('.')[0];

  const imagePath = image.split('?')[0].split('_')[1];
  const imageSrcDesktop = getOptimizedImageURL(`./media_${imagePath}?format=webply&optimize=medium&width=2000`);
  const imageSrcMobile = getOptimizedImageURL(`./media_${imagePath}?format=webply&optimize=medium&width=2000`);
  const pictureTag = `<picture>
    <source media="(max-width: 400px)" srcset="${imageSrcMobile}">
    <img src="${imageSrcDesktop}">
  </picture>`;
  const card = document.createElement('a');
  card.className = 'featured-article-card';
  card.href = path;
  card.innerHTML = `<div class="featured-article-card-image">
      ${pictureTag}
    </div>
    <div class="featured-article-card-body">
    <p class="featured-article-card-category">${category}</p>
    <h3>${title}</h3>
      <p>${description}</p>
    </div>`;
  featuredArticleEl.append(card);
}

export default function decorate(block) {
  const a = block.querySelector('a');
  block.innerHTML = '';
  if (a && a.href) {
    const path = new URL(a.href).pathname;
    decorateFeaturedArticle(block, path);
  }
}
