import { generateSlug } from '../src/lib/slug.js';
import { prisma } from '../src/lib/prisma.js';

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.news.deleteMany();
  await prisma.author.deleteMany();

  // Create authors
  const fridrik = await prisma.author.create({
    data: { name: 'Friðrik Fréttaritari', email: 'fridrik@example.org' },
  });
  console.log(`Created author: ${fridrik.name}`);

  const fanney = await prisma.author.create({
    data: { name: 'Frétta Fanney', email: 'fanney@example.net' },
  });
  console.log(`Created author: ${fanney.name}`);

  const ottar = await prisma.author.create({
    data: { name: 'Æsifrétta Óttar', email: 'ottar@example.com' },
  });
  console.log(`Created author: ${ottar.name}`);

  const kata = await prisma.author.create({
    data: { name: 'Kúltúrfrétta Kata', email: 'kata@example.org' },
  });
  console.log(`Created author: ${kata.name}`);

  await prisma.news.create({
    data: {
      title: 'Lorem Ipsum Dolor Sit Amet',
      slug: generateSlug('Lorem Ipsum Dolor Sit Amet'),
      intro:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Sit Amet',
      slug: generateSlug('Sit Amet'),
      intro:
        'Sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      content:
        'Sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Consectetur Adipiscing Elit',
      slug: generateSlug('Consectetur Adipiscing Elit'),
      intro:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Adipiscing Elit',
      slug: generateSlug('Adipiscing Elit'),
      intro:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      published: true,
      authorId: fridrik.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Quis Autem Vel Eum',
      slug: generateSlug('Quis Autem Vel Eum'),
      intro:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.',
      content:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
      published: false,
      authorId: fanney.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Temporibus Autem Quibusdam',
      slug: generateSlug('Temporibus Autem Quibusdam'),
      intro:
        'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
      content:
        'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.',
      published: true,
      authorId: ottar.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Hanc Ego Cum Teneam',
      slug: generateSlug('Hanc Ego Cum Teneam'),
      intro:
        'Sed ut tum ad senem senex de senectute, sic hoc libro ad amicum amicissimus scripsi de amicitia.',
      content:
        'Hanc ego cum teneam sententiam, quid est cur verear, ne ad eam non possim accommodare Torquatos nostros? quos tu paulo ante cum memoriter, tum etiam erga nos amice et benivole collegisti, nec me tamen laudandis maioribus meis corrupisti nec segniorem ad respondendum reddidisti. Quorum facta quem ad modum, quaeso, interpretaris? sicine eos censes aut in armatum hostem impetum fecisse aut in liberos atque in sanguinem suum tam crudelis fuisse.',
      published: true,
      authorId: ottar.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Nemo Enim Ipsam Voluptatem',
      slug: generateSlug('Nemo Enim Ipsam Voluptatem'),
      intro:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.',
      content:
        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
      published: true,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Vel Illum Qui Dolorem Eum',
      slug: generateSlug('Vel Illum Qui Dolorem Eum'),
      intro:
        'Fugiat quo voluptas nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
      content:
        'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. Id est laborum et dolorum fuga et harum quidem rerum facilis est.',
      published: false,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Sed quia non numquam eius',
      slug: generateSlug('Sed quia non numquam eius'),
      intro:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.',
      content:
        'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
      published: true,
      authorId: kata.id,
    },
  });

  await prisma.news.create({
    data: {
      title: 'Dolorem Eum',
      slug: generateSlug('Dolorem Eum'),
      intro:
        'Fugiat quo voluptas nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
      content:
        'Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. Id est laborum et dolorum fuga et harum quidem rerum facilis est.',
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
