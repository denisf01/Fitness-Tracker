import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcome: "Welcome to the page!",
          track: "Track all kinds of fitness activities",
          join: "Join us now!",
          login: "Login/Register",
          dashboardTable:
            "<0>Exercise</0>\n" +
            "              <0>Total workouts</0>\n" +
            "              <0>Total time(h)</0>",
          empty: "No records",
          exerciseName: "Exercise name",
          exerciseText: "Please enter the name of the new exercise.",
          exerciseTitle: "Add new exercise",
          newExerciseTitle: "Edit existing exercise",
          newExerciseText: "Please enter the new name of the exercise.",
          exercises: "Exercises",
          actionButtons:
            "<0 onClick={handleClose}>Cancel</0>\n" +
            "            <1 onClick={handleSubmit}>Submit</1>",
          workouts: "Workouts",
          dashboard: "Dashboard",
          signIn: "Sign in",
          profile: "Profile",
          logout: "Logout",
        },
      },
      bs: {
        translation: {
          welcome: "Dobrodošli na stranicu!",
          track: "Pratite sve vrste sportskih aktivnosti",
          join: "Pridružite nam se odma!",
          login: "Prijava/Registracija",
          dashboardTable:
            "<0>Vježba</0>\n" +
            "              <0>Ukupan broj treninga</0>\n" +
            "              <0>Ukupno vrijeme(h)</0>",
          empty: "Nema podataka",
          exerciseName: "Ime vježbe",
          exerciseText: "Unesite ime nove vježbe",
          exerciseTitle: "Dodavanje nove vježbe",
          newExerciseTitle: "Uređivanje postojeće vježbe",
          newExerciseText: "Unesite novo ime vježbe",
          exercises: "Vježbe",
          actionButtons:
            "<0 onClick={handleClose}>Poništi</0>\n" +
            "            <1 onClick={handleSubmit}>Potvrdi</1>",
          workouts: "Aktivnosti",
          dashboard: "Napredak",
          signIn: "Prijavi se",
          profile: "Profil",
          logout: "Odjava",
        },
      },
    },
  });
