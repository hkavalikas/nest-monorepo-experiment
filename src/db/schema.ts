import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
} from 'drizzle-orm';

// Example user table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define types for users table
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Example relations
export const usersRelations = relations(users, () => ({
  // Add relations here when needed
  // Example: posts: many(posts, { fields: [users.id], references: [posts.userId] })
}));

// Export all tables for migrations
export default { users };
