import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const articles = [
    {
      sourceId: 'seed-article-1',
      title: 'James Webb Space Telescope Captures Stunning Images of Distant Galaxy',
      summary: 'The James Webb Space Telescope has revealed unprecedented details of a galaxy that formed just 400 million years after the Big Bang, providing insights into the early universe.',
      url: 'https://www.nasa.gov/webb',
      imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
      publishedAt: new Date('2024-09-15'),
      tags: ['James Webb', 'Deep Space', 'Galaxies'],
    },
    {
      sourceId: 'seed-article-2',
      title: 'Perseverance Rover Discovers Organic Molecules on Mars',
      summary: 'NASA\'s Perseverance rover has detected organic molecules in rock samples from Mars\' Jezero Crater, providing compelling evidence of past microbial life on the Red Planet.',
      url: 'https://www.nasa.gov/perseverance',
      imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800',
      publishedAt: new Date('2024-08-22'),
      tags: ['Mars', 'Perseverance', 'Astrobiology'],
    },
    {
      sourceId: 'seed-article-3',
      title: 'Europa Clipper Mission Preparing for Launch to Jupiter\'s Icy Moon',
      summary: 'NASA\'s Europa Clipper spacecraft is in final preparations for its mission to study Jupiter\'s moon Europa and its subsurface ocean, which may harbor conditions suitable for life.',
      url: 'https://www.nasa.gov/europa-clipper',
      imageUrl: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800',
      publishedAt: new Date('2024-09-01'),
      tags: ['Europa', 'Jupiter', 'Ocean Worlds'],
    },
  ]

  for (const article of articles) {
    await prisma.article.upsert({
      where: { sourceId: article.sourceId },
      update: article,
      create: article,
    })
  }

  console.log(`✓ Seeded ${articles.length} articles`)

  console.log('✓ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
