-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: final_exam
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `about` text NOT NULL,
  `image` text NOT NULL,
  `event_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Metallica concert','NEW YORK, NY, UNITED STATES','We’re honored to announce that we’ll be a part of this year’s Global Citizen Festival in New York’s Central Park as we take the stage to close out the show on Saturday, September 24. Since it began lighting up Central Park’s Great Lawn in 2012, the Global Citizen Festival has become the world’s longest-running music festival campaigning for an end to extreme poverty and demanding that world leaders take action. Joining us that night will be Charlie Puth, Jonas Brothers, MÅNESKIN, Mariah Carey, Mickey Guyton, and Rosalía, with Priyanka Chopra Jonas as the evening’s host.','https://i.scdn.co/image/ab6761610000e5eb8101d13bdd630b0889acd2fd','2022-09-24'),(2,'RHCP concert','Philadelphia, PA','Red Hot Chili Peppers are an American rock band formed in Los Angeles in 1983, comprising vocalist Anthony Kiedis, bassist Flea, drummer Chad Smith and guitarist John Frusciante. Their music incorporates elements of alternative rock, funk, punk rock, hard rock, hip hop, and psychedelic rock.','https://www.zmones.lt/photo/2056a9b9-94c0-11e8-9f90-aa000054c883/800x800/red-hot-chili-peppers-58296e5617e6a.jpg','2022-09-03'),(3,'Rammstein concert','Vilnius','Rammstein (German pronunciation: [ˈʁamʃtaɪn]) is a German industrial metal band, formed in 1994 in Berlin. Throughout its existence, Rammstein\'s six-man lineup has remained unchanged—lead guitarist Richard Z. Kruspe, bassist Oliver \"Ollie\" Riedel, drummer Christoph \"Doom\" Schneider, lead vocalist Till Lindemann, rhythm guitarist Paul H. Landers, and keyboardist Christian \"Flake\" Lorenz.\nThe band helped to found a subgenre within German hard rock and metal that became known as Neue Deutsche Härte. The majority of their songs are in German, but they have also performed songs entirely or partially in other languages including English, Spanish, French, and Russian. Rammstein\'s award-winning live shows are known for their pyrotechnic elements and both on and off-stage theatrics. Rammstein\'s entire catalogue is published by Universal Music Group.','https://www.lrt.lt/img/2020/03/27/627763-912205-756x425.jpg','2022-08-15'),(4,'Nausėda birthday party','Presidential Palace','test test test','https://www.lrt.lt/img/2022/08/18/1324730-901165-1287x836.jpg','2023-05-19'),(10,'Lithuania vs Slovenia','Germany','Join us for the first Lithuania basketball team match in FIBA 2022','https://www.fiba.basketball/api/img/graphic/ae821575-b51f-4540-9783-3eda303d39d9/1000/1000?mt=.jpg','2022-09-02');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-31  0:10:22
