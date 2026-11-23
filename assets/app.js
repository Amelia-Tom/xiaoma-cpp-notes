/* ==========================================================================
   C++ 笔记 · 少儿编程入门
   单页应用：首页 dashboard、章节目录、阅读路由、进度、测验、复制
   ========================================================================== */

(function () {
  'use strict';

  const COURSE = window.COURSE || [];
  const KEYS = {
    theme: 'cppnotes.theme',
    completed: 'cppnotes.completed',
    last: 'cppnotes.last'
  };
  const LEVEL_LABEL = { 1: '入门', 2: '基础', 3: '挑战' };
  const MOBILE_QUERY = '(max-width: 980px)';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const html = {
    shell: $('#shell'),
    sidebar: $('#sidebar'),
    chapterList: $('#chapterList'),
    searchInput: $('#searchInput'),
    reader: $('#reader'),
    main: $('#main'),
    scrim: $('#scrim'),
    sidebarCount: $('.sidebar-count'),
    progressText: $('#progressText'),
    progressFill: $('#progressFill'),
    appearanceSeg: $('#appearanceSeg'),
    toast: $('#toast'),
    themeMeta: $('meta[name="theme-color"]'),
    railToggle: $('#railToggle'),
    menuBtn: $('#menuBtn'),
    sidebarClose: $('#sidebarClose'),
    printBtn: $('#printBtn'),
    headerSearch: $('#headerSearch'),
    themeBtn: $('#themeBtn'),
    navLinks: $$('.nav-link')
  };

  const state = {
    view: 'home',
    current: 0,
    query: '',
    themeMode: 'dark',
    completed: new Set()
  };

  const totalMinutes = COURSE.reduce(function (sum, chapter) {
    return sum + (Number(chapter.minutes) || 0);
  }, 0);
  const totalCode = COURSE.reduce(function (sum, chapter) {
    return sum + chapter.blocks.filter(function (block) {
      return block.type === 'code';
    }).length;
  }, 0);
  const totalQuiz = COURSE.reduce(function (sum, chapter) {
    return sum + chapter.blocks.filter(function (block) {
      return block.type === 'quiz';
    }).length;
  }, 0);

  /* ------------------------------------------------------------------ icons */

  const ICONS = {
    check:
      '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.4"/><path d="m6.4 10.2 2.4 2.4 4.8-5"/></svg>',
    checkPlain:
      '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.4"/><path d="m6.4 10.2 2.4 2.4 4.8-5"/></svg>',
    checkSmall:
      '<svg viewBox="0 0 20 20" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m5 10.3 3 3 7-7"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4"/></svg>',
    spark:
      '<svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="m10 2 1.7 5.7 5.8 1.8-5.8 1.8L10 17l-1.7-5.7L2.5 9.5l5.8-1.8z"/></svg>',
    bulb:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5a6 6 0 0 0-12 0c0 1.3.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></svg>',
    alert:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.2 1.8 17a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
    info:
      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5"/></svg>',
    target:
      '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
    copy:
      '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  };

  /* --------------------------------------------------------------- utilities */

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatText(value) {
    return String(value == null ? '' : value).replace(
      /<code>/g,
      '<code class="inline-code">'
    );
  }

  function stripTags(value) {
    return String(value == null ? '' : value).replace(/<[^>]+>/g, ' ');
  }

  const TYPE_WORDS =
    /^(int|double|char|bool|string|void|float|long|short|unsigned|const|auto|size_t)$/;
  const KEY_WORDS =
    /^(if|else|for|while|do|return|using|namespace|true|false|break|continue|switch|case|default|struct|class|new|delete|static)$/;

  const TOKEN_RE = new RegExp(
    [
      '\\/\\/[^\\n]*',
      '"(?:\\\\.|[^"\\\\])*"',
      "'(?:\\\\.|[^'\\\\])*'",
      '\\b\\d+(?:\\.\\d+)?\\b',
      '[ \\t]*#[A-Za-z]+[^\\n]*',
      '\\b(?:int|double|char|bool|string|void|float|long|short|unsigned|const|auto|size_t)\\b',
      '\\b(?:if|else|for|while|do|return|using|namespace|true|false|break|continue|switch|case|default|struct|class|new|delete|static)\\b',
      '\\b[A-Za-z_]\\w*(?=\\s*\\()'
    ].join('|'),
    'g'
  );

  function highlightLine(line) {
    const source = escapeHtml(line);
    let result = '';
    let last = 0;
    let match;

    TOKEN_RE.lastIndex = 0;
    while ((match = TOKEN_RE.exec(source)) !== null) {
      result += source.slice(last, match.index);
      const token = match[0];
      let cls = 'plain';

      if (token.slice(0, 2) === '//') cls = 'comment';
      else if (token[0] === '"' || token[0] === "'") cls = 'string';
      else if (/^\d/.test(token)) cls = 'number';
      else if (/^[ \t]*#/.test(token)) cls = 'preproc';
      else if (TYPE_WORDS.test(token)) cls = 'type';
      else if (KEY_WORDS.test(token)) cls = 'keyword';
      else if (/^\w/.test(token)) cls = 'function';

      result +=
        cls === 'plain'
          ? token
          : '<span class="tok-' + cls + '">' + token + '</span>';
      last = TOKEN_RE.lastIndex;
    }

    result += source.slice(last);
    return result;
  }

  function codeLines(code) {
    return String(code)
      .split('\n')
      .map(function (line, index) {
        return (
          '<div class="code-line"><span class="ln">' +
          (index + 1) +
          '</span><span class="lc">' +
          (highlightLine(line) || '&nbsp;') +
          '</span></div>'
        );
      })
      .join('');
  }

  function miniCode(code) {
    return (
      '<pre class="mini-code">' +
      String(code)
        .split('\n')
        .map(function (line) {
          return (
            '<div class="code-line"><span class="lc">' +
            (highlightLine(line) || '&nbsp;') +
            '</span></div>'
          );
        })
        .join('') +
      '</pre>'
    );
  }

  function stars(level) {
    let out = '';
    for (let i = 0; i < 3; i += 1) {
      out += '<span class="' + (i < level ? 'on' : '') + '">★</span>';
    }
    return out;
  }

  /* ---------------------------------------------------------------- storage */

  function safeGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* 隐私模式或 file:// 限制时静默降级 */
    }
  }

  function loadState() {
    const saved = safeGet(KEYS.completed, '[]');
    const valid = new Set(COURSE.map(function (chapter) {
      return chapter.slug;
    }));
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        parsed.forEach(function (slug) {
          if (valid.has(slug)) state.completed.add(slug);
        });
      }
    } catch (error) {
      /* 忽略损坏的旧数据 */
    }

    const savedTheme = safeGet(KEYS.theme, 'dark');
    if (['auto', 'light', 'dark'].includes(savedTheme)) {
      state.themeMode = savedTheme;
    }
  }

  function saveCompleted() {
    safeSet(KEYS.completed, JSON.stringify(Array.from(state.completed)));
  }

  function completedCount() {
    return state.completed.size;
  }

  /* ------------------------------------------------------------------ theme */

  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function resolvedTheme() {
    if (state.themeMode === 'auto') {
      return systemDark.matches ? 'dark' : 'light';
    }
    return state.themeMode;
  }

  function applyTheme() {
    const mode = resolvedTheme();
    document.documentElement.dataset.theme = mode;
    if (html.themeMeta) {
      html.themeMeta.setAttribute('content', mode === 'dark' ? '#141617' : '#f3f6f5');
    }
    if (html.themeBtn) {
      const label = mode === 'dark' ? '当前深色，切换到浅色' : '当前浅色，切换到深色';
      html.themeBtn.title = label;
      html.themeBtn.setAttribute('aria-label', label);
    }
  }

  function syncThemeControl() {
    if (!html.appearanceSeg) return;
    $$('button', html.appearanceSeg).forEach(function (button) {
      button.setAttribute(
        'aria-checked',
        String(button.dataset.mode === state.themeMode)
      );
    });
  }

  function setThemeMode(mode) {
    if (!['auto', 'light', 'dark'].includes(mode)) return;
    state.themeMode = mode;
    safeSet(KEYS.theme, mode);
    applyTheme();
    syncThemeControl();
  }

  function toggleTheme() {
    setThemeMode(resolvedTheme() === 'dark' ? 'light' : 'dark');
  }

  systemDark.addEventListener('change', function () {
    if (state.themeMode === 'auto') applyTheme();
  });

  /* --------------------------------------------------------------- sidebar */

  const searchIndex = COURSE.map(function (chapter) {
    const parts = [chapter.title, chapter.subtitle].concat(
      chapter.keywords || [],
      chapter.goals || []
    );
    chapter.blocks.forEach(function (block) {
      ['text', 'title', 'question', 'task', 'hint', 'answer', 'explain'].forEach(
        function (key) {
          if (typeof block[key] === 'string') parts.push(block[key]);
        }
      );
      if (Array.isArray(block.items)) parts.push(block.items.join(' '));
      if (Array.isArray(block.options)) parts.push(block.options.join(' '));
      if (Array.isArray(block.headers)) parts.push(block.headers.join(' '));
      if (Array.isArray(block.rows)) {
        block.rows.forEach(function (row) {
          parts.push(row.join(' '));
        });
      }
      if (typeof block.code === 'string') parts.push(block.code);
    });
    return stripTags(parts.join(' ')).toLowerCase();
  });

  function chapterMatches(index, query) {
    if (!query) return true;
    return searchIndex[index].includes(query);
  }

  function renderSidebar(options) {
    const opts = options || {};
    const query = state.query.trim().toLowerCase();
    const matches = COURSE.map(function (chapter, index) {
      return chapterMatches(index, query) ? index : -1;
    }).filter(function (index) {
      return index >= 0;
    });

    if (matches.length === 0) {
      html.chapterList.innerHTML =
        '<div class="nav-empty">没有找到相关章节<br>试试「循环」「数组」或「函数」</div>';
    } else {
      html.chapterList.innerHTML = matches
        .map(function (index) {
          const chapter = COURSE[index];
          const active = state.view === 'chapter' && index === state.current;
          const done = state.completed.has(chapter.slug);
          return (
            '<a class="chap' +
            (active ? ' is-active' : '') +
            (done ? ' is-done' : '') +
            '" href="#/' +
            chapter.slug +
            '" data-index="' +
            index +
            '"' +
            (active ? ' aria-current="page"' : '') +
            '>' +
            '<span class="chap-num">' +
            escapeHtml(chapter.num) +
            '</span>' +
            '<span class="chap-labels">' +
            '<span class="chap-title">' +
            escapeHtml(chapter.title) +
            '</span>' +
            '<span class="chap-sub">' +
            escapeHtml(chapter.subtitle) +
            '</span>' +
            '</span>' +
            '<span class="chap-check" aria-label="已完成">' +
            ICONS.checkSmall +
            '</span>' +
            '</a>'
          );
        })
        .join('');
    }

    if (html.sidebarCount) {
      html.sidebarCount.textContent = query
        ? matches.length + ' / ' + COURSE.length
        : COURSE.length + ' 章';
    }

    if (opts.scrollActive) scrollActiveIntoView();
  }

  function scrollActiveIntoView() {
    const active = $('.chap.is-active', html.chapterList);
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  function setActiveNav(index) {
    $$('.chap', html.chapterList).forEach(function (link) {
      const active = index >= 0 && Number(link.dataset.index) === index;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    syncTopNav();
    if (index >= 0) scrollActiveIntoView();
  }

  function syncTopNav() {
    html.navLinks.forEach(function (link) {
      const isHomeLink = !link.dataset.homeSection;
      link.classList.toggle(
        'is-active',
        state.view === 'home' && isHomeLink
      );
    });
  }

  /* --------------------------------------------------------------- progress */

  function firstIncompleteIndex() {
    for (let i = 0; i < COURSE.length; i += 1) {
      if (!state.completed.has(COURSE[i].slug)) return i;
    }
    return -1;
  }

  function currentContinueIndex() {
    const lastSlug = safeGet(KEYS.last, '');
    const index = COURSE.findIndex(function (chapter) {
      return chapter.slug === lastSlug;
    });
    return index >= 0 ? index : 0;
  }

  function syncProgressUI() {
    const total = COURSE.length;
    const count = completedCount();
    const percent = total ? Math.round((count / total) * 100) : 0;

    if (html.progressText) html.progressText.textContent = count + ' / ' + total;
    if (html.progressFill) html.progressFill.style.width = percent + '%';

    const homeValue = $('#homeProgressValue');
    if (homeValue) {
      homeValue.innerHTML =
        count + '<span>/ ' + total + '</span>';
      homeValue.setAttribute('aria-label', count + ' / ' + total + ' 章已完成');
    }
    const homeFill = $('#homeProgressFill');
    if (homeFill) homeFill.style.width = percent + '%';
    const homeStamp = $('#homeProgressStamp');
    if (homeStamp) homeStamp.textContent = percent + '%';

    const nextTitle = $('#homeNextTitle');
    if (nextTitle) {
      const nextIndex = firstIncompleteIndex();
      nextTitle.textContent =
        nextIndex < 0
          ? '全部完成 · 随时回来复习'
          : '第 ' + COURSE[nextIndex].num + ' 章 · ' + COURSE[nextIndex].title;
    }

    syncHomeCards();
    syncHomeContinue();
    syncRouteCard();
  }

  function syncHomeCards() {
    $$('.course-card', html.reader).forEach(function (card) {
      const index = Number(card.dataset.chapter);
      const chapter = COURSE[index];
      if (!chapter) return;
      const done = state.completed.has(chapter.slug);
      card.classList.toggle('is-done', done);
      const stateEl = $('.card-state', card);
      if (stateEl) stateEl.textContent = done ? '已完成' : '开始学习';
      if (done) card.setAttribute('aria-label', chapter.title + '，已完成');
      else card.setAttribute('aria-label', chapter.title);
    });
  }

  function syncHomeContinue() {
    const link = $('#homeContinue');
    if (!link) return;
    const index = currentContinueIndex();
    const chapter = COURSE[index];
    if (!chapter) return;
    const started = completedCount() > 0 || safeGet(KEYS.last, '') !== '';
    link.href = '#/' + chapter.slug;
    const label = $('.btn-label', link);
    const sub = $('.btn-sub', link);
    if (label) label.textContent = started ? '继续学习' : '开始学习';
    if (sub) {
      sub.textContent =
        '第 ' + chapter.num + ' 章 · ' + chapter.title + ' · ' + chapter.minutes + ' 分钟';
    }
  }

  function syncRouteCard() {
    const lines = $$('.route-line');
    if (!lines.length) return;
    const firstOpen = firstIncompleteIndex();
    lines.forEach(function (line) {
      const start = Number(line.dataset.start);
      const end = Number(line.dataset.end);
      let allDone = true;
      for (let i = start; i <= end; i += 1) {
        if (!state.completed.has(COURSE[i].slug)) {
          allDone = false;
          break;
        }
      }
      line.classList.toggle('is-done', allDone);
      line.classList.toggle(
        'is-now',
        !allDone && firstOpen >= start && firstOpen <= end
      );
    });
  }

  function updateFinishControl(chapter) {
    const button = $('#finishBtn');
    if (!button || !chapter) return;
    const done = state.completed.has(chapter.slug);
    button.classList.toggle('is-done', done);
    button.setAttribute('aria-pressed', String(done));
    button.innerHTML =
      ICONS.checkPlain +
      '<span>' +
      (done ? '已完成本章' : '标记本章已学完') +
      '</span>';
    const finish = button.closest('.finish');
    if (finish) {
      const title = $('.finish-copy h3', finish);
      const copy = $('.finish-copy p', finish);
      if (title) title.textContent = done ? '本章已完成' : '学会了吗？';
      if (copy) {
        copy.textContent = done
          ? '进度已保存在这台设备上。'
          : '标记完成后，学习进度会自动保存在这台设备上。';
      }
    }
  }

  function syncCompletion() {
    $$('.chap', html.chapterList).forEach(function (link) {
      const index = Number(link.dataset.index);
      if (!COURSE[index]) return;
      link.classList.toggle('is-done', state.completed.has(COURSE[index].slug));
    });
    syncProgressUI();
    if (state.view === 'chapter') updateFinishControl(COURSE[state.current]);
  }

  /* ---------------------------------------------------------------- content */

  function renderCallout(block) {
    const kind = block.type;
    const icon =
      kind === 'warn' ? ICONS.alert : kind === 'note' ? ICONS.info : ICONS.bulb;
    const label =
      kind === 'warn' ? '注意' : kind === 'note' ? '小知识' : '小提示';
    return (
      '<div class="callout is-' +
      kind +
      '">' +
      '<span class="callout-icon">' +
      icon +
      '</span>' +
      '<div class="callout-body">' +
      '<p class="callout-title">' +
      escapeHtml(block.title || label) +
      '</p>' +
      '<div class="callout-text">' +
      formatText(block.text) +
      '</div>' +
      '</div></div>'
    );
  }

  function renderQuiz(block, index) {
    const letters = 'ABCDEFGH';
    return (
      '<section class="quiz" data-answer="' +
      Number(block.answer) +
      '">' +
      '<div class="quiz-head">' +
      '<span class="quiz-badge">随堂小测</span>' +
      '<span class="quiz-index">Q' +
      (index + 1) +
      '</span>' +
      '</div>' +
      '<p class="quiz-q">' +
      formatText(block.question) +
      '</p>' +
      '<div class="quiz-options">' +
      block.options
        .map(function (option, optionIndex) {
          return (
            '<button type="button" class="quiz-option" data-index="' +
            optionIndex +
            '" aria-pressed="false">' +
            '<span class="opt-key">' +
            (letters[optionIndex] || optionIndex + 1) +
            '</span>' +
            '<span>' +
            formatText(option) +
            '</span>' +
            '</button>'
          );
        })
        .join('') +
      '</div>' +
      '<div class="quiz-foot">' +
      '<button type="button" class="quiz-check">检查答案</button>' +
      '<span class="quiz-status" aria-live="polite"></span>' +
      '</div>' +
      '<div class="quiz-explain" hidden>' +
      formatText(block.explain) +
      '</div>' +
      '</section>'
    );
  }

  function renderExercise(block) {
    let details = '';

    if (block.hint) {
      details +=
        '<details class="ex-details">' +
        '<summary>看提示</summary>' +
        '<div class="ex-details-body">' +
        formatText(block.hint) +
        '</div></details>';
    }

    if (block.answer || block.answerCode) {
      details +=
        '<details class="ex-details">' +
        '<summary>看参考答案</summary>' +
        '<div class="ex-details-body">' +
        (block.answer ? '<div>' + formatText(block.answer) + '</div>' : '') +
        (block.answerCode ? miniCode(block.answerCode) : '') +
        '</div></details>';
    }

    return (
      '<section class="exercise">' +
      '<div class="ex-badge">' +
      ICONS.target +
      '动手练一练</div>' +
      '<h3 class="ex-title">' +
      formatText(block.title) +
      '</h3>' +
      '<p class="ex-task">' +
      formatText(block.task) +
      '</p>' +
      details +
      '</section>'
    );
  }

  function renderCode(block) {
    const encoded = encodeURIComponent(block.code);
    const isFullProgram =
      /#include\s*</.test(block.code) && /\bint\s+main\s*\(/.test(block.code);
    const langLabel = isFullProgram ? 'C++' : '片段';
    return (
      '<div class="code-card">' +
      '<div class="code-head">' +
      '<span class="code-dots" aria-hidden="true"><span class="d1"></span><span class="d2"></span><span class="d3"></span></span>' +
      '<div class="code-id">' +
      '<span class="code-file">' +
      escapeHtml(block.file || 'main.cpp') +
      '</span>' +
      '<span class="code-lang' +
      (isFullProgram ? '' : ' is-snippet') +
      '" title="' +
      (isFullProgram ? '完整程序，可直接编译运行' : '代码片段，需要放进完整程序里运行') +
      '">' +
      langLabel +
      '</span>' +
      '</div>' +
      '<button type="button" class="copy-btn" data-code="' +
      encoded +
      '" aria-label="复制代码">' +
      ICONS.copy +
      '<span>复制</span>' +
      '</button>' +
      '</div>' +
      '<pre class="code-body">' +
      codeLines(block.code) +
      '</pre>' +
      (block.output
        ? '<div class="code-output">' +
          '<span class="code-output-label">运行结果</span>' +
          '<span class="code-output-text">' +
          escapeHtml(block.output) +
          '</span>' +
          '</div>'
        : '') +
      '</div>'
    );
  }

  function renderBlock(block) {
    switch (block.type) {
      case 'h2':
        return '<h2 class="block-h2">' + formatText(block.text) + '</h2>';
      case 'p':
        return '<p class="block-p">' + formatText(block.text) + '</p>';
      case 'list':
        return (
          '<ul class="block-list' +
          (block.ordered ? ' is-ordered' : '') +
          '">' +
          block.items
            .map(function (item) {
              return (
                '<li>' +
                (block.ordered ? '' : '<span class="li-marker"></span>') +
                '<span>' +
                formatText(item) +
                '</span></li>'
              );
            })
            .join('') +
          '</ul>'
        );
      case 'table':
        return (
          '<div class="table-wrap"><table class="data-table"><thead><tr>' +
          block.headers
            .map(function (header) {
              return '<th>' + formatText(header) + '</th>';
            })
            .join('') +
          '</tr></thead><tbody>' +
          block.rows
            .map(function (row) {
              return (
                '<tr>' +
                row
                  .map(function (cell) {
                    return '<td>' + formatText(cell) + '</td>';
                  })
                  .join('') +
                '</tr>'
              );
            })
            .join('') +
          '</tbody></table></div>'
        );
      case 'code':
        return renderCode(block);
      case 'tip':
      case 'warn':
      case 'note':
        return renderCallout(block);
      case 'takeaways':
        return (
          '<section class="takeaways">' +
          '<h3 class="takeaways-head">' +
          ICONS.spark +
          '本章要点</h3>' +
          '<ul>' +
          block.items
            .map(function (item) {
              return '<li>' + ICONS.check + '<span>' + formatText(item) + '</span></li>';
            })
            .join('') +
          '</ul></section>'
        );
      default:
        return '';
    }
  }

  function renderFinish(chapter) {
    const done = state.completed.has(chapter.slug);
    return (
      '<div class="finish">' +
      '<div class="finish-copy">' +
      '<h3>' +
      (done ? '本章已完成' : '学会了吗？') +
      '</h3>' +
      '<p>' +
      (done
        ? '进度已保存在这台设备上。'
        : '标记完成后，学习进度会自动保存在这台设备上。') +
      '</p></div>' +
      '<button type="button" class="finish-btn' +
      (done ? ' is-done' : '') +
      '" id="finishBtn" aria-pressed="' +
      done +
      '">' +
      ICONS.checkPlain +
      '<span>' +
      (done ? '已完成本章' : '标记本章已学完') +
      '</span></button>' +
      '</div>'
    );
  }

  function renderPager(index) {
    const prev = index > 0 ? COURSE[index - 1] : null;
    const next = index < COURSE.length - 1 ? COURSE[index + 1] : null;
    const prevMarkup = prev
      ? '<a class="pager-link prev" href="#/' +
        prev.slug +
        '" data-nav="' +
        (index - 1) +
        '"><span class="pager-dir">← 上一章</span><span class="pager-title">' +
        escapeHtml(prev.title) +
        '</span></a>'
      : '<span class="pager-spacer"></span>';
    const nextMarkup = next
      ? '<a class="pager-link next" href="#/' +
        next.slug +
        '" data-nav="' +
        (index + 1) +
        '"><span class="pager-dir">下一章 →</span><span class="pager-title">' +
        escapeHtml(next.title) +
        '</span></a>'
      : '<span class="pager-spacer"></span>';

    return '<nav class="pager" aria-label="章节翻页">' + prevMarkup + nextMarkup + '</nav>';
  }

  /* ------------------------------------------------------------------ home */

  function courseCard(chapter, index) {
    const done = state.completed.has(chapter.slug);
    return (
      '<a class="course-card' +
      (done ? ' is-done' : '') +
      '" href="#/' +
      chapter.slug +
      '" data-chapter="' +
      index +
      '" aria-label="' +
      escapeHtml(chapter.title) +
      '">' +
      '<div class="card-top">' +
      '<span class="card-num">' +
      escapeHtml(chapter.num) +
      '</span>' +
      '<span class="card-meta">' +
      chapter.minutes +
      ' 分钟 · ' +
      (LEVEL_LABEL[chapter.level] || '入门') +
      '</span>' +
      '</div>' +
      '<h3 class="card-title">' +
      formatText(chapter.title) +
      '</h3>' +
      '<p class="card-desc">' +
      escapeHtml(chapter.subtitle) +
      '</p>' +
      '<div class="card-foot">' +
      '<span class="card-tag">' +
      (LEVEL_LABEL[chapter.level] || '入门') +
      '</span>' +
      '<span class="card-state">' +
      (done ? '已完成' : '开始学习') +
      '</span>' +
      '<span class="card-arrow" aria-hidden="true">→</span>' +
      '</div>' +
      '</a>'
    );
  }

  function routeLineClass(start, end, firstOpen) {
    let allDone = true;
    for (let i = start; i <= end; i += 1) {
      if (!state.completed.has(COURSE[i].slug)) {
        allDone = false;
        break;
      }
    }
    if (allDone) return ' is-done';
    if (firstOpen >= start && firstOpen <= end) return ' is-now';
    return '';
  }

  function renderHome(options) {
    const opts = options || {};
    state.view = 'home';
    const continueIndex = currentContinueIndex();
    const continueChapter = COURSE[continueIndex];
    const firstOpen = firstIncompleteIndex();
    const homeNext =
      firstOpen < 0
        ? '全部完成 · 随时回来复习'
        : '第 ' + COURSE[firstOpen].num + ' 章 · ' + COURSE[firstOpen].title;

    const first = COURSE[0];
    const started = completedCount() > 0 || safeGet(KEYS.last, '') !== '';

    const cards = COURSE.map(courseCard).join('');

    html.reader.innerHTML =
      '<section class="home' +
      (opts.animate === false ? '' : ' chapter-enter') +
      '">' +
      '<div class="home-hero">' +
      '<div class="hero-main">' +
      '<div class="home-kicker"><span class="dot"></span>C++ FOR BEGINNERS · 10 CHAPTERS</div>' +
      '<h1 class="wordmark" aria-label="C++"><span>C</span><span class="wm-plus">++</span></h1>' +
      '<p class="hero-lead">把复杂的编程，<br>拆成孩子能懂的小步骤。</p>' +
      '<p class="hero-copy">从第一行 Hello, World 到能自己写一个小游戏。十篇短课，每篇都配示例、随堂测验和动手练习；零基础也能一页一页读下去。</p>' +
      '<div class="hero-actions">' +
      '<a class="action-btn is-primary" id="homeContinue" href="#/' +
      continueChapter.slug +
      '">' +
      '<span class="btn-copy"><span class="btn-label">' +
      (started ? '继续学习' : '开始学习') +
      '</span><span class="btn-sub">第 ' +
      continueChapter.num +
      ' 章 · ' +
      escapeHtml(continueChapter.title) +
      ' · ' +
      continueChapter.minutes +
      ' 分钟</span></span>' +
      '<span class="btn-arrow" aria-hidden="true">→</span></a>' +
      '<a class="action-btn" href="#/' +
      first.slug +
      '">' +
      '<span class="btn-copy"><span class="btn-label">从头开始</span><span class="btn-sub">' +
      escapeHtml(first.title) +
      ' · ' +
      first.minutes +
      ' 分钟</span></span>' +
      '<span class="btn-arrow" aria-hidden="true">↗</span></a>' +
      '</div>' +
      '<div class="hero-facts">' +
      '<span class="fact"><span class="fact-value">' + COURSE.length + '</span><span class="fact-label">CHAPTERS · 章</span></span>' +
      '<span class="fact"><span class="fact-value">' + totalCode + '</span><span class="fact-label">CODE · 段代码</span></span>' +
      '<span class="fact"><span class="fact-value">' + totalQuiz + '</span><span class="fact-label">QUIZ · 道测验</span></span>' +
      '<span class="fact"><span class="fact-value">' + totalMinutes + '</span><span class="fact-label">MINUTES · 分钟</span></span>' +
      '</div>' +
      '</div>' +
      '<aside class="hero-side">' +
      '<div class="hero-card progress-panel" id="progress">' +
      '<div class="hero-card-head"><span class="mini-label">YOUR PROGRESS</span><span class="progress-stamp" id="homeProgressStamp">0%</span></div>' +
      '<div class="progress-value" id="homeProgressValue" aria-label="0 / 10 章已完成">0<span>/ ' + COURSE.length + '</span></div>' +
      '<p class="progress-note">每一章都可以单独阅读；标记完成后，下次回来会停在最近读到的地方。</p>' +
      '<div class="progress-track"><div class="progress-fill" id="homeProgressFill"></div></div>' +
      '<div class="progress-next"><span class="next-label">接下来</span><span class="next-title" id="homeNextTitle">' +
      homeNext +
      '</span></div>' +
      '</div>' +
      '<div class="hero-card route-panel">' +
      '<div class="route-head"><span class="route-title">学习路线</span><span class="mini-label">4 STAGES</span></div>' +
      '<div class="route-list">' +
      '<div class="route-line' + routeLineClass(0, 2, firstOpen) + '" data-start="0" data-end="2"><span class="route-dot"></span><span>语法起步</span><span class="route-arrow">01</span></div>' +
      '<div class="route-line' + routeLineClass(3, 5, firstOpen) + '" data-start="3" data-end="5"><span class="route-dot"></span><span>控制流程</span><span class="route-arrow">02</span></div>' +
      '<div class="route-line' + routeLineClass(6, 7, firstOpen) + '" data-start="6" data-end="7"><span class="route-dot"></span><span>数据容器</span><span class="route-arrow">03</span></div>' +
      '<div class="route-line' + routeLineClass(8, 9, firstOpen) + '" data-start="8" data-end="9"><span class="route-dot"></span><span>函数与实战</span><span class="route-arrow">04</span></div>' +
      '</div>' +
      '</div>' +
      '</aside>' +
      '</div>' +
      '<section class="home-section" id="catalog">' +
      '<div class="section-head"><div><span class="section-kicker">01 / COURSE</span><h2 class="section-title">课程目录</h2></div><span class="section-meta">' + COURSE.length + ' CHAPTERS · 从零到小游戏</span></div>' +
      '<div class="course-grid">' + cards + '</div>' +
      '</section>' +
      '<section class="home-section">' +
      '<div class="method-card">' +
      '<div class="method-copy">' +
      '<span class="section-kicker">HOW TO USE</span>' +
      '<h2>看一遍，敲一遍，<br>再自己改一遍。</h2>' +
      '<p>这是一份可以慢慢读的笔记。遇到不懂的代码，先猜一猜它在做什么，再运行看看——错了也没关系。</p>' +
      '</div>' +
      '<div class="method-steps">' +
      '<div class="method-step"><span class="step-num">01</span><span class="step-name">读懂示例</span><p class="step-desc">先看代码和运行结果，理解这一小段在做什么。</p></div>' +
      '<div class="method-step"><span class="step-num">02</span><span class="step-name">自己敲一遍</span><p class="step-desc">把示例抄进编辑器，改一个数字或一句话，再运行。</p></div>' +
      '<div class="method-step"><span class="step-num">03</span><span class="step-name">做随堂小测</span><p class="step-desc">每章都有小测，答错会看到解释，不用怕选错。</p></div>' +
      '<div class="method-step"><span class="step-num">04</span><span class="step-name">标记完成</span><p class="step-desc">读完后标记本章，进度会自动保存在这台设备上。</p></div>' +
      '</div>' +
      '</div>' +
      '</section>' +
      '</section>';

    document.title = 'C++ 笔记 · 少儿编程入门';
    setActiveNav(-1);
    syncProgressUI();
    if (opts.scrollSection) scrollToSection(opts.scrollSection);
    else if (opts.animate === false) window.scrollTo(0, 0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --------------------------------------------------------------- chapter */

  function renderChapter(index, options) {
    const chapter = COURSE[index];
    if (!chapter) return;
    const opts = options || {};

    state.view = 'chapter';
    state.current = index;
    let quizIndex = 0;

    const blocks = chapter.blocks
      .map(function (block) {
        if (block.type === 'quiz') {
          const markup = renderQuiz(block, quizIndex);
          quizIndex += 1;
          return markup;
        }
        return renderBlock(block);
      })
      .join('\n');

    const exampleCount = chapter.blocks.filter(function (block) {
      return block.type === 'code';
    }).length;

    html.reader.innerHTML =
      '<article class="chapter' +
      (opts.animate === false ? '' : ' chapter-enter') +
      '" data-index="' +
      index +
      '">' +
      '<div class="chapter-top">' +
      '<button type="button" class="back-link" data-home>← 全部课程</button>' +
      '<span class="chapter-position">CH ' + escapeHtml(chapter.num) + ' / ' + COURSE.length + '</span>' +
      '</div>' +
      '<header class="hero">' +
      '<div class="hero-main">' +
      '<div class="chapter-kicker"><span>CHAPTER ' + escapeHtml(chapter.num) + '</span><span class="slash">/</span><span>' + (LEVEL_LABEL[chapter.level] || '入门') + '</span></div>' +
      '<h1>' +
      formatText(chapter.title) +
      '</h1>' +
      '<p class="hero-sub">' +
      formatText(chapter.subtitle) +
      '</p>' +
      '<div class="hero-meta">' +
      '<span class="meta-chip">' +
      ICONS.clock +
      chapter.minutes +
      ' 分钟</span>' +
      '<span class="meta-chip">难度 <span class="stars">' +
      stars(chapter.level) +
      '</span></span>' +
      (exampleCount
        ? '<span class="meta-chip">' + ICONS.code + exampleCount + ' 个示例</span>'
        : '') +
      '</div>' +
      '</div>' +
      '<aside class="goals">' +
      '<div class="goals-head">' +
      ICONS.spark +
      '本章你将学会</div>' +
      '<ul>' +
      chapter.goals
        .map(function (goal) {
          return '<li>' + ICONS.check + '<span>' + formatText(goal) + '</span></li>';
        })
        .join('') +
      '</ul></aside>' +
      '</header>' +
      '<div class="chapter-body">' +
      blocks +
      renderFinish(chapter) +
      '</div>' +
      renderPager(index) +
      '<p class="reader-foot">C++ 笔记 · 少儿编程入门 · 按 ⌘K 搜索 · ← → 切换章节</p>' +
      '</article>';

    document.title = chapter.title + ' · C++ 笔记';
    setActiveNav(index);
    syncProgressUI();
    safeSet(KEYS.last, chapter.slug);
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------------ router */

  function routeFromHash() {
    const raw = decodeURIComponent(
      window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
    );
    if (!raw || raw === 'home') return { type: 'home' };
    const index = COURSE.findIndex(function (chapter) {
      return chapter.slug === raw;
    });
    if (index >= 0) return { type: 'chapter', index: index };
    return { type: 'home', invalid: true };
  }

  function putHash(index, replace) {
    const target = '#/' + COURSE[index].slug;
    try {
      if (replace) window.history.replaceState({ chapter: index }, '', target);
      else window.history.pushState({ chapter: index }, '', target);
    } catch (error) {
      window.location.hash = target;
    }
  }

  function putHomeHash(replace) {
    try {
      if (replace) window.history.replaceState({ home: true }, '', '#/home');
      else window.history.pushState({ home: true }, '', '#/home');
    } catch (error) {
      window.location.hash = '#/home';
    }
  }

  function goTo(index) {
    if (index < 0 || index >= COURSE.length) return;
    if (state.view === 'chapter' && index === state.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (isMobile()) closeDrawer();
      return;
    }
    putHash(index, false);
    renderChapter(index);
    if (isMobile()) closeDrawer();
  }

  function goHome(section) {
    if (state.view !== 'home') {
      putHomeHash(false);
      renderHome({ scrollSection: section });
    } else if (section) {
      scrollToSection(section);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (isMobile()) closeDrawer();
  }

  function scrollToSection(section) {
    const target = document.getElementById(section);
    if (!target) return;
    window.requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function routeInitial() {
    const route = routeFromHash();
    if (route.type === 'chapter') {
      if (window.location.hash) {
        renderChapter(route.index, { animate: false });
      } else {
        renderChapter(route.index, { animate: false });
        putHash(route.index, true);
      }
      return;
    }
    if (!window.location.hash || window.location.hash === '#' || route.invalid) {
      putHomeHash(true);
    }
    renderHome({ animate: false });
  }

  function handleRouteChange() {
    const route = routeFromHash();
    if (route.type === 'home') {
      if (state.view !== 'home') renderHome();
      return;
    }
    if (state.view !== 'chapter' || route.index !== state.current) {
      renderChapter(route.index);
    }
    if (isMobile()) closeDrawer();
  }

  window.addEventListener('popstate', handleRouteChange);
  window.addEventListener('hashchange', handleRouteChange);

  /* -------------------------------------------------------------- navigation */

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function openDrawer() {
    if (!isMobile()) return;
    html.shell.classList.add('is-drawer-open');
    document.body.classList.add('is-drawer-open');
  }

  function closeDrawer() {
    html.shell.classList.remove('is-drawer-open');
    document.body.classList.remove('is-drawer-open');
  }

  function syncRailState() {
    const collapsed = html.shell.classList.contains('is-collapsed');
    if (html.railToggle) {
      const label = collapsed ? '展开目录' : '收起目录';
      html.railToggle.setAttribute('aria-label', label);
      html.railToggle.title = label;
      html.railToggle.setAttribute('aria-expanded', String(!collapsed));
    }
  }

  function toggleRail() {
    if (isMobile()) {
      openDrawer();
      return;
    }
    html.shell.classList.toggle('is-collapsed');
    syncRailState();
  }

  function focusSearch() {
    if (isMobile()) {
      openDrawer();
      window.setTimeout(function () {
        html.searchInput.focus();
        html.searchInput.select();
      }, 220);
      return;
    }
    html.shell.classList.remove('is-collapsed');
    syncRailState();
    html.searchInput.focus();
    html.searchInput.select();
  }

  /* ------------------------------------------------------------------ toast */

  let toastTimer = 0;

  function toast(message) {
    html.toast.textContent = message;
    html.toast.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      html.toast.classList.remove('is-show');
    }, 2200);
  }

  function copyText(text) {
    return new Promise(function (resolve) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(
          function () {
            resolve(true);
          },
          function () {
            resolve(fallbackCopy(text));
          }
        );
      } else {
        resolve(fallbackCopy(text));
      }
    });
  }

  function fallbackCopy(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.top = '-1000px';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, field.value.length);
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    field.remove();
    return ok;
  }

  /* ------------------------------------------------------------------ events */

  html.chapterList.addEventListener('click', function (event) {
    const link = event.target.closest('.chap');
    if (!link) return;
    event.preventDefault();
    goTo(Number(link.dataset.index));
  });

  html.searchInput.addEventListener('input', function (event) {
    state.query = event.target.value;
    renderSidebar();
  });

  html.searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      event.target.value = '';
      state.query = '';
      renderSidebar();
      event.target.blur();
    }
    if (event.key === 'Enter') {
      const first = $('.chap', html.chapterList);
      if (first) goTo(Number(first.dataset.index));
    }
  });

  html.appearanceSeg.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-mode]');
    if (button) setThemeMode(button.dataset.mode);
  });

  html.themeBtn.addEventListener('click', toggleTheme);
  html.headerSearch.addEventListener('click', focusSearch);

  html.railToggle.addEventListener('click', toggleRail);
  html.menuBtn.addEventListener('click', toggleRail);
  html.sidebarClose.addEventListener('click', closeDrawer);
  html.scrim.addEventListener('click', closeDrawer);

  html.printBtn.addEventListener('click', function () {
    closeDrawer();
    window.print();
  });

  document.addEventListener('click', function (event) {
    const sectionLink = event.target.closest('[data-home-section]');
    if (sectionLink) {
      event.preventDefault();
      goHome(sectionLink.dataset.homeSection);
      return;
    }
    const homeLink = event.target.closest('[data-home]');
    if (homeLink) {
      event.preventDefault();
      goHome();
    }
  });

  html.reader.addEventListener('click', function (event) {
    const courseCardLink = event.target.closest('.course-card');
    if (courseCardLink) {
      event.preventDefault();
      goTo(Number(courseCardLink.dataset.chapter));
      return;
    }

    const navLink = event.target.closest('[data-nav]');
    if (navLink) {
      event.preventDefault();
      goTo(Number(navLink.dataset.nav));
      return;
    }

    const copyButton = event.target.closest('.copy-btn');
    if (copyButton) {
      const raw = decodeURIComponent(copyButton.dataset.code || '');
      copyText(raw).then(function (ok) {
        if (!ok) {
          toast('复制失败，请手动选择代码');
          return;
        }
        copyButton.classList.add('is-copied');
        const label = copyButton.querySelector('span');
        if (label) label.textContent = '已复制';
        toast('代码已复制');
        window.clearTimeout(copyButton._timer);
        copyButton._timer = window.setTimeout(function () {
          copyButton.classList.remove('is-copied');
          if (label) label.textContent = '复制';
        }, 1600);
      });
      return;
    }

    const finishButton = event.target.closest('#finishBtn');
    if (finishButton) {
      const chapter = COURSE[state.current];
      if (!chapter) return;
      if (state.completed.has(chapter.slug)) {
        state.completed.delete(chapter.slug);
        toast('已取消完成标记');
      } else {
        state.completed.add(chapter.slug);
        toast('太棒了，这一章完成啦');
      }
      saveCompleted();
      syncCompletion();
      return;
    }

    const option = event.target.closest('.quiz-option');
    if (option) {
      const quiz = option.closest('.quiz');
      if (!quiz || quiz.classList.contains('is-answered')) return;
      $$('.quiz-option', quiz).forEach(function (item) {
        item.classList.remove('is-selected');
        item.setAttribute('aria-pressed', 'false');
      });
      option.classList.add('is-selected');
      option.setAttribute('aria-pressed', 'true');
      const status = $('.quiz-status', quiz);
      if (status) {
        status.textContent = '';
        status.className = 'quiz-status';
      }
      return;
    }

    const checkButton = event.target.closest('.quiz-check');
    if (checkButton) {
      const quiz = checkButton.closest('.quiz');
      if (!quiz) return;
      const options = $$('.quiz-option', quiz);
      const status = $('.quiz-status', quiz);
      const explain = $('.quiz-explain', quiz);

      if (quiz.classList.contains('is-answered')) {
        quiz.classList.remove('is-answered');
        options.forEach(function (item) {
          item.disabled = false;
          item.classList.remove('is-selected', 'is-correct', 'is-wrong');
          item.setAttribute('aria-pressed', 'false');
        });
        if (status) {
          status.textContent = '';
          status.className = 'quiz-status';
        }
        if (explain) explain.hidden = true;
        checkButton.textContent = '检查答案';
        return;
      }

      const selected = $('.quiz-option.is-selected', quiz);
      if (!selected) {
        if (status) {
          status.textContent = '先选一个答案吧';
          status.className = 'quiz-status';
        }
        return;
      }

      const answer = Number(quiz.dataset.answer);
      const chosen = Number(selected.dataset.index);
      options.forEach(function (item, index) {
        item.disabled = true;
        if (index === answer) item.classList.add('is-correct');
      });
      if (chosen !== answer) selected.classList.add('is-wrong');

      quiz.classList.add('is-answered');
      const correct = chosen === answer;
      if (status) {
        status.textContent = correct ? '答对了！' : '再想想，正确答案已标出';
        status.className = 'quiz-status ' + (correct ? 'ok' : 'bad');
      }
      if (explain) explain.hidden = false;
      checkButton.textContent = '再试一次';
    }
  });

  document.addEventListener('keydown', function (event) {
    const mod = event.metaKey || event.ctrlKey;
    const key = event.key.toLowerCase();

    if (mod && key === 'k') {
      event.preventDefault();
      focusSearch();
      return;
    }

    if (event.key === 'Escape') {
      if (html.shell.classList.contains('is-drawer-open')) {
        closeDrawer();
        return;
      }
      if (document.activeElement === html.searchInput) {
        if (html.searchInput.value) {
          html.searchInput.value = '';
          state.query = '';
          renderSidebar();
        }
        html.searchInput.blur();
      }
      return;
    }

    const tag = (event.target.tagName || '').toLowerCase();
    const typing =
      tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      tag === 'summary' ||
      (event.target && event.target.isContentEditable);

    if (!typing && !mod && !event.altKey && state.view === 'chapter') {
      if (event.key === 'ArrowRight') goTo(state.current + 1);
      if (event.key === 'ArrowLeft') goTo(state.current - 1);
    }
  });

  window.matchMedia(MOBILE_QUERY).addEventListener('change', function (event) {
    if (event.matches) {
      html.shell.classList.remove('is-collapsed');
      syncRailState();
    } else {
      closeDrawer();
      syncRailState();
    }
  });

  /* -------------------------------------------------------------------- init */

  loadState();
  applyTheme();
  syncThemeControl();
  renderSidebar();
  if (isMobile()) html.shell.classList.remove('is-collapsed');
  syncRailState();
  routeInitial();
  syncProgressUI();
})();
