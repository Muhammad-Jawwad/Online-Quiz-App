SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `attempted_questions` (
  `id` int(11) NOT NULL,
  `user_id` int(5) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_id` int(5) DEFAULT NULL,
  `entered_option` varchar(225) DEFAULT NULL,
  `answer` binary(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `attempted_questions` (`id`, `user_id`, `quiz_id`, `question_id`, `entered_option`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 'All of above', 0x31, '2023-03-14 13:25:58', '2023-03-14 13:25:58'),
(2, 1, 2, 2, 'Ethical Programming', 0x30, '2023-03-14 13:31:30', '2023-03-14 13:31:30'),
(3, 1, 2, 3, 'Both 1 and 2', 0x31, '2023-03-14 13:32:18', '2023-03-14 13:32:18'),
(4, 3, 2, 1, 'All of above', 0x31, '2023-03-14 13:37:21', '2023-03-14 13:37:21'),
(5, 3, 2, 3, 'Both 1 and ', 0x30, '2023-03-14 13:38:52', '2023-03-14 13:38:52'),
(6, 3, 2, 2, 'Competitive Programming', 0x30, '2023-03-14 13:39:18', '2023-03-14 13:39:18'),
(7, 7, 2, 3, 'Both 1 and 2', 0x31, '2023-03-14 14:43:37', '2023-03-14 14:43:37'),
(8, 7, 2, 1, 'Inhertence', 0x30, '2023-03-14 14:44:14', '2023-03-14 14:44:14'),
(9, 7, 2, 2, 'Object Oriented Programming', 0x31, '2023-03-14 14:44:51', '2023-03-14 14:44:51');


CREATE TABLE `attempted_quiz` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `attempted_quiz` (`id`, `user_id`, `quiz_id`, `score`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, '2023-03-14 13:35:22', '2023-03-14 13:35:22'),
(2, 3, 2, 3, '2023-03-14 13:39:43', '2023-03-14 13:39:43'),
(3, 7, 2, 2, '2023-03-14 14:44:56', '2023-03-14 14:44:56');


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `quiz_by_category` (`id`, `category_id`, `quiz_no`, `picture`, `quiz_name`, `no_of_questions`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Quiz 1', 'https://avatars.dicebear.com/api/identicon/The Scientific Method.svg', 'The Scientific Method', 15, 'Let\'s put your memory on our first topic to test.', NULL, '2022-11-25 17:23:54', '2022-11-25 17:23:54'),
(2, 2, 'Quiz 1', 'https://avatars.dicebear.com/api/identicon/Introduction To OOP.svg', 'Introduction To OOP', 10, 'Object Oriented Programming', NULL, '2022-11-25 17:25:42', '2022-11-25 17:25:42');


CREATE TABLE `quiz_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(225) DEFAULT NULL,
  `category_picture` varchar(225) DEFAULT NULL,
  `no_of_quiz` int(225) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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


CREATE TABLE `quiz_completed` (
  `id` int(5) NOT NULL,
  `user_id` int(5) DEFAULT NULL,
  `quiz_id` int(5) DEFAULT NULL,
  `quiz_status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `quiz_completed` (`id`, `user_id`, `quiz_id`, `quiz_status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, '2023-03-14 13:20:57', '2023-03-14 13:20:57'),
(2, 3, 2, 1, '2023-03-14 13:36:25', '2023-03-14 13:36:25'),
(3, 7, 2, 1, '2023-03-14 14:42:48', '2023-03-14 14:42:48');


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question`, `option_1`, `option_2`, `option_3`, `option_4`, `correct_option`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'What are the main classifications of OOP?', 'Inhertence', 'Polymorphism', 'Encapsulation', 'All of above', 'All of above', NULL, '2022-11-26 09:39:07', '2022-11-26 09:39:07'),
(2, 2, 'OOP stands for?', 'Object Oriented Programming', 'Competitive Programming', 'Ethical Programming', 'None of above', 'Object Oriented Programming', NULL, '2022-11-26 09:42:26', '2022-11-26 09:42:26'),
(3, 2, 'OOP based on?', 'Classes', 'Objects', 'Both 1 and 2', 'None of above', 'Both 1 and 2', NULL, '2022-11-26 09:43:25', '2022-11-26 09:43:25'),
(4, 1, 'Biology is a branch of?', 'Chemistry', 'Physics', 'Science', 'Mathematics', 'Science', NULL, '2022-11-26 10:09:29', '2022-11-26 10:09:29'),
(5, 1, 'Biology is a study of?', 'Non-Living things', 'Living things', 'Materials', 'Machines', 'Living things', NULL, '2022-11-26 10:09:29', '2022-11-26 10:09:29');


CREATE TABLE `register_table` (
  `id` int(11) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `email_id` varchar(225) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `mobile_number` int(20) DEFAULT NULL,
  `profile_picture` varchar(225) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


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

ALTER TABLE `attempted_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `attempted_quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

ALTER TABLE `quiz_by_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `quiz_categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `quiz_completed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

ALTER TABLE `register_table`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `attempted_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `attempted_quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `quiz_by_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `quiz_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `quiz_completed`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `register_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;


ALTER TABLE `attempted_questions`
  ADD CONSTRAINT `attempted_questions_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`),
  ADD CONSTRAINT `attempted_questions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`);


ALTER TABLE `attempted_quiz`
  ADD CONSTRAINT `attempted_quiz_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`),
  ADD CONSTRAINT `attempted_quiz_ibfk_3` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);


ALTER TABLE `quiz_by_category`
  ADD CONSTRAINT `quiz_by_category_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `quiz_categories` (`id`);


ALTER TABLE `quiz_completed`
  ADD CONSTRAINT `quiz_completed_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `register_table` (`id`),
  ADD CONSTRAINT `quiz_completed_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);


ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz_by_category` (`id`);
COMMIT;
