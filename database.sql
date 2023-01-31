-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2022 at 09:10 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventbooking`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `phoneno` varchar(15) NOT NULL,
  `type` varchar(15) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `email`, `fullname`, `phoneno`, `type`, `status`) VALUES
('mehrasparsh', 'zxcvbnm', 'sparshmehra@765', 'Sparsh Mehra', '8760984567', 'admin', 'active'),
('paraspuri@567', 'lkjhgfdsa', 'paraspuri1@gmail.com', 'Para Puri', '7689075643', 'co-admin', 'active'),
('prachi@123', 'asdfghjkl', 'prachi@123@gmail.com', 'Prachi Mahajan', '8789098765', 'admin', 'active'),
('priyamehta', 'qwertyuio', 'priyamehta@yahoo.com', 'Priya Mehta', '9434343422', 'admin', 'active'),
('rahultandon1', 'qwertyuiop', 'rtandon139@gmail.com', 'Rahul tandon', '9876466448', 'co-admin', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `biling`
--

CREATE TABLE `biling` (
  `bill_id` int(10) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_city` varchar(25) NOT NULL,
  `user_state` varchar(25) NOT NULL,
  `grand_total` varchar(15) NOT NULL,
  `property_name` varchar(25) NOT NULL,
  `owner_email` varchar(30) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `category_name` varchar(25) NOT NULL,
  `no_of_people` varchar(10) NOT NULL,
  `payment_method` varchar(10) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `biling`
--

INSERT INTO `biling` (`bill_id`, `user_name`, `user_email`, `user_city`, `user_state`, `grand_total`, `property_name`, `owner_email`, `event_date`, `event_time`, `category_name`, `no_of_people`, `payment_method`, `status`) VALUES
(5, 'priyamehtaaa', 'priya123@gmail.com', 'Amritsar', 'Punjab', '400000', 'celebration resort', '', '2022-12-16', '18:58:00', 'Marriage', '100', 'cod', 'Payment Pending'),
(6, 'priyamehtaaa', 'priya123@gmail.com', 'Amritsar', 'Punjab', '7654', 'forest resort', 'siya1234@gmail.com', '2022-12-07', '12:55:00', 'Baby Shower', '100', 'cod', 'Payment Pending');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_name`) VALUES
('Anniversary Party'),
('Baby Shower'),
('Bachelorette'),
('Bangles Ceremony'),
('Birthday Party'),
('Christmas Party'),
('Dhol Night '),
('Engagement'),
('Haldi Ceremony'),
('Halloween Party'),
('House Warming Party'),
('Marriage'),
('Music Concert'),
('New Year Party');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `query_id` int(15) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_message` varchar(50) NOT NULL,
  `user_mobile` int(10) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`query_id`, `user_name`, `user_email`, `user_message`, `user_mobile`, `status`) VALUES
(1, 'priyamehta', 'priya123@gmail.com', 'hello bc', 987654321, 'solved'),
(2, 'priyamehtaaa', 'priyamehta1@gmail.com', 'heyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 2147483647, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `location` varchar(150) NOT NULL,
  `owner_email` varchar(50) NOT NULL,
  `contact_no` varchar(20) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `price` float(12,2) NOT NULL,
  `category_name` varchar(60) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `name`, `location`, `owner_email`, `contact_no`, `photo`, `price`, `category_name`, `status`) VALUES
(1, 'Amitarasa', 'Amita Rasa, Nandi Hills, Karnataka, India', 'akshay346@gmail.com', '9087657866', 'images/wed1.jpg', 1000000.00, 'Marriage', 'activated'),
(2, 'Stellar Resorts', 'Stellar Resorts, NH8, Yawantika Colony, Rajokri, New Delhi, Delhi, India', 'akshay346@gmail.com', '9087657866', 'images/wed2.jpg', 600000.00, 'Marriage', 'activated'),
(3, 'Royalton Leisure', 'Survey no.42, Off Bannerghatta Main Road', 'akshay346@gmail.com', '9087657866', 'images/wed3.jpg', 1000000.00, 'Marriage', 'activated'),
(4, 'Fiestaa Resort', ' Boyalahalli,Karnataka', 'akshay346@gmail.com', '9087657866', 'images/bac1.jpg', 300000.00, 'Bachelorette', 'activated'),
(5, 'The Fort Ramgarh', ' National Highway 73, Sector 28, Panchkula', 'akshay346@gmail.com', '9087657866', 'images/wed4.jpg', 1000000.00, 'Marriage', 'activated'),
(6, 'Lohagarh Fort Resort And Spa ', 'NH-8, Kachera Wala, Rajasthan', 'akshay346@gmail.com', '9087657866', 'images/wed5.jpg', 1000000.00, 'Marriage', 'activated'),
(7, 'Bhairav Garh Palace ', 'Maharana Pratap Khel Gaon, 200 ft Road Opposite R.T.O., Chitrakoot Nagar', 'akshay346@gmail.com', '9087657877', 'images/wed6.jpg', 100000.00, 'Marriage', 'activated'),
(8, 'Coorg Wilderness Resort', 'Coorg Wilderness Resort, Madikeri, Karnataka', 'akshay346@gmail.com', '9087657866', 'images/bac2.jpg', 400000.00, 'Bachelorette', 'activated'),
(9, 'Redwood Resorts', 'Redwood Resort Panchkula - Morni Road, Near Nada Sahib Gurudwara', 'akshay346@gmail.com', '9087657866', 'images/bac3.jpg', 200000.00, 'Bachelorette', 'activated'),
(10, 'Kaldan Samudhra Palace', '16/3B1B, Devaneri, East Coast Road Mamallapuram Devaneri, Mahabalipuram', 'akshay346@gmail.com', '9087657866', 'images/bac4.jpg', 300000.00, 'Bachelorette', 'activated'),
(11, 'Atharva Palace Jaipur', ' NH-8, Jaipur', 'akshay346@gmail.com', '9087657866', 'images/hal1.jpg', 500000.00, 'Haldi Ceremony', 'activated'),
(12, 'The Punarnava', 'A Luxury Health & Wellness Resort, Bhitar Wali', 'akshay346@gmail.com', '9087657866', 'images/hal2.jpg', 700000.00, 'Haldi Ceremony', 'activated'),
(13, 'Sanskriti Greens', 'Bandh Road, Jaunapur, Mehrauli, New Delhi', 'akshay346@gmail.com', '9087657866', 'images/hal3.jpg', 100000.00, 'Haldi Ceremony', 'activated'),
(14, 'Karma Lakelands', 'Sector 80, Gurugram', 'akshay346@gmail.com', '908657866', 'images/ban1.jpg', 150000.00, 'Bangles Ceremony', 'activated'),
(15, 'The Vista', '162, Mehrauli-Gurgaon Rd, New Delhi', 'akshay346@gmail.com', '9087657866', 'images/ban2.jpg', 800000.00, 'Bangles Ceremony', 'activated'),
(16, 'Regal Banquets', 'Chakan, Pune', 'akshay346@gmail.com', '9087657866', 'images/ban3.jpg', 170000.00, 'Bangles Ceremony', 'activated'),
(19, 'Silent Shores Resort', '87, B E M L Road,Hootagally,MYSORE', 'akshay346@gmail.com', '9087657866', 'images/new1.jpg', 100000.00, 'New Year Party', 'activated'),
(20, 'Exotica - The Tropical Retreat', '1726, Village Surajkund, Motisar Rd', 'akshay346@gmail.com', '9087657866', 'images/new2.jpg', 20000.00, 'New Year Party', 'activated'),
(21, 'Hilltop Hotel', ' Ambamata, Udaipur', 'akshay346@gmail.com', '9087657866', 'images/bit1.jpg', 30000.00, 'Birthday Party', 'activated'),
(22, 'Clarks Inn', 'D-block Ranjit Avenue , Amritsar', 'akshay346@gmail.com', '9087657866', 'images/bit2.jpg', 20000.00, 'Birthday Party', 'activated'),
(23, 'Best Western', 'Mall Road Amritsar', 'akshay346@gmail.com', '9087657866', 'images/bit3.jpg', 25000.00, 'Birthday Party', 'activated'),
(24, 'VITS Hotel', 'Andheri-Kurla Road, Kondivita Lane, International Airport Zone', 'akshay346@gmail.com', '9087657866', 'images/bab1.jpg', 50000.00, 'Baby Shower', 'activated'),
(25, 'Hotel The Leaf & Lawn', 'Vardan Khand, Sector 1, Gomti Nagar, Lucknow', 'akshay346@gmail.com', '9087657866', 'images/bab2.jpg', 80000.00, 'Baby Shower', 'activated'),
(26, 'The Royal Palms', 'Chinnandi Kuppam Main Road, Delhi', 'akshay346@gmail.com', '9087657866', 'images/wed7.jpg', 1000000.00, 'Marriage', 'activated'),
(28, 'Grand Mercure ', 'Grand Mercure Bengaluru at Gopalan Mall', 'akshay346@gmail.com', '9087657866', 'images/dhol1.jpg', 250000.00, 'Dhol Night', 'activated'),
(29, 'Noormahal Palace Hotel', ' Crossing, National Highway 1 Sector 32, Karnal', 'akshay346@gmail.com', '9087657866', 'images/wed9.jpg', 1500000.00, 'Marriage', 'activated'),
(31, 'Iris Garden', 'Sector 15 Chandigarh', 'akshay346@gmail.com', '9087657866', 'images/p4.jpg', 100000.00, 'Music Concert', 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `contact_email` varchar(50) NOT NULL,
  `organiser_name` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`contact_email`, `organiser_name`, `password`, `contact_no`, `status`) VALUES
('akshay346@gmail.com', 'Akshay Singh', 'zxcvbnmqwertyu', '9087657866', 'activated'),
('ankit67@gmail.com', 'Ankit Uppal', 'qazwsxedc', '7778889675', 'activated'),
('anshul88@gmail.com', 'Anshul Arora', 'qwertyuiop', '9897686545', 'activated'),
('gopali567@gmail.com', 'Gopali Tiwari', 'plmoknijb', '8987896767', 'activated'),
('kriti876@gmail.com', 'Kriti Aluwalia ', 'poiuytrewq', '7898898765', 'activated'),
('lakshay768@gmail.com', 'Lakshay Sharma', 'asdfghjkl', '8765908765', 'activated'),
('manyamehra567@gmail.com', 'Manya Mehra', 'asdfghj', '9843678124', 'activated'),
('mehrarohin@gmail.com', 'Rohin Mehra', 'poiuytrew', '9090876754', 'activated'),
('mihir789@gmail.com', 'Mihir Mehra', 'poiuytrewq', '8760984567', 'pending'),
('paraspuri98967@gmail.com', 'Paras Puri', 'aasdfghjkl', '7689078976', 'pending'),
('prachimhajan879@gmail.com', 'Prachi Mahajan', 'lkjhgfdsa', '8907865467', 'pending'),
('rahul@gmail.com', 'Rahul Tandon', '1234567890', '2147483647', 'activated'),
('ranveer67@gmail.com', 'Ranveer Singh', 'lllkjhgfdsa', '7896785678', 'activated'),
('ritika2678@gmail.com', 'Ritika Sharma', 'qwertyuiop', '7689056789', 'activated'),
('Sanchi1@gmail.com', 'Sanchi Ohri', 'qwertyuiop', '8790767867', 'activated'),
('sanchya96@gmail.com', 'Sanchya Mahajan', 'zxcvbnm', '7895473309', 'activated'),
('sehaj768@gmail.com', 'Sehaj Verma ', 'qwertyu', '6789078976', 'activated'),
('shalin@gmail.com', 'Shalin Bhanot', 'asdfghjkl', '7896574899', 'activated'),
('singhabhinav123@gmail.com', 'Abhinav Singh', 'qwertyuiop', '9870957899', 'activated'),
('siya1234@gmail.com', 'Siya Sharma', 'qwertyuiop', '2147483647', 'activated'),
('sparshemhra648@gmail.com', 'Sparsh Mehra', 'zxcvbnm', '9876543218', 'pending'),
('vinayak4567@gmail.com', 'Vinayak Sharma', 'asdfghjkl', '9876543210', 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_mobile` varchar(15) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `otp` int(10) NOT NULL,
  `user_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `password`, `user_mobile`, `user_name`, `otp`, `user_address`) VALUES
(1, 'priya123@gmail.com', 'qwertyuiop', '9876543210', 'priyamehtaaa', 0, 'Delhi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `biling`
--
ALTER TABLE `biling`
  ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_name`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`query_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `category_name` (`category_name`),
  ADD KEY `owner_email` (`owner_email`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`contact_email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`,`user_mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `biling`
--
ALTER TABLE `biling`
  MODIFY `bill_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `query_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_name`) REFERENCES `category` (`category_name`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`owner_email`) REFERENCES `owner` (`contact_email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
