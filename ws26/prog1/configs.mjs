import { pdf_viewer } from "../../helper.mjs";

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
        items: [pdf_viewer("00_start")],
      },
      {
        id: "01_grundbausteine",
        title: "Kapitel 1: Algorithmische Grundbausteine",
        items: [
          pdf_viewer("01_grundbausteine", "lecture", "Vorlesung", "🧑‍🏫", "slides"),
          pdf_viewer("01_grundbausteine", "exercise", "Übung", "💻", "exercise"),
          pdf_viewer("01_grundbausteine", "solution", "Musterlösung", "✅", "solution"),
        ],
      },
      {
        id: "02_grammatiken",
        title: "Kapitel 2: Aufbau von Programmiersprachen",
        items: [
          pdf_viewer("02_grammatiken"),
          pdf_viewer("02_grammatiken", "exercise", "Übung", "💻", "exercise"),
          pdf_viewer("02_grammatiken", "solution", "Musterlösung", "✅", "solution"),
        ],
      },
      {
        id: "03_java",
        title: "Kapitel 3: Einstieg in Java",
        items: [pdf_viewer("03_java")],
      },
    ],
  },
};
