const express = require("express");
const quran = require("../controllers/quranController");
const doa = require("../controllers/doaController");
const dzikir = require("../controllers/dzikirController");
const hadits = require("../controllers/haditsController");
const router = express.Router();

// Middleware for caching
router.get((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "public, max-age=0, s-maxage=86400, stale-while-revalidate"
  );
  next();
});

// API documentation endpoint
router.get("/", (req, res) =>
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SwaggerUI" />
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  </head>
  <body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js" crossorigin></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: 'https://raw.githubusercontent.com/SatganzDevs/muslim-api/refs/heads/main/docs.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
      });
    };
  </script>
  </body>
</html>`)
);

// Quran routes
router.get("/quran/surah", quran.getAllSurah);
router.get("/quran/surah/:surahId", quran.getSurah);
router.get("/quran/juz", quran.getAllJuz);
router.get("/quran/juz/:juzId", quran.getJuz);
router.get("/quran/ayah", quran.getAllAyah);
router.get("/quran/ayah/surah/:surahId", quran.getAyahSurah);
router.get("/quran/ayah/:surahId/:ayahId", quran.getAyah);
router.get("/quran/ayah/:surahId/:startId-:endId", quran.getAyahRange);
router.get("/quran/ayah/juz/:juzId", quran.getAyahJuz);
router.get("/quran/ayah/page/:pageId", quran.getAyahPage);
router.get("/quran/asbab", quran.getAllAsbab);
router.get("/quran/asbab/:id", quran.getAsbab);
router.get("/quran/asma", quran.getAsma);
router.get("/quran/tafsir", quran.getAllTafsir);
router.get("/quran/tafsir/:id", quran.getTafsir);
router.get("/quran/theme", quran.getAllTheme);
router.get("/quran/theme/:id", quran.getTheme);
router.get("/quran/word", quran.getAllWord);
router.get("/quran/word/:surahId/", quran.getWordSurah);
router.get("/quran/word/:surahId/:ayahId", quran.getWord);

// Doa routes
router.get("/doa", doa.getAllDoa);
router.get("/doa/:source", doa.getDoa);

// Dzikir routes
router.get("/dzikir/:source", dzikir.getDzikir);

// Hadits routes
router.get("/hadits", hadits.getAllHadits);
router.get("/hadits/:nomor", hadits.getHadits);

// Handle 404 for all other routes
router.all("*", (req, res) =>
  res.status(404).send({
    code: 404,
    status: "Not Found.",
    message: `Resource "${req.url}" is not found.`,
  })
);

module.exports = router;
