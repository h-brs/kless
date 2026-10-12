export const pdf_viewer_config = {
  labels: {
    viewer: "PDF-Viewer",
    previous: "Zurück",
    next: "Weiter",
    page: "Seite",
    of: "von",
    zoomOut: "Verkleinern",
    zoomIn: "Vergrößern",
    fit: "Breite anpassen",
    download: "Herunterladen",
    loading: "PDF wird geladen …",
    rendering: "Seite wird geladen …",
    missing: "Keine PDF-URL angegeben.",
    error: "Das PDF konnte nicht geladen oder angezeigt werden.",
    password: "Bitte das Passwort für dieses PDF eingeben.",
    passwordIncorrect: "Das Passwort ist falsch. Bitte erneut versuchen.",
    passwordLabel: "Passwort",
    unlock: "PDF öffnen",
    cancel: "Abbrechen",
    passwordCancelled: "Das Öffnen des PDFs wurde abgebrochen.",
    invalidPage: "Bitte eine gültige Seitenzahl eingeben.",
    link: "Link im PDF",
    thumbnails: "Folienübersicht",
    thumbnailError: "Vorschau nicht verfügbar",
  },
};

export const pdf_viewer = (chapter, type = "lecture", title = "Vorlesung", icon = "🧑‍🏫", filename = "slides") => {
  return {
    id: `${chapter}-${type}`,
    title,
    icon,
    app: [
      "ccm.start",
      "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.1.0/ccm.pdf_viewer-1.1.0.min.mjs#sha384-h/Tddha/iX7T/AuKwYFOJwxb1fASNwPtN1JiTSVJBt762c2Wyt/uLK3jHVgpaQ8A",
      {
        pdf: `./${chapter}/${filename}.pdf`,
        ...pdf_viewer_config,
      },
    ],
  };
};

export const slidecast = (chapter, pages) => {
  return {
    id: `${chapter}-lecture`,
    title: "Vorlesung",
    icon: "🧑‍🏫",
    app: [
      "ccm.start",
      "https://cdn.jsdelivr.net/gh/ccmjs/slidecast@v1.3.0/ccm.slidecast-1.3.0.min.mjs#sha384-Yf3pYGBl58kHejT6f9PtR7Zk2l2fIab9LyCn32KcQ+Rj7dXKRx/LGcUBzX0EgDBy",
      {
        pdf_viewer: [
          "ccm.component",
          "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.1.0/ccm.pdf_viewer-1.1.0.min.mjs#sha384-h/Tddha/iX7T/AuKwYFOJwxb1fASNwPtN1JiTSVJBt762c2Wyt/uLK3jHVgpaQ8A",
          pdf_viewer_config,
        ],
        viewer: pdf_viewer_config,
        labels: {
          navigation: "Slidecast-Navigation",
          previous: "Zurück",
          next: "Weiter",
          step: "Schritt",
          of: "von",
          slide: "Folie",
          audio: "Audio zur Folie",
          invalidStep: "Bitte eine gültige Schrittnummer eingeben.",
          autoplay: "Autoplay",
          autoplayDescription: "Audio automatisch abspielen und zur nächsten Folie wechseln",
          audioShortcuts: "Tastatur: + / − Geschwindigkeit; , / . zehn Sekunden zurück / vor.",
          comments: "Kommentare zur Folie",
          commentsPlaceholder: "Die Kommentarfunktion wird später ergänzt.",
          missingLinkTarget: "Die verlinkte PDF-Seite ist nicht Teil dieses Slidecasts.",
          error: "Der Slidecast konnte nicht angezeigt werden: ",
          pdfNotOpened: "Die PDF wurde nicht geöffnet.",
        },
        pdf: `./${chapter}/slides.pdf`,
        ignore: {
          slides: Array.from({ length: pages }, (_, i) => ({
            page: i + 1,
            audio: `./${chapter}/slide${String(i + 1).padStart(2, "0")}.mp3`,
          })),
        },
      },
    ],
  };
};
