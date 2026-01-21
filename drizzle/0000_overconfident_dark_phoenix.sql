CREATE TABLE `monthly_snapshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`period_start_date` date NOT NULL,
	`start_snapshot_amount` decimal(20,2) NOT NULL DEFAULT '0',
	`end_snapshot_amount` decimal(20,2),
	CONSTRAINT `monthly_snapshots_id` PRIMARY KEY(`id`),
	CONSTRAINT `monthly_snapshots_user_id_period_start_date_unique` UNIQUE(`user_id`,`period_start_date`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`current_lifetime_wager` decimal(20,2) NOT NULL DEFAULT '0',
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `monthly_snapshots` ADD CONSTRAINT `monthly_snapshots_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;