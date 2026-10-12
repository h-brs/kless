export const pdf_viewer_config = {
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

export const pdf_viewer = (chapter, type = "lecture", title = "Vorlesung", icon = "🧑‍🏫", filename = "slides") => {
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

export const slidecast = (chapter, pages) => {
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
