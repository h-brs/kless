import { pdf_viewer, slidecast } from "../../helper.mjs";

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
        items: [pdf_viewer("00_start", "lecture", "Vorlesung", "🧑‍🏫")],
      },
      {
        id: "01_html",
        title: "Kapitel 1: WWW, HTTP, URI, HTML",
        items: [
          slidecast("01_html", 53),
          pdf_viewer("01_html", "exercise", "Übung", "💻"),
          pdf_viewer("01_html", "solution", "Musterlösung", "✅"),
        ],
      },
      {
        id: "02_css",
        title: "Kapitel 2: Cascading Style Sheets (CSS)",
        items: [
          slidecast("02_css", 57),
          pdf_viewer("02_css", "exercise", "Übung", "💻"),
          pdf_viewer("02_css", "solution", "Musterlösung", "✅"),
        ],
      },
      {
        id: "03_rwd",
        title: "Kapitel 3: Responsive Web Design (RWD)",
        items: [
          slidecast("03_rwd", 58),
          pdf_viewer("03_rwd", "exercise", "Übung", "💻"),
          pdf_viewer("03_rwd", "solution", "Musterlösung", "✅"),
          {
            id: "03_rwd-demos",
            title: "Flexbox verstehen",
            icon: "🧑‍💻",
            description: "grow, shrink und basis interaktiv ausprobieren",
            href: "./03_rwd/flex/",
          },
        ],
      },
      {
        id: "04_js",
        title: "Kapitel 4: JavaScript (JS)",
        items: [
          slidecast("04_js", 69),
          pdf_viewer("04_js", "exercise", "Übung", "💻"),
          pdf_viewer("04_js", "solution", "Musterlösung", "✅"),
          {
            id: "04_js-debugger",
            title: "JavaScript Debugger",
            icon: "🧑‍💻",
            description: "Debugging von JavaScript-Code",
            href: "./04_js/Debugger-Demo.mp4",
          },
        ],
      },
      {
        id: "05_dom",
        title: "Kapitel 5: Document Object Model (DOM)",
        items: [slidecast("05_dom", 65), pdf_viewer("05_dom", "exercise", "Übung", "💻")],
      },
    ],
  },
};
