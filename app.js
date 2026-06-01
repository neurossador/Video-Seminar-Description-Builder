(function () {
  "use strict";

  const form = document.getElementById("seminar-form");
  const resultOutput = document.getElementById("result-output");
  const resultPlaceholder = document.getElementById("result-placeholder");
  const btnCopy = document.getElementById("btn-copy");
  const btnSave = document.getElementById("btn-save");
  const btnClear = document.getElementById("btn-clear");
  const toast = document.getElementById("toast");

  let plainTextResult = "";

  const TONE = {
    professional: {
      intro: "предлагает структурированный разбор темы с опорой на доказательный подход и практику специалиста",
      announce: "В рамках видеосеминара вы получите системное представление о теме и инструменты для применения в работе",
      goalsVerb: "сформировать",
      learnIntro: "по итогам просмотра вы сможете",
      value: "получить чёткую профессиональную рамку и практические ориентиры для дальнейшей работы с клиентами и пациентами",
    },
    warm: {
      intro: "создан, чтобы бережно провести вас через тему — с уважением к вашему опыту и к запросам тех, кому вы помогаете",
      announce: "Это пространство для спокойного, осмысленного погружения в тему без лишней теоретической перегрузки",
      goalsVerb: "помочь вам",
      learnIntro: "вы сможете с большей уверенностью",
      value: "увидеть опорные точки в работе с запросом и почувствовать больше ясности и устойчивости в профессиональной практике",
    },
    academic: {
      intro: "посвящён актуальным научно-практическим аспектам темы с опорой на современные исследования и клиническую практику",
      announce: "Видеосеминар объединяет теоретическую базу и прикладные выводы для специалистов помогающих профессий",
      goalsVerb: "углубить",
      learnIntro: "участники освоят",
      value: "систематизировать знания по теме и интегрировать их в профессиональную деятельность",
    },
    practical: {
      intro: "сфокусирован на конкретных шагах, кейсах и инструментах, которые можно использовать уже после просмотра",
      announce: "Минимум общих слов — максимум прикладного материала для вашей ежедневной практики",
      goalsVerb: "отработать",
      learnIntro: "вы получите готовые приёмы, чтобы",
      value: "сразу применить полученные знания в консультировании, терапии или супервизии",
    },
    inspiring: {
      intro: "призван обновить ваш профессиональный взгляд на тему и напомнить, зачем вы выбрали эту работу",
      announce: "Приглашаем вас на встречу с темой, которая может стать важной опорой в вашей практике",
      goalsVerb: "расширить",
      learnIntro: "вы откроете для себя новые возможности, чтобы",
      value: "вернуться к практике с обновлённой мотивацией и ясным видением следующих шагов",
    },
  };

  function trim(value) {
    return (value || "").trim();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatParagraph(text) {
    return escapeHtml(text).replace(/\n/g, "<br>");
  }

  function splitList(text) {
    if (!text) return [];
    return text
      .split(/[\n;]+|,\s*(?=[А-ЯA-Z\d«「])/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function defaultDuration() {
    return "2–3 часа";
  }

  function defaultAccess() {
    return "видеозапись с неограниченным доступом в личном кабинете";
  }

  function buildDescription(data) {
    const tone = TONE[data.tone] || TONE.professional;
    const topic = data.topic;
    const audience = data.audience;
    const problem = data.problem;
    const context = data.context;
    const duration = data.duration || defaultDuration();
    const access = data.access || defaultAccess();
    const bonusesRaw = data.bonuses;
    const bonusItems = splitList(bonusesRaw);

    const title = `Видеосеминар «${topic}»`;

    const intro =
      `Приглашаем ${audience} на видеосеминар «${topic}». ` +
      `Программа ${tone.intro}. ` +
      (context
        ? `${context} `
        : "") +
      `Особое внимание уделено запросу: ${problem.charAt(0).toLowerCase() + problem.slice(1).replace(/\.$/, "")}.`;

    const announce =
      `${tone.announce}. ` +
      `Длительность — ${duration}. Формат: ${access}.`;

    const forWhom =
      `Семинар ориентирован на ${audience}. ` +
      `Он будет полезен, если вы сталкиваетесь с ситуацией, когда ${problem.charAt(0).toLowerCase() + problem.slice(1).replace(/\.$/, "")}, ` +
      `и хотите опереться на структурированные знания и проверенные подходы.`;

    const description =
      `«${topic}» — это видеосеминар для специалистов, работающих в поле психического здоровья и психологической помощи. ` +
      (context
        ? `${context} `
        : "В программе сочетаются теоретические ориентиры и практические рекомендации. ") +
      `Центральный фокус — ${problem.charAt(0).toLowerCase() + problem.slice(1).replace(/\.$/, "")}.`;

    const goals = [
      `${capitalize(tone.goalsVerb)} целостное понимание темы «${topic}» в профессиональном контексте`,
      "Выделить ключевые факторы, влияющие на динамику запроса аудитории",
      "Определить эффективные стратегии вмешательства и границы компетенции специалиста",
      "Сформулировать план интеграции полученных знаний в собственную практику",
    ];

    const learn = [
      "как структурировать работу с основным запросом клиента или пациента",
      "какие подходы и методы опираются на современные данные и клинический опыт",
      "на что обращать внимание при оценке ситуации и планировании вмешательства",
      "как адаптировать рекомендации под особенности вашей профессиональной среды",
      "какие типичные ошибки встречаются в практике и как их предотвращать",
    ];

    const formatBlock =
      `Формат: видеосеминар (мастер-класс).\n` +
      `Длительность: ${duration}.\n` +
      `Доступ: ${access}.\n` +
      `Материал подаётся последовательно: от постановки проблемы к практическим выводам. ` +
      `Вы можете просматривать запись в удобном темпе и возвращаться к нужным фрагментам.`;

    const content = [
      `Введение: актуальность темы «${topic}» и профессиональный контекст`,
      "Разбор основной проблемы и факторов, влияющих на её проявление",
      "Обзор подходов и инструментов, применимых в работе специалиста",
      "Практические рекомендации и клинические/консультативные нюансы",
      "Интеграция материала в практику: шаги, вопросы для саморефлексии, ограничения",
      "Резюме и ответы на типичные вопросы",
    ];

    let bonusesBlock = "";
    if (bonusItems.length) {
      bonusesBlock =
        "При регистрации на семинар вы дополнительно получаете:\n" +
        bonusItems.map((b) => `• ${b}`).join("\n");
    } else {
      bonusesBlock =
        "Участникам доступны дополнительные материалы для закрепления: конспект ключевых тезисов и рабочие ориентиры для применения в практике. " +
        "Точный перечень бонусов уточняется на странице регистрации.";
    }

    const finalValue =
      `Итоговая ценность семинара: ${tone.value}. ` +
      `Вы уйдёте с ясной структурой по теме «${topic}» и с конкретными идеями для работы с запросом: ${problem.charAt(0).toLowerCase() + problem.slice(1).replace(/\.$/, "")}.`;

    const learnBlock =
      `${capitalize(tone.learnIntro)}:\n` + learn.map((l) => `• ${l}`).join("\n");

    const sections = [
      { key: "title", label: "Название", text: title, isMain: true },
      { key: "intro", label: "Вводный абзац", text: intro },
      { key: "announce", label: "Анонс", text: announce },
      { key: "forWhom", label: "Для кого", text: forWhom },
      { key: "description", label: "Описание", text: description },
      { key: "goals", label: "Цели семинара", text: goals.map((g) => `• ${g}`).join("\n"), isList: true },
      { key: "learn", label: "Вы узнаете", text: learnBlock, isList: true },
      { key: "format", label: "Формат", text: formatBlock },
      { key: "content", label: "Содержание", text: content.map((c) => `• ${c}`).join("\n"), isList: true },
      { key: "bonuses", label: "Бонусы", text: bonusesBlock, isList: bonusItems.length > 0 },
      { key: "value", label: "Итоговая ценность", text: finalValue },
    ];

    return sections;
  }

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function sectionsToPlainText(sections) {
    return sections
      .map((s) => `${s.label.toUpperCase()}\n${s.text}`)
      .join("\n\n" + "—".repeat(40) + "\n\n");
  }

  function renderResult(sections) {
    resultOutput.innerHTML = sections
      .map((s) => {
        const titleClass = s.isMain ? " result-block__title--main" : "";
        const body = s.isList
          ? formatListHtml(s.text)
          : `<p>${formatParagraph(s.text)}</p>`;
        return `<div class="result-block" data-section="${s.key}">
          <h3 class="result-block__title${titleClass}">${escapeHtml(s.label)}</h3>
          ${body}
        </div>`;
      })
      .join("");

    plainTextResult = sectionsToPlainText(sections);
    resultPlaceholder.classList.add("hidden");
    resultOutput.classList.remove("hidden");
    btnCopy.disabled = false;
    btnSave.disabled = false;
  }

  function formatListHtml(text) {
    const lines = text.split("\n").filter((l) => l.trim());
    const hasBullets = lines.some((l) => /^[•\-]/.test(l.trim()));
    if (!hasBullets) {
      return `<p>${formatParagraph(text)}</p>`;
    }
    const items = lines
      .map((l) => l.replace(/^[•\-]\s*/, "").trim())
      .filter(Boolean)
      .map((l) => `<li>${formatParagraph(l)}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  }

  function validateForm() {
    const required = ["topic", "audience", "problem"];
    let valid = true;
    required.forEach((id) => {
      const el = document.getElementById(id);
      const ok = trim(el.value).length > 0;
      el.classList.toggle("invalid", !ok);
      if (!ok) valid = false;
    });
    return valid;
  }

  function getFormData() {
    return {
      topic: trim(document.getElementById("topic").value),
      audience: trim(document.getElementById("audience").value),
      problem: trim(document.getElementById("problem").value),
      context: trim(document.getElementById("context").value),
      duration: trim(document.getElementById("duration").value),
      access: trim(document.getElementById("access").value),
      bonuses: trim(document.getElementById("bonuses").value),
      tone: document.getElementById("tone").value,
    };
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.add("hidden"), 2800);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Заполните обязательные поля: тема, аудитория, проблема");
      return;
    }
    const sections = buildDescription(getFormData());
    renderResult(sections);
    resultOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
    showToast("Описание собрано");
  });

  ["topic", "audience", "problem"].forEach((id) => {
    document.getElementById(id).addEventListener("input", function () {
      if (trim(this.value)) this.classList.remove("invalid");
    });
  });

  btnCopy.addEventListener("click", async () => {
    if (!plainTextResult) return;
    try {
      await navigator.clipboard.writeText(plainTextResult);
      showToast("Скопировано в буфер обмена");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = plainTextResult;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Скопировано в буфер обмена");
    }
  });

  btnSave.addEventListener("click", () => {
    if (!plainTextResult) return;
    const topic = trim(document.getElementById("topic").value) || "videoseminar";
    const safeName = topic
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 60);
    const blob = new Blob([plainTextResult], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opisanie_${safeName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Файл сохранён");
  });

  btnClear.addEventListener("click", () => {
    form.reset();
    plainTextResult = "";
    resultOutput.innerHTML = "";
    resultOutput.classList.add("hidden");
    resultPlaceholder.classList.remove("hidden");
    btnCopy.disabled = true;
    btnSave.disabled = true;
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    showToast("Форма очищена");
  });
})();
