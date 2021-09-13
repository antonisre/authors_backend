CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `published` int DEFAULT NULL,
  `authorId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`title`,`authorId`),
  KEY `authorId` (`authorId`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

