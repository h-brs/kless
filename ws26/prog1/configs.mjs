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

export const config = {
  title: "Programmierung 1 ⋅ WS26 ⋅ Kless",
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
        id: "01_grundbausteine",
        title: "Kapitel 1: Algorithmische Grundbausteine",
        items: [
          {
            id: "01_grundbausteine-lecture",
            title: "Vorlesung",
            icon: "🧑‍🏫",
            app: [
              "ccm.start",
              "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
              { pdf: "./01_grundbausteine/slides.pdf", ...pdf_viewer_config },
            ],
          },
          {
            id: "01_grundbausteine-exercise",
            title: "Übung",
            icon: "💻",
            app: [
              "ccm.start",
              "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
              { pdf: "./01_grundbausteine/exercise.pdf", ...pdf_viewer_config },
            ],
          },
        ],
      },
      {
        id: "02_grammatiken",
        title: "Kapitel 2: Aufbau von Programmiersprachen",
        items: [
          {
            id: "02_grammatiken-lecture",
            title: "Vorlesung",
            icon: "🧑‍🏫",
            app: [
              "ccm.start",
              "https://cdn.jsdelivr.net/gh/ccmjs/pdf_viewer@v1.0.0/ccm.pdf_viewer-1.0.0.min.mjs#sha384-1NwNCUojyNg7BPq0Odf5LRpb3kJ1qlCXpZHd1vHHHYNzm4AONSwujk5CH5TFcDlE",
              { pdf: "./02_grammatiken/slides.pdf", ...pdf_viewer_config },
            ],
          },
        ],
      },
    ],
  },
};
