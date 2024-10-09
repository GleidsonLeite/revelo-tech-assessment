import { seedDatabase } from './seed/seeder'

seedDatabase().catch((error) => {
  console.error(error)
  process.exit(1)
})
