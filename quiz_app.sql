-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 11:22 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `attempted_questions`
--

CREATE TABLE `attempted_questions` (
  `id` int(11) NOT NULL,
  `user_id` int(5) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_id` int(5) DEFAULT NULL,
  `entered_option` varchar(225) DEFAULT NULL,
  `answer` binary(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `attempted_quiz`
--

CREATE TABLE `attempted_quiz` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_by_category`
--

CREATE TABLE `quiz_by_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `quiz_no` varchar(225) DEFAULT NULL,
  `picture` varchar(225) DEFAULT NULL,
  `quiz_name` varchar(225) DEFAULT NULL,
  `no_of_questions` int(225) DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  `status` binary(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_by_category`
--

INSERT INTO `quiz_by_category` (`id`, `category_id`, `quiz_no`, `picture`, `quiz_name`, `no_of_questions`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Quiz 1', 'https://avatars.dicebear.com/api/identicon/The Scientific Method.svg', 'The Scientific Method', 15, 'Let\'s put your memory on our first topic to test.', NULL, '2022-11-25 17:23:54', '2022-11-25 17:23:54'),
(2, 2, 'Quiz 1', 'https://avatars.dicebear.com/api/identicon/Introduction To OOP.svg', 'Introduction To OOP', 10, 'Object Oriented Programming', NULL, '2022-11-25 17:25:42', '2022-11-25 17:25:42');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_categories`
--

CREATE TABLE `quiz_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(225) DEFAULT NULL,
  `category_picture` varchar(225) DEFAULT NULL,
  `no_of_quiz` int(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_categories`
--

INSERT INTO `quiz_categories` (`id`, `category_name`, `category_picture`, `no_of_quiz`, `created_at`, `updated_at`) VALUES
(1, 'Biology & Scientific Method', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_doctors_7fdn%20(1).svg', 15, '2022-11-21 09:00:12', '2022-11-21 09:00:12'),
(2, 'Java Basics OOPs Concept', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_programmer_re_owql.svg', 10, '2022-11-21 09:02:08', '2022-11-21 09:02:08'),
(3, 'Investment and Types', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_business_plan_re_0v81.svg', 10, '2022-11-21 09:03:18', '2022-11-21 09:03:18'),
(4, 'Art and Painting Basic', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_making_art_re_ee8w.svg', 10, '2022-11-21 09:04:45', '2022-11-21 09:04:45'),
(5, 'Communication Basic', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_vr_chat_re_s80u.svg', 10, '2022-11-21 09:05:50', '2022-11-21 09:05:50'),
(6, 'Geography Basics', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_environmental_study_re_q4q8.svg', 5, '2022-11-21 09:07:34', '2022-11-21 09:07:34'),
(7, 'Geography Basics', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_environmental_study_re_q4q8.svg', 5, '2022-11-25 08:23:00', '2022-11-25 08:23:00'),
(8, 'Zeography Basics', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_environmental_study_re_q4q8.svg', 9, '2022-11-25 17:20:39', '2022-11-25 17:20:39'),
(9, 'Biography Basics', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_environmental_study_re_q4q8.svg', 20, '2022-11-27 12:35:39', '2022-11-27 12:35:39'),
(10, 'General Knowledge', 'file:///C:/Users/Muhammad%20Jawwad/Downloads/undraw_doctors_7fdn%20(1).svg', 7, '2022-12-18 17:16:35', '2022-12-18 17:16:35');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_completed`
--

CREATE TABLE `quiz_completed` (
  `id` int(5) NOT NULL,
  `user_id` int(5) DEFAULT NULL,
  `quiz_id` int(5) DEFAULT NULL,
  `quiz_status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_completed`
--

INSERT INTO `quiz_completed` (`id`, `user_id`, `quiz_id`, `quiz_status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, '2023-02-25 11:57:00', '2023-02-25 11:57:00'),
(2, 1, 2, 0, '2023-02-25 12:06:06', '2023-02-25 12:06:06'),
(3, 1, 2, 0, '2023-02-25 12:06:09', '2023-02-25 12:06:09'),
(4, 1, 2, 0, '2023-02-25 12:06:10', '2023-02-25 12:06:10'),
(5, 1, 2, 0, '2023-02-25 12:06:12', '2023-02-25 12:06:12'),
(6, 1, 2, 0, '2023-02-25 12:06:13', '2023-02-25 12:06:13'),
(7, 1, 2, 0, '2023-02-25 12:06:14', '2023-02-25 12:06:14'),
(8, 1, 2, 0, '2023-02-25 12:06:14', '2023-02-25 12:06:14'),
(9, 1, 2, 0, '2023-02-25 12:06:15', '2023-02-25 12:06:15'),
(10, 1, 2, 0, '2023-02-25 12:06:16', '2023-02-25 12:06:16'),
(11, 1, 2, 0, '2023-02-25 12:06:17', '2023-02-25 12:06:17'),
(12, 1, 2, 0, '2023-02-25 12:06:18', '2023-02-25 12:06:18'),
(13, 1, 2, 0, '2023-02-25 12:06:19', '2023-02-25 12:06:19'),
(14, 1, 2, 0, '2023-02-25 12:06:19', '2023-02-25 12:06:19'),
(15, 6, 2, 1, '2023-02-25 12:06:26', '2023-02-25 12:06:26'),
(16, 6, 2, 1, '2023-02-25 12:06:28', '2023-02-25 12:06:28'),
(17, 6, 2, 1, '2023-02-25 12:06:28', '2023-02-25 12:06:28'),
(18, 6, 2, 1, '2023-02-25 12:06:29', '2023-02-25 12:06:29'),
(19, 6, 2, 1, '2023-02-25 12:06:30', '2023-02-25 12:06:30');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `quiz_id` int(5) DEFAULT NULL,
  `question` varchar(225) DEFAULT NULL,
  `option_1` varchar(225) DEFAULT NULL,
  `option_2` varchar(225) DEFAULT NULL,
  `option_3` varchar(225) DEFAULT NULL,
  `option_4` varchar(225) DEFAULT NULL,
  `correct_option` varchar(225) DEFAULT NULL,
  `status` binary(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_option`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'What are the main classifications of OOP?', 'Inhertence', 'Polymorphism', 'Encapsulation', 'All of above', 'All of above', NULL, '2022-11-26 09:39:07', '2022-11-26 09:39:07'),
(2, 2, 'OOP stands for?', 'Object Oriented Programming', 'Competitive Programming', 'Ethical Programming', 'None of above', 'Object Oriented Programming', NULL, '2022-11-26 09:42:26', '2022-11-26 09:42:26'),
(3, 2, 'OOP based on?', 'Classes', 'Objects', 'Both 1 and 2', 'None of above', 'Both 1 and 2', NULL, '2022-11-26 09:43:25', '2022-11-26 09:43:25'),
(4, 1, 'Biology is a branch of?', 'Chemistry', 'Physics', 'Science', 'Mathematics', 'Science', NULL, '2022-11-26 10:09:29', '2022-11-26 10:09:29'),
(5, 1, 'Biology is a study of?', 'Non-Living things', 'Living things', 'Materials', 'Machines', 'Living things', NULL, '2022-11-26 10:09:29', '2022-11-26 10:09:29');

-- --------------------------------------------------------

--
-- Table structure for table `register_table`
--

CREATE TABLE `register_table` (
  `id` int(11) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `email_id` varchar(225) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `mobile_number` int(20) DEFAULT NULL,
  `profile_picture` varchar(225) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `register_table`
--

INSERT INTO `register_table` (`id`, `name`, `email_id`, `password`, `mobile_number`, `profile_picture`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Jawwad', 'mjawwad110@gmail.com', '$2b$10$kizMW4u3H/.ETWXvCLBXwOTtjE3xA1JKdEwQ3AaDQgOYN8mGzd47O', 399900099, 'https://avatars.dicebear.com/api/identicon/MuhammadJawwad.svg', '2022-11-21 04:52:30', '2022-11-21 04:52:30'),
(2, 'Muhammad Ali Hasnain', 'hasnainali747@gmail.com', '$2b$10$g/C3CBbMoYldqQYQYw45KODKFc.0lZoZ2ou7KDLBIPaeOmueAVe/i', 2147483647, 'https://avatars.dicebear.com/api/identicon/MuhammadAliHasnain.svg', '2022-11-21 05:08:04', '2022-11-21 05:08:04'),
(3, 'Abbas Raza', 'razaabbas7@gmail.com', '$2b$10$f3inj3OjQ9hRdPfEfqQEeeVDc/0p8N7hzN.DcM2PWDVTOhGwNvJ.G', 300540098, 'https://avatars.dicebear.com/api/identicon/Abbas Raza.svg', '2022-11-21 09:46:34', '2022-11-21 09:46:34'),
(4, 'Zayab Naqvi', 'zaryabNaqvi110@gmail.com', '$2b$10$tjaehPDhMsHSLOzf6BHX0uhvpFq.1jrdQexMzTf51FIpeqqu/jemq', 300500098, 'https://avatars.dicebear.com/api/identicon/Zayab Naqvi.svg', '2022-11-25 16:55:14', '2022-11-25 16:55:14'),
(6, 'Haider Naqvi', 'haiderNaqvi110@gmail.com', '$2b$10$i60rvxp.gNMf1e6ekrdcquWIRlLf145mRDPGnUoHQL9FyumLrkgCC', 311100098, 'https://avatars.dicebear.com/api/identicon/Haider Naqvi.svg', '2022-11-25 17:17:23', '2022-11-25 17:17:23'),
(7, 'Ali Naqvi', 'aliNaqvi110@gmail.com', '$2b$10$FhdiQDR.qXd4v7ug9tfnbudpFw13tQTrq55hp521YJA/WXXBLAfS2', 399900098, 'https://avatars.dicebear.com/api/identicon/AliNaqvi.svg', '2022-11-27 12:31:09', '2022-11-27 12:31:09'),
(8, 'Ali Naqvi', 'aliNaqvi110@gmail.com', '$2b$10$TJJRBfOVva0KTWGpvLvlZuyGa1uQdjvvgiYvXf.rZbvQEFi6akuN6', 399900098, 'https://avatars.dicebear.com/api/identicon/AliNaqvi.svg', '2022-12-10 10:06:49', '2022-12-10 10:06:49'),
(9, 'Aliyan', 'aliyan@gmail.com', '$2b$10$hFwIqgoJ3a.CvAlu12CdAeKqwhojkwFaNdWRuzB8ppYWcX1bWEHBu', 2147483647, 'https://avatars.dicebear.com/api/identicon/Aliyan.svg', '2022-12-18 16:32:19', '2022-12-18 16:32:19'),
(10, 'Sajdain', 'sajdaini@gmail.com', '$2b$10$7H8vwrFCHADEQmKKsakyE.s6XcsPS5MlMOJglKSBl5pUX7w4znzKa', 2147483647, 'https://avatars.dicebear.com/api/identicon/Sajdain.svg', '2022-12-18 18:28:23', '2022-12-18 18:28:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attempted_questions`
--
ALTER TABLE `attempted_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `attempted_quiz`
--
ALTER TABLE `attempted_quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `quiz_by_category`
--
ALTER TABLE `quiz_by_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `quiz_categories`
--
ALTER TABLE `quiz_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_completed`
--
ALTER TABLE `quiz_completed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `register_table`
--
ALTER TABLE `register_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attempted_questions`
--
ALTER TABLE `attempted_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attempted_quiz`
--
ALTER TABLE `attempted_quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_by_category`
--
ALTER TABLE `quiz_by_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quiz_categories`
--
ALTER TABLE `quiz_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quiz_completed`
--
ALTER TABLE `quiz_completed`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `register_table`
--
ALTER TABLE `register_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attempted_questions`
--
ALTER TABLE `attempted_questions`
  ADD CONSTRAINT `attempted_questions_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`),
  ADD CONSTRAINT `attempted_questions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`);

--
-- Constraints for table `attempted_quiz`
--
ALTER TABLE `attempted_quiz`
  ADD CONSTRAINT `attempted_quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`),
  ADD CONSTRAINT `attempted_quiz_ibfk_3` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);

--
-- Constraints for table `quiz_by_category`
--
ALTER TABLE `quiz_by_category`
  ADD CONSTRAINT `quiz_by_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `quiz_categories` (`id`);

--
-- Constraints for table `quiz_completed`
--
ALTER TABLE `quiz_completed`
  ADD CONSTRAINT `quiz_completed_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`),
  ADD CONSTRAINT `quiz_completed_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
