// Compatibility shim for src/lib/articles-api.mjs, mcp-rpc.mjs and x402.mjs.
// Posts live as Markdown in content/posts/. This module re-exports the slim
// runtime corpus; do not add content here.
export { articles, articleMarkdown, articlePath, getArticle, allTopics } from '../lib/api-corpus.mjs';
