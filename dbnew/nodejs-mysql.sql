-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2023 at 06:41 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-mysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('5bZLxlPua6Gu986M_axGDbPgrpDg8W8R', 1672817643, '{\"cookie\":{\"originalMaxAge\":259200000,\"expires\":\"2023-01-04T07:19:52.732Z\",\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"user_id\":3,\"full_name\":\"Realyn Cea\",\"user_code\":5,\"username\":\"bataanbranch\",\"group_name\":\"Branch Head\",\"branch_code\":86,\"area_code\":1,\"district_code\":1,\"branch_location\":\"Balanga/Bataan\",\"session_name\":null}');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_area_list`
--

CREATE TABLE `tbl_area_list` (
  `area_code` int(11) NOT NULL,
  `area_location` varchar(255) DEFAULT NULL,
  `area_supervisor` varchar(255) DEFAULT NULL,
  `district_code` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_area_list`
--

INSERT INTO `tbl_area_list` (`area_code`, `area_location`, `area_supervisor`, `district_code`, `status`) VALUES
(1, 'Area 1', 'Josephine Julio', 1, 1),
(2, 'Area 2', 'Cecilia Ibarra', 1, 1),
(3, 'Area 1', 'Maricar Yacat', 2, 1),
(4, 'Area 2', 'Hyazel Cajipe', 2, 1),
(5, 'Area 1', 'Diana Rose Garbin', 3, 1),
(6, 'Area 2', 'Elsa Blanche', 3, 1),
(7, 'Area 1', 'Minerva Piga', 4, 1),
(8, 'Area 2', 'Imelda Estipona', 4, 1),
(9, 'Area 1', 'Kayneth Joy Vigare', 5, 1),
(10, 'Area 2', 'Jocelyn Dela Cruz', 5, 1),
(11, 'Area 1', 'Marcelito Selda', 6, 1),
(12, 'Area 2', 'Armida Jatap', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_branch_list`
--

CREATE TABLE `tbl_branch_list` (
  `branch_code` int(11) NOT NULL,
  `area_code` int(11) DEFAULT NULL,
  `branch_location` varchar(255) DEFAULT NULL,
  `branch_head` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_branch_list`
--

INSERT INTO `tbl_branch_list` (`branch_code`, `area_code`, `branch_location`, `branch_head`, `status`) VALUES
(1, 12, 'Alabang', 'Lucia Galanto', 1),
(2, 5, 'Angono', 'Geraldine Maravilla', 1),
(3, 1, 'Apalit', 'Irish Torres', 1),
(4, 10, 'Baclaran', 'Ronio Arcilla', 1),
(5, 3, 'Bagong Silang', 'Rochelle Fuster', 1),
(6, 3, 'Bagumbong', 'John Roland Callardo', 1),
(7, 2, 'Balagtas', 'Jennylyn Lumantao', 1),
(8, 1, 'Baliuag', 'John Kelvin Galicia', 1),
(9, 11, 'Batangas City', 'Geraldine Aviles', 1),
(10, 11, 'Bauan', 'Bonifacio Hufana', 1),
(11, 9, 'Bicutan', 'Emanie Magpili', 1),
(12, 12, 'Binan', 'Khriselle Cruz', 0),
(13, 5, 'Binangonan', 'Benjie Uy', 1),
(14, 7, 'Blumentritt', 'April Baluyot', 1),
(15, 1, 'Cabanatuan', 'Challenae Astrera', 1),
(16, 12, 'Cabuyao', 'Annaliza Balnaja', 1),
(17, 5, 'Cainta', 'Apple Grace Martinez', 1),
(18, 11, 'Calamba', 'Lerma Magundayao', 1),
(19, 3, 'Camarin', 'Rea Pascaran', 1),
(20, 11, 'Candelaria', 'Ma. Fatima Yamo', 1),
(21, 11, 'Canlubang', 'Christian Rodelas', 0),
(22, 10, 'Rosario Cavite', 'Rosalyn Rico', 1),
(23, 5, 'Cogeo', 'Jossafel Manalo', 1),
(24, 4, 'Commonwealth', 'Hobert Santiago', 1),
(25, 6, 'Concepcion ', 'Jeffrey Pizzaro', 1),
(26, 8, 'Cubao', 'Miracle Herbolario', 1),
(27, 10, 'Dasmarinas', 'Dasmarinas', 1),
(28, 1, 'Dau', 'Pamela Baroy', 1),
(29, 3, 'Deparo', 'Rodolfo Talavera Jr.', 1),
(30, 7, 'Gagalangin', 'Aethrea Iris Tolentino', 1),
(31, 4, 'Gen T De Leon ', 'Jennifer Taruc', 1),
(32, 10, 'Imus', 'Sarah Punsalan', 1),
(33, 9, 'JP Rizal ', 'Jessie Vicencio', 1),
(34, 3, 'Kiko', 'Karen Angeles', 1),
(35, 3, 'Lagro', 'Mary Grace Tumala', 1),
(36, 10, 'Las Pinas', 'Insh Sorongon', 1),
(37, 11, 'Lipa', 'Maricar Oliquiano', 1),
(38, 4, 'Litex', 'Rodel Mogol', 1),
(39, 9, 'Guadalupe Makati', 'Mark Anthony Ebora', 1),
(40, 7, 'Malabon', 'Portia May Dela Cerna', 1),
(41, 3, 'Malaria', 'Marilou Fontanilla', 1),
(42, 2, 'Malolos', 'Jellie Enriquez', 1),
(43, 9, 'Boni Mandaluyong', 'Myra Duran', 1),
(44, 6, 'Marikina', 'Leah Licot', 1),
(45, 2, 'Marilao', 'Jomellie Apego', 1),
(46, 6, 'Masinag', 'Manuelito Etoc', 1),
(47, 2, 'Meycauayan ', 'Lady Rose Catral', 1),
(48, 6, 'Montalban', 'Liezel Villanueva', 1),
(49, 7, 'Monumento', 'Jan Bernadette Agasin', 1),
(50, 7, 'Munoz', 'Rosalinda Tanopo', 1),
(51, 2, 'Muzon', 'Judita Salut', 1),
(52, 7, 'Navotas', 'Abegalle Mate', 1),
(53, 4, 'Novaliches ', 'Joseph Valmores', 1),
(54, 1, 'Olongapo', 'Jane Beverly Corpuz', 1),
(55, 8, 'Paco', 'Mailyn Tagasa', 1),
(56, 10, 'Paliparan', 'Robin Lomibao', 1),
(57, 2, 'Pasodeblas', 'Carlo Angelo Ramos', 1),
(58, 6, 'Philcoa', 'Rodel Casareno', 1),
(59, 7, 'Pritill', 'Marilyn Obra', 1),
(60, 6, 'Project 4/Qmart', 'Rachelle Dalaodao', 1),
(61, 1, 'Pulilan', 'Tatiana Juanites', 1),
(62, 8, 'Punta', 'Angelo Dumapit', 1),
(63, 12, 'Putatan', 'Ailyn Belleza', 1),
(64, 5, 'Rosario Pasig', 'Aiko Del Castillo', 1),
(65, 8, 'Trabajo/Formerly Sampaloc', 'Rex Mark Reyes Santa Ana', 1),
(66, 10, 'San Dionision', 'Danica Labares', 1),
(67, 8, 'San Juan', 'Evangelica Policarpio', 1),
(68, 6, 'San Mateo ', 'Noel Borja', 1),
(69, 11, 'San Pablo', 'ERIKA JANE ATIENZA', 1),
(70, 12, 'San Pedro', 'Carol Bul-igen', 1),
(71, 4, 'Sangandaan', 'Kristine Mendez', 1),
(72, 2, 'Sapangpalay', 'Nathalie Gregorio', 1),
(73, 4, 'Sauyo', 'Charmaine Talite', 1),
(74, 9, 'Signal', 'Guia Reolalas', 1),
(75, 12, 'Silang', 'Rhea Gonzaga', 1),
(76, 2, 'Sta Maria', 'Haizelyn Benitez', 1),
(77, 8, 'Sta Mesa', 'Jennifer Espedillon', 1),
(78, 9, 'Taguig', 'Gilian Brin', 1),
(79, 11, 'Tanauan', 'Cerish Sosa', 1),
(80, 4, 'Tandang Sora', 'Sharon Miranda', 1),
(81, 10, 'Tanza', 'Sarah Jane Abricanan', 1),
(82, 5, 'Taytay', 'Garcia, Julius(porary BH)', 1),
(83, 7, 'Tinajeros', 'Rachelle Paura', 1),
(84, 3, 'Tungko', 'Boots Bajaro', 1),
(85, 10, 'Zapote', 'Oliver Villas', 1),
(86, 1, 'Balanga/Bataan', 'Realyn Cea', 1),
(87, 1, 'San Fernando', 'KRISSA GUIAO', 1),
(88, 4, 'Karuhatan', 'Chareena Nicole Vargas', 1),
(89, 5, 'Antipolo', 'Rocel Funchica', 1),
(90, 6, 'Parang Marikina', 'Joan Vergara', 1),
(91, 8, 'Quiapo', 'Princess Eunice Manarang', 1),
(92, 8, 'Araneta', 'Rosalie Valdez', 1),
(93, 8, 'Tranio', 'Rex Mark Sta. Ana', 1),
(94, 9, 'Lopez', 'Mary Joy Merillo', 1),
(95, 9, 'Malibay', 'Mary Crisfel Francisco', 1),
(96, 12, 'Sta. Rosa Laguna', 'Eralyn Andrade', 1),
(97, 12, 'Bulihan', 'Michelle Alberio', 1),
(98, 5, 'Rotonda Pasig', 'Lilet Mahinay', 1),
(99, 1, 'Angeles', 'Micah Buenaobra', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_district_list`
--

CREATE TABLE `tbl_district_list` (
  `district_code` int(11) NOT NULL,
  `district_location` varchar(255) DEFAULT NULL,
  `district_manager` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_district_list`
--

INSERT INTO `tbl_district_list` (`district_code`, `district_location`, `district_manager`, `status`) VALUES
(1, 'District 1', 'Helen Actub', 1),
(2, 'District 2', 'Vanessa Belangoy', 1),
(3, 'District 3', 'Ely Joy Conde', 1),
(4, 'District 4', 'Josefina Evangelista', 1),
(5, 'District 5', 'Edgardo Rivera', 1),
(6, 'District 6', 'Anweda Enoy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_receiver_list`
--

CREATE TABLE `tbl_receiver_list` (
  `id` int(11) NOT NULL,
  `approver_code` varchar(255) DEFAULT NULL,
  `folder_type` varchar(255) DEFAULT NULL,
  `line_no` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_receiver_list`
--

INSERT INTO `tbl_receiver_list` (`id`, `approver_code`, `folder_type`, `line_no`, `position`, `image`, `status`) VALUES
(1, '4', '1', 1, 1, 'sana.jpg', 1),
(2, '3', '1', 1, 2, 'sena.jpg', 1),
(3, '10', '1', 1, 3, 'miu.jpg', 1),
(4, '7', '1', 1, 4, 'asuna.jpg', 1),
(5, '12', '1', 1, 5, 'makuro.jpg', 1),
(6, '9', '1', 1, 6, 'uryu.jpg', 1),
(7, '8', '1', 1, 7, 'lelouch.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_request_folder`
--

CREATE TABLE `tbl_request_folder` (
  `id` int(11) NOT NULL,
  `request_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `approver_code` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `district_code` int(11) DEFAULT NULL,
  `area_code` int(11) DEFAULT NULL,
  `branch_requested` int(11) DEFAULT NULL,
  `date_requested` varchar(255) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `dsb_no` varchar(255) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `pension_type` varchar(255) DEFAULT NULL,
  `loan_term` varchar(255) DEFAULT NULL,
  `outstanding_balance` varchar(255) DEFAULT NULL,
  `last_payment_date` varchar(255) DEFAULT NULL,
  `sss_no` varchar(255) DEFAULT NULL,
  `account_type` varchar(255) DEFAULT NULL,
  `nco_borrower` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `dec_borrower_1` varchar(255) DEFAULT NULL,
  `dec_borrower_2` varchar(255) DEFAULT NULL,
  `other_than_dec` varchar(255) DEFAULT NULL,
  `other_than_dec_1` varchar(255) DEFAULT NULL,
  `other_than_dec_2` varchar(255) DEFAULT NULL,
  `other_than_dec_3` varchar(255) DEFAULT NULL,
  `other_than_dec_4` varchar(255) DEFAULT NULL,
  `other_than_dec_5` varchar(255) DEFAULT NULL,
  `co_borrower_1` varchar(255) DEFAULT NULL,
  `co_borrower_2` varchar(255) DEFAULT NULL,
  `co_borrower_3` varchar(255) DEFAULT NULL,
  `co_borrower_4` varchar(255) DEFAULT NULL,
  `secondary_option_1` varchar(255) DEFAULT NULL,
  `secondary_option_2` varchar(255) DEFAULT NULL,
  `secondary_option_3` varchar(255) DEFAULT NULL,
  `secondary_option_4` varchar(255) DEFAULT NULL,
  `branch_remarks` varchar(255) DEFAULT NULL,
  `requested_by` varchar(255) DEFAULT NULL,
  `review_by` varchar(255) DEFAULT 'Not yet available',
  `approval_date` varchar(255) DEFAULT 'Not yet available',
  `approver_remarks` varchar(255) DEFAULT NULL,
  `approver_id` int(11) DEFAULT NULL,
  `reject_remarks` varchar(255) DEFAULT NULL,
  `reject_id` int(11) DEFAULT NULL,
  `notification_status` int(11) NOT NULL DEFAULT 1,
  `notifications_branch` int(11) DEFAULT 1,
  `folder_status` int(11) DEFAULT 1,
  `percentage` int(11) DEFAULT 0,
  `final_percentage` int(11) DEFAULT 100,
  `request_status` varchar(255) DEFAULT 'Pending',
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_request_folder`
--

INSERT INTO `tbl_request_folder` (`id`, `request_id`, `user_id`, `full_name`, `approver_code`, `position`, `district_code`, `area_code`, `branch_requested`, `date_requested`, `client_name`, `dsb_no`, `age`, `pension_type`, `loan_term`, `outstanding_balance`, `last_payment_date`, `sss_no`, `account_type`, `nco_borrower`, `bank_name`, `dec_borrower_1`, `dec_borrower_2`, `other_than_dec`, `other_than_dec_1`, `other_than_dec_2`, `other_than_dec_3`, `other_than_dec_4`, `other_than_dec_5`, `co_borrower_1`, `co_borrower_2`, `co_borrower_3`, `co_borrower_4`, `secondary_option_1`, `secondary_option_2`, `secondary_option_3`, `secondary_option_4`, `branch_remarks`, `requested_by`, `review_by`, `approval_date`, `approver_remarks`, `approver_id`, `reject_remarks`, `reject_id`, `notification_status`, `notifications_branch`, `folder_status`, `percentage`, `final_percentage`, `request_status`, `status`) VALUES
(1, 'REQ344540', 3, 'Realyn Cea', 4, 1, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Josephine Julios', 'January 01, 2023', 'okay', 205, NULL, NULL, 1, 1, 1, 100, 100, 'Reviewed', 2),
(2, 'REQ344540', 3, 'Realyn Cea', 3, 2, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(3, 'REQ344540', 3, 'Realyn Cea', 10, 3, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(4, 'REQ344540', 3, 'Realyn Cea', 7, 4, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(5, 'REQ344540', 3, 'Realyn Cea', 9, 6, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(6, 'REQ344540', 3, 'Realyn Cea', 12, 5, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(7, 'REQ344540', 3, 'Realyn Cea', 8, 7, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '0', '0', '', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(8, 'REQ106523', 3, 'Realyn Cea', 4, 1, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Josephine Julios', 'January 01, 2023', 'okay', 205, NULL, NULL, 1, 1, 1, 100, 100, 'Reviewed', 2),
(9, 'REQ106523', 3, 'Realyn Cea', 3, 2, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(10, 'REQ106523', 3, 'Realyn Cea', 10, 3, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(11, 'REQ106523', 3, 'Realyn Cea', 8, 7, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(12, 'REQ106523', 3, 'Realyn Cea', 9, 6, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(13, 'REQ106523', 3, 'Realyn Cea', 12, 5, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(14, 'REQ106523', 3, 'Realyn Cea', 7, 4, 1, 1, 86, 'December 31, 2022', '', '', '', '', '', '', '', '', '', '', '', '1', '1', '', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Reviewed', 1),
(15, 'REQ939430', 3, 'Realyn Cea', 4, 1, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(16, 'REQ939430', 3, 'Realyn Cea', 3, 2, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(17, 'REQ939430', 3, 'Realyn Cea', 10, 3, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(18, 'REQ939430', 3, 'Realyn Cea', 7, 4, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(19, 'REQ939430', 3, 'Realyn Cea', 12, 5, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(20, 'REQ939430', 3, 'Realyn Cea', 9, 6, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1),
(21, 'REQ939430', 3, 'Realyn Cea', 8, 7, 1, 1, 86, 'January 01, 2023', '31231', '23123123', '123', '1231', '2312', '3123', '2023-01-01', '312', 'ATM', '31231', '23123123', '0', '1', '', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '', NULL, 'Not yet available', 'Not yet available', NULL, NULL, NULL, NULL, 1, 1, 1, 0, 100, 'Pending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usergroup`
--

CREATE TABLE `tbl_usergroup` (
  `user_code` int(11) NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_usergroup`
--

INSERT INTO `tbl_usergroup` (`user_code`, `group_name`, `status`) VALUES
(1, 'Admin', 1),
(2, 'Maintenance', 1),
(3, 'District Manager', 1),
(4, 'Area Supervisor', 1),
(5, 'Branch Head', 1),
(6, 'Rider', 1),
(7, 'Auditor Assistant', 1),
(8, 'Finance Manager', 1),
(9, 'Operations Manager', 1),
(10, 'Accounting Supervisor', 1),
(11, 'Accounting Report/Staff', 1),
(12, 'Auditor Head', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_session`
--

CREATE TABLE `tbl_user_session` (
  `user_session` int(11) NOT NULL,
  `session_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user_session`
--

INSERT INTO `tbl_user_session` (`user_session`, `session_name`) VALUES
(1, 'System Creator'),
(2, 'Head Office');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_write_sequence`
--

CREATE TABLE `tbl_write_sequence` (
  `id` int(11) NOT NULL,
  `request_id` varchar(255) DEFAULT NULL,
  `approver_code` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `approval_date` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_write_sequence`
--

INSERT INTO `tbl_write_sequence` (`id`, `request_id`, `approver_code`, `position`, `approval_date`, `status`) VALUES
(15, 'REQ504673', 4, 1, NULL, 1),
(16, 'REQ504673', 3, 2, NULL, 1),
(17, 'REQ504673', 10, 3, NULL, 1),
(18, 'REQ504673', 7, 4, NULL, 1),
(19, 'REQ504673', 12, 5, NULL, 1),
(20, 'REQ504673', 9, 6, NULL, 1),
(21, 'REQ504673', 8, 7, NULL, 1),
(23, 'REQ676287', 4, 1, NULL, 1),
(24, 'REQ716129', 4, 1, NULL, 1),
(25, 'REQ716129', 3, 2, NULL, 1),
(26, 'REQ716129', 10, 3, NULL, 1),
(27, 'REQ716129', 7, 4, NULL, 1),
(28, 'REQ716129', 12, 5, NULL, 1),
(29, 'REQ716129', 9, 6, NULL, 1),
(30, 'REQ716129', 8, 7, NULL, 1),
(31, 'REQ526469', 4, 1, NULL, 1),
(32, 'REQ526469', 3, 2, NULL, 1),
(33, 'REQ526469', 10, 3, NULL, 1),
(34, 'REQ526469', 7, 4, NULL, 1),
(35, 'REQ185508', 4, 1, NULL, 1),
(36, 'REQ910777', 4, 1, NULL, 1),
(41, 'REQ344540', 4, 1, NULL, 1),
(42, 'REQ106523', 4, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `user_code` int(11) DEFAULT NULL,
  `branch_code` int(11) DEFAULT NULL,
  `area_code` int(11) DEFAULT NULL,
  `district_code` int(11) DEFAULT NULL,
  `user_session` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `password`, `email`, `user_code`, `branch_code`, `area_code`, `district_code`, `user_session`, `status`) VALUES
(1, 'Oliver Dela Fuente', 'gunsterpsp', '123', 'riotblade71@gmail.com', 1, 0, 0, 0, 1, 1),
(2, 'Richmond The Moon', 'richmoon', '123', 'richmoondmoon@gmail.com', 1, 0, 0, 0, 1, 1),
(3, 'Realyn Cea', 'bataanbranch', '123', 'efbalanga2022@gmail.com', 5, 86, 1, 1, NULL, 1),
(4, 'Catherine Algabre ', 'sanfernandobranch', '123', 'sanfernando@everfirst.com', 5, 87, 1, 1, NULL, 1),
(5, 'Mary Grace Tadlas', 'daubranch', '123', 'tadlasmarygrace@gmail.com', 5, 28, 1, 1, NULL, 1),
(6, 'Lucia Galanto', 'alabang', '123', 'alabang@everfirst.com', 5, 1, 12, 6, NULL, 1),
(7, 'Micah Buenaobra', 'angelesbranch', '123', 'micahbuenaobra028@gmail.com', 5, 99, 1, 1, NULL, 1),
(8, 'Jane Beverly Corpuz ', 'janecorpuz', '12345', 'efolongapo2022@gmail.com', 5, 54, 1, 1, NULL, 1),
(9, 'Irish Torres', 'apalitbranch', '123', 'diannemuyo@gmail.com', 5, 3, 1, 1, NULL, 1),
(10, 'Challenae Astrera', 'cabanatuanbranch', '123', 'cabanatuan@everfirst.com', 5, 15, 1, 1, NULL, 1),
(11, 'John Kelvin Galicia', 'baliuagbranch', '123', 'galicia.john143@yahoo.com', 5, 8, 1, 1, NULL, 1),
(12, 'Tatiana Juanites', 'pulilanbranch', '123', 'tatiana.juanites@yahoo.com', 5, 61, 1, 1, NULL, 1),
(13, 'Jellie Enriquez', 'jellieenriquez', '123', 'bhesie0716@gmail.com', 5, 42, 2, 1, NULL, 1),
(14, 'Jennylyn Lumantao', 'balagtasbranch', '123', 'efbalagtas2022@gmail.com', 5, 7, 2, 1, NULL, 1),
(15, 'Haizelyn Benitez', 'stamariabranch', '123', 'ef_stamaria@everfirstloans.com', 5, 76, 2, 1, NULL, 1),
(16, 'Judita Salut', 'muzonbranch', '123', 'ef_muzon@everfirstloans.com', 5, 51, 2, 1, NULL, 1),
(17, 'Nathalie Gregorio', 'sapangpalaybranch', '123', 'gnutz101@yahoo.com', 5, 72, 2, 1, NULL, 1),
(18, 'Jomillie Apego', 'marilaobranch', '123', 'efmarilao2022@gmail.com', 5, 45, 2, 1, NULL, 1),
(19, 'Lady Rose Catral', 'meycauayanbranch', '123', 'ladyrosecastro@gmail.com', 5, 47, 2, 1, NULL, 1),
(20, 'Carlo Angelo Ramos', 'pasodeblasbranch', '123', 'ef_pasodeblas@gmail.com', 5, 57, 2, 1, NULL, 1),
(21, 'Rodolfo Talavera Jr,', 'deparobranch', '123', 'efdeparo2022@gmail.com', 5, 29, 3, 2, NULL, 1),
(22, 'John Roland Gallardo', 'bagumbongbranch', '123', 'efbagumbong2022@gmail.com', 5, 6, 3, 2, NULL, 1),
(23, 'Mary Grace Tumala', 'lagrobranch', '123', 'eflagro2022@gmail.com', 5, 35, 3, 2, NULL, 1),
(24, 'Boots Bajaro', 'tungkobranch', '123', 'bootsbajaro@gmail.com', 5, 84, 3, 2, NULL, 1),
(25, 'Marilou Fontanilla', 'malariabranch', '123', 'fontanillamarilou04@gmail.com', 5, 41, 3, 2, NULL, 1),
(26, 'Rochelle Fuster', 'bagongsilangbranch', '123', 'chelle.fuster@gmail.com', 5, 5, 3, 2, NULL, 1),
(27, 'Karen Angeles', 'kikobranch', '123', 'efkiko2022@gmail.com', 5, 34, 3, 2, NULL, 1),
(28, 'Rea Pascaran', 'camarinbranch', '123', 'pascaranrea@gmail.com', 5, 19, 3, 2, NULL, 1),
(29, 'Joseph Valmores', 'novalichesbranch', '123', 'jvalmores28@gmail.com', 5, 53, 4, 2, NULL, 1),
(30, 'Rodel Mogol', 'litexbranch', '123', 'litex@everfirst.com', 5, 38, 4, 2, NULL, 1),
(31, 'Hobert Santiago', 'commonwealthbranch', '123', 'santiago_hobert@yahoo.com', 5, 24, 4, 2, NULL, 1),
(32, 'Angelica Alonzo', 'sauyobranch', '123', 'efsauyo2022@gmail.com', 5, 73, 4, 2, NULL, 1),
(33, 'Sharon Miranda ', 'tandangsorabranch', '123', 'tandangsora@everfirst.com', 5, 80, 4, 2, NULL, 1),
(34, 'Kristine Mendez', 'sangandaanbranch', '123', 'sangandaan@everfirst.com', 5, 71, 4, 2, NULL, 1),
(35, 'Jennifer Taruc', 'gentdeleonbranch', '123', 'efgentdeleon2022@gmail.com', 5, 31, 4, 2, NULL, 1),
(36, 'Chareena Nicole Vargas', 'karuhatanbranch', '123', 'chareena.vargas@gmail.com', 5, 88, 4, 2, NULL, 1),
(37, 'Benjie Uy', 'binangonanbranch', '123', '25benjie@gmail.com', 5, 13, 5, 3, NULL, 1),
(38, 'Geraldine Maravilla ', 'angonobranch', '123', 'ef_angono@everfirstloans.com', 5, 2, 5, 3, NULL, 1),
(39, 'Rocel Funchica', 'antipolobranch', '12345', 'efantipolo2022@gmail.com', 5, 89, 5, 3, NULL, 1),
(40, 'Garcia, Julius', 'taytaybranch', '123', 'eftaytay@gmail.com', 5, 82, 5, 3, NULL, 1),
(41, 'Apple Grace Martirez', 'caintabranch', '123', 'applegracemartirez@gmail.com', 5, 17, 5, 3, NULL, 1),
(42, 'Aiko Del Castillo', 'rosariopasigbranch', '123', 'ef_rorsario@everfirstloans.com', 5, 64, 5, 3, NULL, 1),
(43, 'Liliet Mahinay', 'rotondapasigbranch', '123', 'rotondapasig@everfirst.com', 5, 98, 5, 3, NULL, 1),
(44, 'Jossafel Manalo', 'cogeobranch', '123', 'isaactorvic24@gmail.com', 5, 23, 5, 3, NULL, 1),
(45, 'Manuelito Etoc', 'masinagbranch', '123', 'leunam.etoc23@gmail.com', 5, 46, 6, 3, NULL, 1),
(46, 'Liezel Villanueva', 'montalbanbranch', '123', 'montalban@everfirst.com', 5, 48, 6, 3, NULL, 1),
(47, 'Noel Borja', 'sanmateobranch', '123', 'sanmateo@everfirst.com', 5, 68, 6, 3, NULL, 1),
(48, 'Joan Vergara', 'parangmarikinabranch', '123', 'efparang2022@gmail.com', 5, 90, 6, 3, NULL, 1),
(49, 'Jeffrey Pizzaro', 'concepcionbranch', '123', 'mailtoefconcepcion2022@gmail.com', 5, 25, 6, 3, NULL, 1),
(50, 'Leah Licot', 'marikinabranch', '123', 'leahlicot18@gmail.com', 5, 44, 6, 3, NULL, 1),
(51, 'Rachelle Dalaodalao', 'qmartbranch', '123', 'efproject42022@gmail.com', 5, 60, 6, 3, NULL, 1),
(52, 'Rodel Casareno', 'philcoabranch', '123', 'rodelcasareno@gmail.com', 5, 58, 6, 3, NULL, 1),
(53, 'Rosalinda Tanopo', 'rosalindatanopo', '12345', 'ef_munoz@everfirstloans.com', 5, 50, 7, 4, NULL, 1),
(54, 'Jan Bernadette Agasin', 'monumento', 'monumento', 'efmonumento2022@gmail.com', 5, 49, 7, 4, NULL, 1),
(55, 'Rachelle Paura', 'tinajerosbranch', '123', 'eftinajeros2022@gmail.com', 5, 83, 7, 4, NULL, 1),
(56, 'Portia May Dela Cerna', 'malabonbranch', '123', 'portiadelacerna@gmail.com', 5, 40, 7, 4, NULL, 1),
(57, 'Ma. Abegail R. Mate', 'navotasbranch', '123', 'efnavotas2022@gmail.com', 5, 52, 7, 4, NULL, 1),
(58, 'Marilyn Obra', 'pritilbranch', '123', 'pritil@everfirst.com', 5, 59, 7, 4, NULL, 1),
(59, 'Irish Sorongon', 'laspinasbranch', '123', 'ef_laspinas@everfirstloans.com', 5, 36, 10, 5, NULL, 1),
(60, 'CERISH SOSA', 'calambabranch', '123', 'xeryosa@gmail.com', 5, 18, 11, 6, NULL, 1),
(61, 'Ailyn Belleza', 'putatanbranch', '123', 'efputatan2022@gmail.com', 5, 63, 12, 6, NULL, 1),
(62, 'Princess Eunice Manarang', 'quiapobranch', '123', 'efquiapo2022@gmail.com', 5, 91, 8, 4, NULL, 1),
(63, 'Mark Anthony Ebora', 'guadalupebranch', '123', 'mark.anthony.ebora123@gmail.com', 5, 39, 9, 5, NULL, 1),
(64, 'Aesthrea Iris Tolentino', 'gagalanginbranch', '123', 'ef_gagalangin@everfirstloans.com', 5, 30, 7, 4, NULL, 1),
(65, 'April Baluyot', 'blumentrittbranch', '123', 'blumentrittbranch.0510@gmail.com', 5, 14, 7, 4, NULL, 1),
(66, 'Rosalie Valdez', 'aranetabranch', '123', 'ef_banawe@everfirstloans.com', 5, 92, 8, 4, NULL, 1),
(67, 'Jennifer Espedillion', 'stamesabranch', '123', 'espedillonjennifer@gmail.com', 5, 77, 8, 4, NULL, 1),
(68, 'Evangelica Policarpio', 'sanjuanbranch', '123', 'efsanjuan21@gmail.com', 5, 67, 8, 4, NULL, 1),
(69, 'Mailyn Tagasa', 'pacobranch', '123', 'ef_paco@everfirstloans.com', 5, 55, 8, 4, NULL, 1),
(70, 'Rex Mark Sta. Ana', 'rexmark', '060', 'eftrabajo2022@gmail.com', 5, 65, 8, 4, NULL, 1),
(71, 'Gillian Brin', 'taguigbranch', '123', 'eftaguig2022@gmail.com', 5, 78, 9, 5, NULL, 1),
(72, 'Guia M. Reolalas', 'signalbranch', '123', 'efsignal2022@gmail.com', 5, 74, 9, 5, NULL, 1),
(73, 'Ernanie S. Magpili', 'bicutanbranch', '12345', 'magpili03@gmail.com', 5, 11, 9, 5, NULL, 1),
(74, 'Mary Joy Merilo', 'lopezbranch', '123', 'eflopezsucat2022@gmail.com', 5, 94, 9, 5, NULL, 1),
(75, 'Jessie S. Vicencio', 'jprizalbranch', '123', 'efjprizal2022@gmail.com', 5, 33, 9, 5, NULL, 1),
(76, 'Myra Duran ', 'bonibranch', '123', 'ef_mandaluyong@everfirstloans.com', 5, 43, 9, 5, NULL, 1),
(77, 'Mary Crisfel Francisco', 'marycrisfel', '123', 'marycrisfelfrancisco@gmail.com', 5, 95, 9, 5, NULL, 1),
(78, 'Ronnie Arcilla', 'baclaranbranch', '123', 'efbaclaran2022@gmail.com', 5, 4, 10, 5, NULL, 1),
(79, 'Oliver Villas', 'zapotebranch', '123', 'villasoliver0712@gmail.com', 5, 85, 10, 5, NULL, 1),
(80, 'Sarah Punzalan', 'imusbranch', '123', 'ef_imus@everfirstloans.com', 5, 32, 10, 5, NULL, 1),
(81, 'Rosario Aquino', 'dasmarinasbranch', '123', 'ef_dasmarinas@everfirstloans.com', 5, 27, 10, 5, NULL, 1),
(82, 'Robin Lomibao', 'paliparanbranch', '123', 'ef_paliparan@everfirstloans.com', 5, 56, 10, 5, NULL, 1),
(83, 'Sarah Jane Abricanan', 'sarahjane', '12345', 'eftanza2022@gmail.com', 5, 81, 10, 5, NULL, 1),
(84, 'Danica Labares', 'sandionisionbranch', '123', 'sandionision@everfirst.com', 5, 66, 10, 5, NULL, 1),
(85, 'Christian Rodelas', 'canlubangbranch', '123', 'efcanlubang2022@gmail.com', 5, 21, 11, 6, NULL, 1),
(86, 'Mariecris M. Capalos', 'tanauanbranch', '12345', 'makiz_20@yahoo.com', 5, 79, 11, 6, NULL, 1),
(87, 'Maricar Oliquiano', 'lipabranch', '123', 'ef_lipa@everfirstloans.com', 5, 37, 11, 6, NULL, 1),
(88, 'Geraldine Aviles', 'geraldineaviles', '123', 'efbatangas2022@gmail.com', 5, 9, 11, 6, NULL, 1),
(89, 'Hufana, Bonifacio H.', 'bauanbranch', '123', 'boni.hufana@gmail.com', 5, 10, 11, 6, NULL, 1),
(90, 'ERIKA JANE ATIENZA', 'sanpablobranch', '123', 'erikajhane.atienza272@gmail.com', 5, 69, 11, 6, NULL, 1),
(91, 'Roberto P. Solayao', 'candelariabranch', '123', 'candelaria@everfirst.com', 5, 20, 11, 6, NULL, 1),
(92, 'Khriselle Ann Cruz', 'khriselleann', '12345', 'efbinan2022@gmail.com', 5, 12, 12, 6, NULL, 1),
(93, 'Carol Bul-igen', 'sanpedrobranch', '123', 'efsanpedro2022@gmail.com', 5, 70, 12, 6, NULL, 1),
(94, 'Eralyn I. Andrade', 'starosabranch', '123', 'efstarosa2022@gmail.com', 5, 96, 12, 6, NULL, 1),
(95, 'ANALIZA E. BALNAJA', 'cabuyaobranch', '123', 'analizabalnaja@yahoo.com', 5, 16, 12, 6, NULL, 1),
(96, 'Michelle Alberio', 'bulihanbranch', '123', 'ef_gma@everfirstloans.com', 5, 97, 12, 6, NULL, 1),
(97, 'Rhea Gonzaga', 'silangbranch', '123', 'ef_silangcavite@everfirstloans.com', 5, 75, 12, 6, NULL, 1),
(98, 'Rosalyn Rico', 'rosalynrico', '12345', 'rarico1112@gmail.com', 5, 22, 10, 5, NULL, 1),
(99, 'Admin Test Branch', 'admintest2', '123', 'dumapitangelo@gmail.com', 5, 0, 12, 6, NULL, 1),
(100, 'Miracle Herbolario', 'cubaobranch', '123', 'efcubao2022@gmail.com', 5, 26, 8, 4, NULL, 1),
(101, 'KRISSA GUIAO', 'krissaguiao', '123', 'djzapata0422@gmail.com', 5, 87, 1, 1, NULL, 1),
(102, 'Admin Test', 'admintest', '123', 'rikasan192@gmail.com', 5, 121, 12, 6, NULL, 1),
(103, 'Doctor, Ricky Samson', 'ridermunoz', '12345', 'rickydoc29@gmail.com', 6, 61, 7, 4, NULL, 1),
(104, 'Head Office Rider', 'riderhead', '123', 'rider@ef.com', 6, 0, 0, 0, NULL, 1),
(105, 'John Cris Calatcat', 'chriscalatcat', '12345', 'chriscalatcat@gmail.com', 6, 4, 12, 6, NULL, 1),
(106, 'Raymart Magat Simbulan', 'riderangeles', '123', 'raymartsimbulan50@gmail.com', 6, 5, 1, 1, NULL, 1),
(107, 'Ron Bryan Balkin', 'angonorider', '123', 'ef_angono@everfirstloans.com', 6, 6, 5, 3, NULL, 1),
(108, 'ROLDAN MEDINA BUGAY', 'riderbataan', '123', 'roldanbugay24@gmail.com', 6, 108, 1, 1, NULL, 1),
(109, 'Cagata, Rannie Ray Dela Cruz', 'antipolorider', '12345', 'antipolorider@everfirst.com', 6, 111, 5, 3, NULL, 1),
(110, 'Usi, Aljhon Dela Cruz', 'riderapalit', '123', 'delacruzjonjon.ju@gmail.com', 6, 7, 1, 1, NULL, 1),
(111, 'Pader, Michael Garcia', 'aranetarider', '123', 'aranetarider@everfirst.com', 6, 114, 8, 4, NULL, 1),
(112, 'Ocampo, Den Mark Delos Santos', 'denmarkrider', '123', 'daboydwonderboy666@gmail.com', 6, 9, 10, 5, NULL, 1),
(113, 'Mainque, Retche Agcang', 'bagongsilangrider', '123', 'retchemainque@gmail.com', 6, 10, 3, 2, NULL, 1),
(114, 'Quintana, Paulo B. ', 'bagumbongrider', '123', 'pquintana0733@gmail.com', 6, 11, 3, 2, NULL, 1),
(115, 'Gloria, Domilen June Dela Serna', 'balagtasrider', '123', 'jhungloria005@gmail.com', 6, 12, 2, 1, NULL, 1),
(116, 'Rioterez, Rey Christopher', 'riderbaliuag', '123', 'baliuagrider@everfirst.com', 6, 14, 1, 1, NULL, 1),
(117, 'Nalaza, Jason', 'jasonnalaza', '123', 'jasonnalaza870@gmail.com', 6, 16, 11, 6, NULL, 1),
(118, 'Elimos, Adolfo Jr. Orane', 'bauanrider', '123', 'elimosadolfojr@gmail.com', 6, 17, 11, 6, NULL, 1),
(119, ' Pena, John Glenn Changco', 'riderbinan', '123', 'hindiakosiglenn@gmail.com', 6, 19, 12, 6, NULL, 1),
(120, 'Aragoncillo, Fernando Mesa', 'caintarider', '123', 'crisfer102789@gmail.com', 6, 24, 5, 3, NULL, 1),
(121, 'Ciasico, Ian Marlowe Castillo', 'calambarider', '123', 'bentequatro0718@gmail.com', 6, 25, 11, 6, NULL, 1),
(122, 'Tenebro, Argie Lopez', 'camarinrider', '123', 'argie.tenebro@gmail.com', 6, 26, 3, 2, NULL, 1),
(123, 'Celendro, Exequiel Dulutan', 'candelariarider', '123', 'celendro@yahoo.com', 6, 27, 11, 6, NULL, 1),
(124, 'De Vera, Lexus Galang', 'canlubangrider', '123', 'lxusdvera29@gmail.com', 6, 28, 11, 6, NULL, 1),
(125, 'Ventura, Jurgensen Basto', 'ridercavite', '123', 'caviterider@ef.com', 6, 29, 10, 5, NULL, 1),
(126, 'Engreso, Jeff Michael', 'ridercogeo', '123', 'jennaanneengreso@gmail.com', 6, 31, 5, 3, NULL, 1),
(127, 'Guiuo Jr, Rosito Algeria', 'ridercommonwealth', '123', 'bongguiuo@yahoo.com', 6, 33, 4, 2, NULL, 1),
(128, 'Macapayag, Renan Cunanan', 'riderconception', '123', 'macapayagrenan@gmail.com', 6, 34, 6, 3, NULL, 1),
(129, 'RENZO M. ESPALDON', 'ridercubao', '123', 'shimpalou@gmail.com', 6, 35, 8, 4, NULL, 1),
(130, 'Basto, Jaime Magpayo', 'riderdasma', '123', '18grifter@gmail.com', 6, 36, 10, 5, NULL, 1),
(131, 'Estrella, Israel Lasin', 'riderdau', '123', 'estrellaisrael712@gmail.com', 6, 37, 1, 1, NULL, 1),
(132, 'Brosas, Jomar Ray Guitierrez', 'riderdeparo', '123', 'efdeparo2022@gmail.com', 6, 38, 3, 2, NULL, 1),
(133, 'Ramos, Jonathan Trajano', 'ridergagalangin', '123', 'ridergagalangin@ef.com', 6, 39, 7, 4, NULL, 1),
(134, 'Gallardo, Johnny Palacios', 'ridergentdeleon', '123', 'johnnygallardo@gmail.com', 6, 40, 4, 2, NULL, 1),
(135, 'April Renn Cabaluna ', 'riderguadalupe', '123', 'rennzcabaluna18@gmail.com', 6, 49, 9, 5, NULL, 1),
(136, 'Arangat, Ricardo Jr, Quilla', 'riderimus', '123', 'ricarangat@gmail.com', 6, 42, 10, 5, NULL, 1),
(137, 'Mariano, Pablo C.', 'riderjprizal', '123', 'alyzsamariano286@gmail.com', 6, 43, 9, 5, NULL, 1),
(138, 'Laboson, Joesan Valdevieso', 'riderkaruhatan', '123', 'forlab08@gmail.com', 6, 110, 4, 2, NULL, 1),
(139, 'Sonon, Raymond Licot', 'riderkiko', '123', 'rsonon20@gmail.com', 6, 44, 3, 2, NULL, 1),
(140, 'Franciso Jr, Edgardo', 'riderlaspinas', '123', 'franciscoedgardo088@gmail.com', 6, 46, 10, 5, NULL, 1),
(141, 'Espana, Marlon Felipe', 'riderlagro', '123', 'riderlagro@ef.com', 6, 45, 3, 2, NULL, 1),
(142, 'Maderazo, Jan Carlo De Castro', 'riderlipa', '123', 'paninay04@gmail.com', 6, 47, 11, 6, NULL, 1),
(143, 'Lopez, James Carlo Encarnacion', 'riderlitex', '123', 'riderlitex@ef.com', 6, 48, 4, 2, NULL, 1),
(144, 'Trajano, Jorge Imperial', 'ridermalabon', '123', 'jorgebeathea@gmail.com', 6, 50, 7, 4, NULL, 1),
(145, 'Luces, Jomar Sales', 'ridermalaria', '123', 'jomarluces905@gmail.com', 6, 51, 3, 2, NULL, 1),
(146, 'Nolasco, Reynante Malihan', 'ridermalibay', '123', 'efmalibay2022@gmail.com', 6, 117, 9, 5, NULL, 1),
(147, 'Cuales, Kristofer Dime', 'cualeskristofer', '123', 'efmalolos2022@gmail.com', 6, 52, 2, 1, NULL, 1),
(148, 'Villafuerte, Marlon Cordova', 'ridermarikina', '123', 'ridermarikina@ef.com', 6, 54, 6, 3, NULL, 1),
(149, 'Centeno, Randy Mata', 'ridermarilao', '123', 'randycenteno9@gmail.com', 6, 55, 2, 1, NULL, 1),
(150, 'Gumba, Jelo Dela Cruz', 'ridermasinag', '123', 'efmasinag2022@gmail.com', 6, 57, 6, 3, NULL, 1),
(151, 'Beni, Arrian Contante', 'ridermeycuayan', '123', 'arrianbeni23@gmail.com', 6, 58, 2, 1, NULL, 1),
(152, 'Gura, Kelly Osila', 'ridermontalban', '123', 'ridermontalban@ef.com', 6, 59, 6, 3, NULL, 1),
(153, 'Din, Patrick Nazarene Matilas', 'patrick132209', 'rhavenamari132209', 'patrickdin1322@gmail.com', 6, 60, 7, 4, NULL, 1),
(154, 'PASCUAL, ALFREDO Arruejo', 'ridersanpedro', '123', 'adammatthew03292018@gmail.com', 6, 85, 12, 6, NULL, 1),
(155, 'Joseph De Guzman', 'josephdeguzman', '12345', 'efdianegapo0102@gmail.com', 6, 65, 1, 1, NULL, 1),
(156, 'Jurgensen B. Ventura', 'jurgensen', '12345', 'venturajurgensen733@gmail.com', 6, 29, 10, 5, NULL, 1),
(157, 'Joel Gatdula', 'joelgatdula', '12345', 'joelgatdula5@gmail.com', 6, 91, 2, 1, NULL, 1),
(158, 'Olvina, Michael', 'ridermuzon', '123', 'mikeanivlo@gmail.com', 6, 62, 2, 1, NULL, 1),
(159, 'Robbie C. Gaspar', 'ridernavotas', '123', 'efnavotas2022@gmail.com', 6, 63, 7, 4, NULL, 1),
(160, 'Regoso, Ericson Cabuhat', 'ridernova', '123', 'regosoericson@gmail.com', 6, 64, 4, 2, NULL, 1),
(161, '  Boquiron, Patrick', 'riderpaco', '123', 'riderpaco@ef.com', 6, 67, 8, 4, NULL, 1),
(162, 'Moral, Lawrence', 'riderpaliparan', '123', 'ef_paliparan@everfirstloans.comef.com', 6, 68, 10, 5, NULL, 1),
(163, 'RICO, ARIEL REFORMA', 'riderparang', '123', 'arielrico120493@gmail.com', 6, 112, 6, 3, NULL, 1),
(164, 'Flores, Rafael Irinco', 'riderpasodeblas', '123', 'werpalodipetmaluapol@gmail.com', 6, 72, 2, 1, NULL, 1),
(165, 'Lopez, John Ernest Sabaybay', 'riderphilcoa', '123', 'donkaisz27@gmail.com', 6, 73, 6, 3, NULL, 1),
(166, 'Pascua, Joseph Crisostomo', 'riderpritil', '123', 'riderpritil', 6, 74, 7, 4, NULL, 1),
(167, 'Castro, Marc Ernie Gener', 'riderpulilian', '123', 'mlsmurf0616@gmail.com', 6, 76, 1, 1, NULL, 1),
(168, 'Dela Cruz, Paolo Asis', 'riderpunta', '12345', 'dc.cielo.o3@gmail.com', 6, 77, 8, 4, NULL, 1),
(169, 'Nuque, Cris Santo Udarbe', 'riderputatan', '123', 'crissantonuque0504@gmail.com', 6, 78, 12, 6, NULL, 1),
(170, 'MALITAO, PAUL ANDREW', 'riderqmart', '123', 'paulandrewmalitao@gmail.com', 6, 75, 6, 3, NULL, 1),
(171, 'Malinay, Leo De Jose', 'riderquiapo', '123', 'cirelmalinay@gmail.com', 6, 113, 8, 4, NULL, 1),
(172, 'Lorica, Alvin Lituana', 'loricaalvin', '123', 'loricaalvin@ef.com', 6, 79, 5, 3, NULL, 1),
(173, 'Mayo, Renze Nico Coronado', 'renzenico', '123', 'renzenico@ef.com', 6, 120, 5, 3, NULL, 1),
(174, 'Macarayan, Donald Ido', 'ridersapangpalay', '123', 'macarayandonald@yahoo.com', 6, 87, 2, 1, NULL, 1),
(175, 'Pascua, Santy Cayanong', 'ridersandionision', '123', 'ridersandionisio@ef.com', 6, 81, 10, 5, NULL, 1),
(176, 'Antido, Aldrine Manalansan', 'ridersanfernando', '123', 'efpampanga2022@gmail.com', 6, 109, 1, 1, NULL, 1),
(177, 'Franciso, Richmond Roy Araos', 'ridersanjuan', '123', 'franciscorichmond04@gmail.com', 6, 82, 8, 4, NULL, 1),
(178, 'Bisocos, Justine Cyrel Manzon', 'ridersanmateo', '123', 'jbisocos@gmail.com', 6, 83, 6, 3, NULL, 1),
(179, 'Sarmiento, Rene Boy', 'ridersanpablo', '123', 'eboisarmiento21@gmail.com', 6, 84, 11, 6, NULL, 1),
(180, 'Vacant', 'ridersangandaan', '123', 'ridersangandaan@ef.com', 6, 86, 4, 2, NULL, 1),
(181, 'Modrigo, Ernesto Arpon', 'ridersauyo', '123', 'ernestoamodrigo@gmail.com', 6, 88, 4, 2, NULL, 1),
(182, 'Trajano, Kenneth Aguarin', 'ridersignal', '123', 'ridersignal@ef.com', 6, 89, 9, 5, NULL, 1),
(183, 'Mirasol, Henerson Gammad', 'riderstamesa', '123', 'efstamesa2022@gmail.com', 6, 92, 8, 4, NULL, 1),
(184, 'Jeffrey Unating', 'jeffrey', '12345', 'jeffrey@everfirst.com', 6, 98, 10, 5, NULL, 1),
(185, 'Oliver, June Torillos', 'riderstarosa', '123', 'juneoliver0610@gmail.com', 6, 118, 12, 6, NULL, 1),
(186, 'Sacdalan, Leonard Buenaventura', 'ridertaguig', '123', 'leonardsacdalan15@gmail.com', 6, 95, 9, 5, NULL, 1),
(187, 'Gabriel, Rondale Manimtim', 'ridertanauan', '12345', 'eladnor22@gmail.com', 6, 96, 11, 6, NULL, 1),
(188, 'Vitto, Ritchie Comia', 'ridertandangsora', '123', 'ridertandangsora@ef.com', 6, 97, 4, 2, NULL, 1),
(189, 'Bonifacio, Richard Ortega', 'ridertaytay', '123', 'ridertaytay@ef.com', 6, 99, 5, 3, NULL, 1),
(190, 'Natividad, Genesis Hipolito', 'ridertinajeros', '123', 'ridertinajeros@ef.com', 6, 101, 7, 4, NULL, 1),
(191, 'Parson, Winner Labrador', 'ridersampaloc', '123', 'sampaloc@everfirst.com.ph', 6, 80, 8, 4, NULL, 1),
(192, 'Novo, Emanuel Borlado', 'ridertungko', '123', 'emanuelnovo28@gmail.com', 6, 104, 3, 2, NULL, 1),
(193, 'Arcega, Francis Lotino', 'riderzapote', '123', 'riderzapote@ef.com', 6, 107, 10, 5, NULL, 1),
(194, 'Alexander G. Pangan Jr.', 'riderboni', '123', 'xander_03@yahoo.com', 6, 53, 9, 5, NULL, 1),
(195, 'Salvacion, Jonald', 'riderbinangonan', '123', 'jonaldsalvacion@gmail.com', 6, 20, 5, 3, NULL, 1),
(196, 'Alvin L. Lorica', 'riderrosariopasig', '123', 'riderrosariopasig@ef.com', 6, 79, 5, 3, NULL, 1),
(197, 'VINZON, MANASSEH C.', 'riderbulihan', '123', 'nashvinz76@gmail.com', 6, 119, 12, 6, NULL, 1),
(198, 'Ronnie Tan', 'ronkie1286', '123', 'ronkie1286@gmail.com', 6, 23, 12, 6, NULL, 1),
(199, 'Marc Lesther OrdoÃ±ez', 'riderlopez', '123', 'marclesther.ordonez.ge.1987@gmail.com', 6, 116, 9, 5, NULL, 1),
(200, 'Jowell S. Pilapil', 'riderbicutan', '12345', 'jowellpilapil.jp@gmail.com', 6, 18, 9, 5, NULL, 1),
(201, 'Norman T. Sahagon', 'riderbluementritt', '123', 'yamopogs@gmail.com', 6, 21, 7, 4, NULL, 1),
(202, '(Vacant)', 'silangrider', '12345', 'vacant@everfirst.com', 6, 90, 12, 6, NULL, 1),
(203, 'Jayce Panahon De Castro', 'ridercabanatuan', '123', 'jayceedecastro9@gmail.com', 6, 22, 1, 1, NULL, 1),
(204, 'Rider Test', 'ridertestadmin', '123', 'ridertestadmin@gmail.com', 6, 121, 12, 6, NULL, 1),
(205, 'Josephine Julios', 'josephinejulio', '123', 'jrjulio@everfirstloans.com', 4, 0, 1, 1, 2, 1),
(206, 'Cecillia Ibarra', 'cecillia', 'ibarra', 'rikasan192222@gmail.com', 4, 0, 2, 1, 2, 1),
(207, 'Maricar Yacat', 'maricaryacat', '123', 'maricaryacat@everfirst.com', 4, 0, 3, 2, 2, 1),
(208, 'Hyazel Cajipe', 'hyazelcajipe', '123', 'hyzelcajipe@everfirst.com', 4, 0, 4, 2, 2, 1),
(209, 'Diana Rose Garbin', 'dianarosegarbin', '123', 'dianarosegarbin@everfirst.com', 4, 0, 5, 3, 2, 1),
(210, 'Elsa Blanche', 'elsablanche', '12345', 'elsablanche@everfirst.com', 4, 0, 6, 3, 2, 1),
(211, 'Minerva Piga', 'minervapiga', '123', 'minervapiga@everfirst.com', 4, 0, 7, 4, 2, 1),
(212, 'Imelda Estipona', 'imeldaestipona', '123', 'imeldaestipona@everfirst.com', 4, 0, 8, 4, 2, 1),
(213, 'Kayneth Joy Vigare', 'kaynethjoy', '123', 'kaynethjoyvigare@everfirst.com', 4, 0, 9, 5, 2, 1),
(214, 'Jocelyn Dela Cruz', 'jocelyndelacruz', '123', 'jocelyndelacruz@everfirst.com', 4, 0, 10, 5, 2, 1),
(215, 'Marcelito Selda', 'marcelitoselda', '123', 'marcelitoselda@everfirst.com', 4, 0, 11, 6, 2, 1),
(216, 'Armida Jatap', 'armidajatap', '123', 'armidajatap@everfirst.com', 4, 0, 12, 6, 2, 1),
(217, 'Helen Actub', 'helen', '123', 'helenactub@everfirst.com', 3, 0, 0, 1, 2, 1),
(218, 'Vanessa Belangoy', 'vanessabelangoy', '123', 'vanessabelangoy@everfirst.com', 3, 0, 0, 2, 2, 1),
(219, 'Ely Joy Conde', 'elyjoyconde', '123', 'elyjoycondo@everfirst.com', 3, 0, 0, 3, 2, 1),
(220, 'Josefina Evangelista', 'josefinaevangelista', '123', 'josefinaevangelista@everfirst.com', 3, 0, 0, 4, 2, 1),
(221, 'Edgardo Rivera', 'edgardorivera', '123', 'edgardorivera@everfirst.com', 3, 0, 0, 5, 2, 1),
(222, 'Anweda Enoy', 'anweda', 'enoy', 'anwedaenoy@everfirst.com', 3, 0, 0, 6, 2, 1),
(223, 'Rita, Harley Jane Cortis', 'harleyrita', '12345', 'hjcr100294@gmail.com', 7, 0, 0, 0, 2, 1),
(224, 'Dhel Cabangunay', 'dhelcabangunay', '12345', 'delcabangunay@gmail.com', 7, 0, 0, 0, 2, 1),
(225, 'Brite Jasmine Alfon', 'jasminealfon', '12345', 'britejasminealfon@gmail.com', 7, 0, 0, 0, 2, 1),
(226, 'Romero, Maria Lourdes Simeon', 'lourdesromero', '12345', 'mlsimeonromero@gmail.com', 7, 0, 0, 0, 2, 1),
(227, 'Zyrel Melo', 'zyrelmelo', '12345', 'efauditzymelo@gmail.com', 7, 0, 0, 0, 2, 1),
(228, 'Richie Chavez', 'financemanager', '123', 'financemanager@everfirst.com', 8, 0, 0, 0, 2, 1),
(229, 'Charito Rosales Geguiera', 'charitorosales', '123', 'charitorosalesgeguiera@everfirst.com', 9, 0, 0, 0, 2, 1),
(230, 'Diana Rose Garbin', 'dianarosegarbin', '123', 'dianarosegarbin@everfirst.com', 10, 0, 5, 3, 2, 1),
(231, 'Kayneth Joy Vigare', 'kaynethjoy', '123', 'kaynethjoyvigare@everfirst.com', 10, 0, 9, 5, 2, 1),
(232, 'Jocelyn Dela Cruz', 'jocelyndelacruz', '123', 'jocelyndelacruz@everfirst.com', 10, 0, 10, 5, 2, 1),
(233, 'Accounting Supervisor', 'accountingsupervisor', '123', 'accountingsupervisor@everfirst.com', 10, 0, 0, 0, 2, 1),
(234, 'Rowena Callego', 'Whengskie', '301011yanah', 'rbcallego@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(235, 'Charlene Napalit', 'Charlene', 'bircat', 'cdnapalit@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(236, 'Joyce Caragan', 'joycecaragan', '12345', 'jglaurio@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(237, 'Ryan M. Rejale', 'ryanrejale', '1234', 'rmrejale@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(238, 'Khim Tianzon', 'kdtianzon', '1234', 'kdtianzon@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(239, 'Myziel Arciga', 'myzielarciga', 'Rain@091318', 'mspacatang@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(240, 'Mark John Dedoyco', 'markjohn', '2078', 'mldedoyco@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(241, 'Rosalie Cube', 'rosaliecube', '1234', 'rccube@everfirstloans.com', 10, 0, 0, 0, 2, 1),
(242, 'Auditor Head', 'auditorhead', '123', 'dasdasd', 12, 0, 0, 0, 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `tbl_area_list`
--
ALTER TABLE `tbl_area_list`
  ADD PRIMARY KEY (`area_code`);

--
-- Indexes for table `tbl_branch_list`
--
ALTER TABLE `tbl_branch_list`
  ADD PRIMARY KEY (`branch_code`);

--
-- Indexes for table `tbl_district_list`
--
ALTER TABLE `tbl_district_list`
  ADD PRIMARY KEY (`district_code`);

--
-- Indexes for table `tbl_receiver_list`
--
ALTER TABLE `tbl_receiver_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_request_folder`
--
ALTER TABLE `tbl_request_folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `approver_code` (`approver_code`),
  ADD KEY `date_request` (`date_requested`),
  ADD KEY `branch_requested` (`branch_requested`),
  ADD KEY `bank_name` (`bank_name`),
  ADD KEY `sss_no` (`sss_no`),
  ADD KEY `account_type` (`account_type`),
  ADD KEY `client_name` (`client_name`),
  ADD KEY `dsb_no` (`dsb_no`),
  ADD KEY `age` (`age`),
  ADD KEY `pension_type` (`pension_type`),
  ADD KEY `loan_term` (`loan_term`),
  ADD KEY `outstanding_balance` (`outstanding_balance`),
  ADD KEY `last_payment_date` (`last_payment_date`),
  ADD KEY `branch_remarks` (`branch_remarks`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `dec_borrower_1` (`dec_borrower_1`),
  ADD KEY `dec_borrower_2` (`dec_borrower_2`),
  ADD KEY `other_than_dec_1` (`other_than_dec_1`),
  ADD KEY `other_than_dec_3` (`other_than_dec_3`),
  ADD KEY `other_than_dec_4` (`other_than_dec_4`),
  ADD KEY `other_than_dec_5` (`other_than_dec_5`),
  ADD KEY `other_than_dec_2` (`other_than_dec_2`),
  ADD KEY `position` (`position`),
  ADD KEY `nco_borrower` (`nco_borrower`),
  ADD KEY `status` (`status`),
  ADD KEY `other_than_dec` (`other_than_dec`);

--
-- Indexes for table `tbl_usergroup`
--
ALTER TABLE `tbl_usergroup`
  ADD PRIMARY KEY (`user_code`);

--
-- Indexes for table `tbl_user_session`
--
ALTER TABLE `tbl_user_session`
  ADD PRIMARY KEY (`user_session`);

--
-- Indexes for table `tbl_write_sequence`
--
ALTER TABLE `tbl_write_sequence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `position` (`position`),
  ADD KEY `receiver_code` (`approver_code`),
  ADD KEY `status` (`status`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_area_list`
--
ALTER TABLE `tbl_area_list`
  MODIFY `area_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_branch_list`
--
ALTER TABLE `tbl_branch_list`
  MODIFY `branch_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `tbl_district_list`
--
ALTER TABLE `tbl_district_list`
  MODIFY `district_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_receiver_list`
--
ALTER TABLE `tbl_receiver_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_request_folder`
--
ALTER TABLE `tbl_request_folder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_usergroup`
--
ALTER TABLE `tbl_usergroup`
  MODIFY `user_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_user_session`
--
ALTER TABLE `tbl_user_session`
  MODIFY `user_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_write_sequence`
--
ALTER TABLE `tbl_write_sequence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=243;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
