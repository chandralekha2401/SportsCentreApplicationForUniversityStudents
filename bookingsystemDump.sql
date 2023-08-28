-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: bookingsystem
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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` bigint NOT NULL AUTO_INCREMENT,
  `course_desc` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `course_price` int DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (32,'Mental Health Class','Yoga',10,'Instructor','2023-08-25 16:34:23',NULL,NULL),(33,'Dance Workout class','Zumba',20,'Instructor','2023-08-25 16:34:47',NULL,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_instructor_mapping`
--

DROP TABLE IF EXISTS `course_instructor_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_instructor_mapping` (
  `cim_id` bigint NOT NULL AUTO_INCREMENT,
  `class_date_time` datetime DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `effective_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updation_date` datetime DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `class_strength` bigint DEFAULT NULL,
  `venue_id` bigint DEFAULT NULL,
  `is_cancel` bit(1) DEFAULT NULL,
  PRIMARY KEY (`cim_id`),
  KEY `FK8q9ebh09cqevqo851mswo2rcq` (`course_id`),
  KEY `FK6i5ai8hurfn6cr1tu03c23epw` (`user_id`),
  CONSTRAINT `FK6i5ai8hurfn6cr1tu03c23epw` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK8q9ebh09cqevqo851mswo2rcq` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_instructor_mapping`
--

LOCK TABLES `course_instructor_mapping` WRITE;
/*!40000 ALTER TABLE `course_instructor_mapping` DISABLE KEYS */;
INSERT INTO `course_instructor_mapping` VALUES (52,'2023-08-28 10:00:00','Instructor','2023-08-25 16:35:16','2023-08-25 16:35:16','2023-08-28 10:00:00',NULL,NULL,32,15,15,1,_binary '\0'),(53,'2023-08-31 11:00:00','Instructor','2023-08-25 17:32:05','2023-08-25 17:32:05','2023-08-31 11:00:00',NULL,NULL,33,15,20,2,_binary '\0');
/*!40000 ALTER TABLE `course_instructor_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `management`
--

DROP TABLE IF EXISTS `management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `management` (
  `management_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  PRIMARY KEY (`management_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `university_id` (`university_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `management`
--

LOCK TABLES `management` WRITE;
/*!40000 ALTER TABLE `management` DISABLE KEYS */;
INSERT INTO `management` VALUES (3,'chandralekha2401@gmail.com',20060884),(4,'cveerath2401@gmail.com',20060885);
/*!40000 ALTER TABLE `management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `od_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `payment_amount` int DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `paymentstatus` varchar(255) DEFAULT NULL,
  `scm_id` bigint DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updation_date` datetime DEFAULT NULL,
  PRIMARY KEY (`od_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,NULL,'2023-08-25 17:04:02','2023-08-25 17:04:02',10,'8N207554G9419864S','Online','Paid',1,NULL,NULL),(2,NULL,'2023-08-25 17:35:36','2023-08-25 17:35:36',20,'09586328YS951782N','Online','Paid',2,NULL,NULL),(3,NULL,'2023-08-25 19:28:00','2023-08-25 19:28:00',20,'6NF44171623834523','Online','Paid',3,NULL,NULL),(4,NULL,'2023-08-27 15:47:50','2023-08-27 15:47:50',20,'9V0584583Y8661824','Online','Paid',4,NULL,NULL),(5,NULL,'2023-08-27 15:49:42','2023-08-27 15:49:42',20,'3LM43334BX862774R','Online','Paid',5,NULL,NULL);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_course_mapping`
--

DROP TABLE IF EXISTS `student_course_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_course_mapping` (
  `scm_id` bigint NOT NULL AUTO_INCREMENT,
  `booking_date` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `mark_attendence` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updation_date` datetime DEFAULT NULL,
  `cim_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `c_price` int DEFAULT NULL,
  `ins_name` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`scm_id`),
  KEY `FK8ihkpyjr556m88ujgc5xudk0` (`cim_id`),
  KEY `FKmyn73jvl2ekssg4ijx5sitsco` (`user_id`),
  CONSTRAINT `FK8ihkpyjr556m88ujgc5xudk0` FOREIGN KEY (`cim_id`) REFERENCES `course_instructor_mapping` (`cim_id`),
  CONSTRAINT `FKmyn73jvl2ekssg4ijx5sitsco` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_course_mapping`
--

LOCK TABLES `student_course_mapping` WRITE;
/*!40000 ALTER TABLE `student_course_mapping` DISABLE KEYS */;
INSERT INTO `student_course_mapping` VALUES (1,'2023-08-28 10:00:00',NULL,'Lekha@24','2023-08-25 17:04:02','P',NULL,'Instructor','2023-08-25 17:57:07',52,14,10,'Instructor','Yoga');
/*!40000 ALTER TABLE `student_course_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `university_id` int DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `updation_date` datetime DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `role_id` (`university_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (14,NULL,'2023-08-25 16:22:29','chandralekha2401@gmail.com','$2a$10$3nvZXMJSe3Mmq2YOiVmEKO3JA24yDKerHLoKthdKmFgqvrR8IjFvi','S',20060884,NULL,NULL,'Lekha@24'),(15,NULL,'2023-08-25 16:33:47','cveerath2401@gmail.com','$2a$10$RJxJZjMMYkMVw5JDPeYSA.iflDRO0i6ZXPS8d5P7oVfEeQe./2BPi','I',20060885,NULL,NULL,'Instructor');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-27 19:59:56
