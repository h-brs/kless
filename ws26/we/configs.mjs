const pdf_viewer_config = {
  labels: {
    viewer: "PDF-Betrachter",
    previous: "Zurück",
    next: "Weiter",
    page: "Seite",
    of: "von",
    zoomOut: "Verkleinern",
    zoomIn: "Vergrößern",
    fit: "An Breite anpassen",
    download: "Herunterladen",
    loading: "PDF wird geladen …",
    rendering: "Seite wird geladen …",
    missing: "Keine PDF-URL angegeben.",
    error: "Die PDF konnte nicht geladen oder angezeigt werden.",
    password: "Bitte gib das Passwort für diese PDF ein.",
    passwordIncorrect: "Falsches Passwort. Bitte versuche es erneut.",
    passwordLabel: "Passwort",
    unlock: "PDF öffnen",
    cancel: "Abbrechen",
    passwordCancelled: "Das Öffnen der PDF wurde abgebrochen.",
    invalidPage: "Bitte gib eine gültige Seitennummer ein.",
    link: "Link in der PDF",
  },
};

const pdf_viewer = (chapter, type = "exercise", title = "Übung", icon = "💻", filename = "exercise") => {
  return {
    id: `${chapter}-${type}`,
    title,
    icon,
    app: [
      "ccm.start",
      "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
      {
        pdf: `./${chapter}/${filename}.pdf`,
        ...pdf_viewer_config,
      },
    ],
  };
};

const slidecast = (chapter, pages) => {
  return {
    id: `${chapter}-lecture`,
    title: "Vorlesung",
    icon: "🧑‍🏫",
    app: [
      "ccm.start",
      "https://cdn.jsdelivr.net/gh/ccmjs/slidecast@v1.2.0/ccm.slidecast-1.2.0.min.mjs#sha384-iVpZR8MDLJrFCJLSL0feyFOGvLBcPT/zL64iqSMlJN9z/EhDGx1H55p3xgEIhdIe",
      {
        pdf_viewer: [
          "ccm.component",
          "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
          pdf_viewer_config,
        ],
        viewer: pdf_viewer_config,
        autoplay: true,
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

export const config = {
  title: "Einführung in Web Engineering ⋅ WS26 ⋅ Kless",
  description: "",
  labels: {
    back: "Zurück",
    home: "Übersicht",
    loading: "Wird geladen …",
    retry: "Erneut versuchen",
    error: "Die App konnte nicht geladen werden.",
    empty: "Es wurden noch keine Apps hinzugefügt.",
    folder: "Ordner",
  },
  ignore: {
    sections: [
      {
        id: "00_start",
        title: "Einführung",
        items: [pdf_viewer("00_start", "lecture", "Vorlesung", "🧑‍🏫", "slides")],
      },
      {
        id: "01_html",
        title: "Kapitel 1: WWW, HTTP, URI, HTML",
        items: [
          slidecast("01_html", 53),
          pdf_viewer("01_html"),
          pdf_viewer("01_html", "solution", "Musterlösung", "✅", "solution"),
        ],
      },
      {
        id: "02_css",
        title: "Kapitel 2: Cascading Style Sheets (CSS)",
        items: [slidecast("02_css", 57)],
      },
    ],
  },
};
