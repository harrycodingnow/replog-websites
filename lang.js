// RepLog language switcher — persists choice across pages via localStorage.
(function () {
  var KEY = 'replog.lang';
  var SUPPORTED = ['en', 'zh'];

  function detectInitial() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (SUPPORTED.indexOf(saved) !== -1) return saved;
    return 'en';
  }

  function apply(lang) {
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hant' : 'en');
    var btns = document.querySelectorAll('[data-lang-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = lang === 'en' ? '中文' : 'EN';
      btns[i].setAttribute('aria-label',
        lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
    }
  }

  function set(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply(lang);
  }

  function init() {
    var current = detectInitial();
    apply(current);
    var btns = document.querySelectorAll('[data-lang-toggle]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        e.preventDefault();
        var now = document.body.getAttribute('data-lang') || 'en';
        set(now === 'en' ? 'zh' : 'en');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
