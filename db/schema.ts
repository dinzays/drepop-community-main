import { date, decimal, int, mysqlTable, unique, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  current_lifetime_wager: decimal('current_lifetime_wager', { precision: 20, scale: 2 }).default('0').notNull(),
});

export const monthlySnapshots = mysqlTable('monthly_snapshots', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').references(() => users.id).notNull(),
  periodStartDate: date('period_start_date', { mode: 'date' }).notNull(),
  startSnapshotAmount: decimal('start_snapshot_amount', { precision: 20, scale: 2 }).default('0').notNull(),
  endSnapshotAmount: decimal('end_snapshot_amount', { precision: 20, scale: 2 }),
}, (t) => ({
  uniqueUserPeriod: unique().on(t.userId, t.periodStartDate),
}));