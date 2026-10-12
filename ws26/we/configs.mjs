import { pdf_viewer, slidecast } from "/helper.mjs";

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
          pdf_viewer("01_html", "exercise", "Übung", "💻", "exercise"),
          pdf_viewer("01_html", "solution", "Musterlösung", "✅", "solution"),
        ],
      },
      {
        id: "02_css",
        title: "Kapitel 2: Cascading Style Sheets (CSS)",
        items: [slidecast("02_css", 57), pdf_viewer("02_css", "exercise", "Übung", "💻", "exercise")],
      },
    ],
  },
};
