-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2024 at 12:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shadow_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `email` varchar(3072) NOT NULL,
  `username` longtext NOT NULL,
  `avatar` longtext NOT NULL,
  `suspended_status` tinyint(1) NOT NULL,
  `role` tinyint(1) NOT NULL,
  `gacha_count` bigint(20) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`email`, `username`, `avatar`, `suspended_status`, `role`, `gacha_count`, `create_at`, `update_at`) VALUES
('foxteary@gmail.com', 'Nutsang', 'n.png', 0, 0, 0, '2024-02-26 04:17:57', '2024-02-26 04:17:57');

-- --------------------------------------------------------

--
-- Table structure for table `auction_product`
--

CREATE TABLE `auction_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `default_price` double NOT NULL,
  `default_bid` double NOT NULL,
  `auction_status` tinyint(1) NOT NULL,
  `start_time` datetime NOT NULL DEFAULT current_timestamp(),
  `end_time` datetime NOT NULL DEFAULT current_timestamp(),
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `latest_bidder` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `uuid` varchar(3072) NOT NULL,
  `information` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `email` varchar(3072) NOT NULL,
  `cash_amount` double NOT NULL,
  `aysel_amount` double NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `finance`
--

INSERT INTO `finance` (`email`, `cash_amount`, `aysel_amount`, `create_at`, `update_at`) VALUES
('foxteary@gmail.com', 0, 0, '2024-02-26 04:17:57', '2024-02-26 04:17:57');

-- --------------------------------------------------------

--
-- Table structure for table `gacha_product`
--

CREATE TABLE `gacha_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `chance` double NOT NULL,
  `guarantee_status` tinyint(1) NOT NULL,
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game_name`
--

CREATE TABLE `game_name` (
  `uuid` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `general_product`
--

CREATE TABLE `general_product` (
  `uuid` varchar(3072) NOT NULL,
  `product_id` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `name` longtext NOT NULL,
  `normal_price` double NOT NULL,
  `special_price` double NOT NULL,
  `special_price_status` tinyint(1) NOT NULL,
  `information` longtext NOT NULL,
  `description` longtext NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_payment`
--

CREATE TABLE `history_payment` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `aysel_amount` double NOT NULL,
  `cash_amount` double NOT NULL,
  `payment_status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_product`
--

CREATE TABLE `history_product` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `product_name` longtext NOT NULL,
  `product_price` double NOT NULL,
  `buy_method` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `uuid` varchar(3072) NOT NULL,
  `method` longtext NOT NULL,
  `information` longtext NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`uuid`, `method`, `information`, `create_at`, `update_at`) VALUES
('68fdb45f-e504-48ef-9c58-ba6ed8cc5fc6', 'วิดีโอ', 'https://youtu.be/6eEAHM00IOE?si=OA9aJ9JERS1hDNQW', '2024-02-16 01:39:17', '0000-00-00 00:00:00'),
('b867eb39-bb8a-47de-adb7-1e9ba4c901a4', 'รูปภาพ', 'd9bdb4de-fb90-4581-871e-99ef3b243f291708023383179988636152.png', '2024-02-16 01:38:20', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `store_product`
--

CREATE TABLE `store_product` (
  `uuid` varchar(3072) NOT NULL,
  `email` varchar(3072) NOT NULL,
  `method_uuid` varchar(3072) NOT NULL,
  `game_name` longtext NOT NULL,
  `product_name` longtext NOT NULL,
  `used_status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=tis620 COLLATE=tis620_thai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `auction_product`
--
ALTER TABLE `auction_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `gacha_product`
--
ALTER TABLE `gacha_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `game_name`
--
ALTER TABLE `game_name`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `game_name` (`game_name`) USING HASH;

--
-- Indexes for table `general_product`
--
ALTER TABLE `general_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `history_payment`
--
ALTER TABLE `history_payment`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `history_product`
--
ALTER TABLE `history_product`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `store_product`
--
ALTER TABLE `store_product`
  ADD PRIMARY KEY (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
