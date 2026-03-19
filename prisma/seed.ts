import { generateSlug } from '../src/lib/slug.js';
import { prisma } from '../src/lib/prisma.js';

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.news.deleteMany();
  await prisma.author.deleteMany();

  // Create authors
  const fridrik = await prisma.author.create({
    data: { name: 'Viktor', email: 'viktor@example.org' },
  });
  console.log(`Created author: ${fridrik.name}`);

  const fanney = await prisma.author.create({
    data: { name: 'Alma', email: 'alma@example.net' },
  });
  console.log(`Created author: ${fanney.name}`);

  const ottar = await prisma.author.create({
    data: { name: 'Adda', email: 'adda@example.com' },
  });
  console.log(`Created author: ${ottar.name}`);

  const kata = await prisma.author.create({
    data: { name: 'Nonni', email: 'nonni@example.org' },
  });
  console.log(`Created author: ${kata.name}`);

  await prisma.news.create({
    data: {
      title: 'Ný frétt á forsíðu',
      slug: generateSlug('Ný frétt á forsíðu'),
      intro:
        'Þetta er stutt inngangslýsing á frétt sem birtist á forsíðu vefsins.',
      content:
        'Þetta er lengri texti fréttarinnar. Hér gætu verið nánari upplýsingar um atburð, viðbrögð fólks og annað sem skiptir máli. Markmiðið er að hafa eðlilegan og læsilegan texta á íslensku í staðinn fyrir fyllitexta.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Skemmtilegur dagur í bænum',
      slug: generateSlug('Skemmtilegur dagur í bænum'),
      intro:
        'Margir lögðu leið sína í miðbæinn og nutu dagsins í góðu veðri.',
      content:
        'Það var líf og fjör í miðbænum í dag. Fólk sat á kaffihúsum, gekk um göturnar og naut þess að vera til. Verslanir voru vel sóttar og stemningin almennt mjög góð.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Nýjungar kynntar í skólanum',
      slug: generateSlug('Nýjungar kynntar í skólanum'),
      intro:
        'Nemendur fengu kynningu á nýjum lausnum sem eiga að bæta námið.',
      content:
        'Í dag voru kynntar ýmsar nýjungar í skólastarfinu. Þar má nefna bætt aðgengi að gögnum, ný námsverkfæri og skýrari utanumhald um verkefnaskil. Nemendur tóku kynningunni almennt vel.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Mikil stemning fyrir helginni',
      slug: generateSlug('Mikil stemning fyrir helginni'),
      intro:
        'Margir eru þegar farnir að skipuleggja helgina og hlakka til.',
      content:
        'Helgin nálgast og margir eru með stór plön. Sumir ætla að hitta vini, aðrir fara í ferðalög eða nýta tímann til að slaka á. Veðurspáin er ágæt og því ekkert sem ætti að stoppa góð plön.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Nýtt námskeið í boði',
      slug: generateSlug('Nýtt námskeið í boði'),
      intro:
        'Á næstu vikum verður boðið upp á nýtt námskeið fyrir áhugasama.',
      content:
        'Námskeiðið er ætlað þeim sem vilja bæta færni sína og kynnast nýjum aðferðum. Lögð verður áhersla á hagnýta vinnu, góð dæmi og verkefni sem nýtast í daglegu námi og starfi.',
      published: false,
      authorId: fanney.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Mikilvægar breytingar framundan',
      slug: generateSlug('Mikilvægar breytingar framundan'),
      intro:
        'Á næstunni taka gildi breytingar sem hafa áhrif á marga notendur.',
      content:
        'Unnið hefur verið að breytingunum í nokkurn tíma og markmiðið er að bæta þjónustu og einfalda ferla. Nánari upplýsingar verða birtar á næstu dögum svo allir geti undirbúið sig vel.',
      published: true,
      authorId: ottar.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Viðtal við áhugaverðan gest',
      slug: generateSlug('Viðtal við áhugaverðan gest'),
      intro:
        'Gestur dagsins ræddi meðal annars um reynslu sína og framtíðaráform.',
      content:
        'Í viðtalinu kom margt fróðlegt fram. Gesturinn fór yfir bakgrunn sinn, hvað hefur mótað hann og hvaða áskoranir hann hefur þurft að takast á við. Einnig var rætt um markmið og framtíðarsýn.',
      published: true,
      authorId: ottar.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Ný opnun vekur athygli',
      slug: generateSlug('Ný opnun vekur athygli'),
      intro:
        'Ný starfsemi hefur opnað og vakið jákvæð viðbrögð meðal gesta.',
      content:
        'Margir mættu á opnunina og lýstu ánægju með framtakið. Boðið var upp á kynningu, léttar veitingar og gott spjall. Eigendur segjast spenntir fyrir næstu skrefum.',
      published: true,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Verkefni seinkar lítillega',
      slug: generateSlug('Verkefni seinkar lítillega'),
      intro:
        'Seinkun hefur orðið á verkefni sem margir hafa beðið eftir.',
      content:
        'Samkvæmt upplýsingum frá ábyrgðaraðilum er um tímabundna seinkun að ræða. Unnið er að því að klára síðustu atriðin og stefnt er að því að ljúka verkinu eins fljótt og unnt er.',
      published: false,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Fleiri tækifæri í boði',
      slug: generateSlug('Fleiri tækifæri í boði'),
      intro:
        'Áhersla verður lögð á að skapa fleiri tækifæri fyrir áhugasama.',
      content:
        'Undanfarin misseri hefur verið unnið að því að fjölga valkostum og bæta aðstöðu. Með þessum breytingum verður auðveldara fyrir fleiri að taka þátt og nýta sér það sem í boði er.',
      published: true,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Góður árangur skilar sér',
      slug: generateSlug('Góður árangur skilar sér'),
      intro:
        'Vinna síðustu vikna er farin að skila sér í betri niðurstöðum.',
      content:
        'Þeir sem hafa komið að verkefninu segja ánægjulegt að sjá framfarirnar. Samvinna hefur gengið vel og markviss vinna hefur leitt til betri árangurs en margir þorðu að vona.',
      published: false,
      authorId: kata.id,
    },
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });