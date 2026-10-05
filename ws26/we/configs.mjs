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

const slidecast_config = {
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
    audio: "Tonspur zur Folie",
    invalidStep: "Bitte gib eine gültige Schrittnummer ein.",
    playbackSpeed: "Wiedergabegeschwindigkeit",
    audioShortcuts: "Tastatur: + / − Geschwindigkeit; , / . jeweils 10 Sekunden zurück / vor.",
    comments: "Kommentare zur Folie",
    commentsPlaceholder: "Die Kommentarfunktion wird später ergänzt.",
    missingLinkTarget: "Die verlinkte PDF-Seite ist nicht Teil dieses Slidecasts.",
    error: "Der Slidecast konnte nicht angezeigt werden: ",
    pdfNotOpened: "Die PDF wurde nicht geöffnet.",
  },
};

const chapter = (id, pages) => {
  return {
    pdf: `./${id}/slides.pdf`,
    ignore: {
      slides: Array.from({ length: pages }, (_, i) => ({
        page: i + 1,
        audio: `./${id}/slide${String(i + 1).padStart(2, "0")}.mp3`,
      })),
    },
    ...slidecast_config,
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
        items: [
          {
            id: "00_start-lecture",
            title: "Vorlesung",
            icon: "🧑‍🏫",
            app: [
              "ccm.start",
              "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
              { pdf: "./00_start/slides.pdf", ...pdf_viewer_config },
            ],
          },
        ],
      },
      {
        id: "01_html",
        title: "Kapitel 1: WWW, HTTP, URI, HTML",
        items: [
          {
            id: "01_html-lecture",
            title: "Vorlesung",
            icon: "🧑‍🏫",
            app: [
              "ccm.start",
              "https://cdn.jsdelivr.net/gh/ccmjs/slidecast@v1.1.0/ccm.slidecast-1.1.0.min.mjs#sha384-l8tLDoXszYpItIkbcjxiPlKEZXu3yk97ctZD3D9liLWYZqwUsoQjVwI6K++JA9b/",
              chapter("01_html", 53),
            ],
          },
        ],
      },
    ],
  },
};
