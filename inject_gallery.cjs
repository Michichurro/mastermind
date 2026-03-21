const fs = require('fs');

const galleryData = {
  "alvar": [
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-11.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-19.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-20.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-21.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-22.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-23.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-24.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-25.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-26.png",
    "/projects/Alvar/+ SLIDES PARA PRESS - ALVAR-27.png",
    "/projects/Alvar/MOCKUP-DE-FEED-IG-01.png",
    "/projects/Alvar/MOCKUP-DE-FEED-IG-02.png",
    "/projects/Alvar/MOCKUP-DE-FEED-IG-03png.png",
    "/projects/Alvar/RRSS-CAMINO 02-01.png",
    "/projects/Alvar/RRSS-CAMINO 02-02.png",
    "/projects/Alvar/RRSS-CAMINO 02-03.png",
    "/projects/Alvar/RRSS-CAMINO 02-04.png",
    "/projects/Alvar/RRSS-CAMINO 02-05.png",
    "/projects/Alvar/RRSS-CAMINO 02-06.png",
    "/projects/Alvar/RRSS-CAMINO 02-07.png",
    "/projects/Alvar/RRSS-CAMINO 02-08.png",
    "/projects/Alvar/RRSS-CAMINO 02-09.png"
  ],
  "benave-home": [
    "/projects/benave-home/Double-Sided-A5-Flyer-Mockups-01-ajuste02.png",
    "/projects/benave-home/EXPLORACIONES BRANDING - BENAVE-23.png",
    "/projects/benave-home/EXPLORACIONES BRANDING - BENAVE-24.png",
    "/projects/benave-home/EXPLORACIONES BRANDING - BENAVE-25.png",
    "/projects/benave-home/EXPLORACIONES BRANDING - BENAVE-26.png",
    "/projects/benave-home/Free-A5-Greeting-Card-Mockup-ajuste.png",
    "/projects/benave-home/freepik__hagamos-un-montage-de-esta-etiqueta-que-te-conecto__26431.png",
    "/projects/benave-home/Free_Shopping_Bag_Mockup_4-asdasd.png",
    "/projects/benave-home/Label-Tag-Mockup-ajuste-01.jpg",
    "/projects/benave-home/LEMON---Business-Card-Mockup.jpg",
    "/projects/benave-home/MOCKUP-LOCAL--02.png",
    "/projects/benave-home/MOCKUP-UNIFORME-final-01.png",
    "/projects/benave-home/Paper_Bag_Mockup_4asdasd.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-01.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-03.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-04.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-05.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-06.png",
    "/projects/benave-home/PLANTILLA - BENAVÉ - RRSS-07.png",
    "/projects/benave-home/Square_Signboard_Mockup_1---01.png"
  ],
  "derosca": [
    "/projects/Derosca/camino-01.png",
    "/projects/Derosca/Free-Business-Card-on-Metal-Background-Mockup.jpg",
    "/projects/Derosca/Free-Kraft-Paper-Bag-Mockup.png",
    "/projects/Derosca/Free_Billboard_Mockup_1.jpg",
    "/projects/Derosca/HydroFlaskBottle07.jpg",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-03.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-04.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-05.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-06.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-07.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-09.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-10.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-11.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-12.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-13.png",
    "/projects/Derosca/KV - 01 - BRANDING DEROSCA [Recovered]-14.png",
    "/projects/Derosca/KV---01---BRANDING-DEROSCA-[Recovered]-05.png",
    "/projects/Derosca/KV---01---BRANDING-DEROSCA-[Recovered].png",
    "/projects/Derosca/Product-Brand-Boxes-Free-psd-Packaging-Mockup.png"
  ],
  "norte-19": [
    "/projects/norte-19/Macbook_Air_Mockup_2.png",
    "/projects/norte-19/MOCKUP-UNIFORME-2.png",
    "/projects/norte-19/PROYECTOS 2025 - MASTERMIND-42.png",
    "/projects/norte-19/PROYECTOS 2025 - MASTERMIND_Mesa de trabajo 32 copia 29.png",
    "/projects/norte-19/PROYECTOS 2025 - MASTERMIND_Mesa de trabajo 32 copia 30.png",
    "/projects/norte-19/PROYECTOS 2025 - MASTERMIND_Mesa de trabajo 32 copia 31.png",
    "/projects/norte-19/SECUENCIA 1_1.mp4",
    "/projects/norte-19/SECUENCIA 2 4-5_1.mp4",
    "/projects/norte-19/SECUENCIA 3_1.mp4",
    "/projects/norte-19/SECUENCIA 4_1.mp4",
    "/projects/norte-19/SECUENCIA 5_1.mp4",
    "/projects/norte-19/SECUENCIA 6_1.mp4",
    "/projects/norte-19/SECUENCIA 7_1.mp4",
    "/projects/norte-19/SECUENCIA 8_1.mp4",
    "/projects/norte-19/Square_Signboard_Mockup_2.png"
  ],
  "nuda": [
    "/projects/Nuda/BAJADA LOGOS NUDA - 03 MARZO 2026.png",
    "/projects/Nuda/BAJADA LOGOS NUDA - 03 MARZO 2026asd.png",
    "/projects/Nuda/freepik__objetivo-generar-un-mockup-tipo-etiqueta-circular-__14670.png",
    "/projects/Nuda/freepik__packaging-de-delivery-elegante-para-la-marca-nuda-__14672.png"
  ]
};

let content = fs.readFileSync('src/data/projects.js', 'utf8');

for (const [id, images] of Object.entries(galleryData)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?desc:\\s*\\{[\\s\\S]*?\\},)`, 'g');
  content = content.replace(regex, `$1\n    gallery: ${JSON.stringify(images)},`);
}

fs.writeFileSync('src/data/projects.js', content);
