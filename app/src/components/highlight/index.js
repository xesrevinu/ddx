import hljs from 'highlight.js/lib/highlight.js';
import 'highlight.js/styles/solarized_dark.css';

// register you languages
hljs.registerLanguage('markdown', require(`highlight.js/lib/languages/markdown`));
hljs.registerLanguage('javascript', require(`highlight.js/lib/languages/javascript`));
hljs.registerLanguage('js', require(`highlight.js/lib/languages/javascript`));
hljs.registerLanguage('css', require(`highlight.js/lib/languages/css`));

export default hljs;
