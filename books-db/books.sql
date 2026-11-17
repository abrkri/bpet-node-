-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Okt 07. 09:32
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `books`
--
CREATE DATABASE IF NOT EXISTS `books` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `books`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` varchar(10) NOT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `year`, `genre`) VALUES
(1, 'A Gyűrűk Ura', 'J.R.R. Tolkien', '1954', 'Fantasy'),
(2, '1984', 'George Orwell', '1949', 'Dystopian'),
(3, 'A Pál utcai fiúk', 'Molnár Ferenc', '1906', 'Ifjúsági regény'),
(4, 'Egri csillagok', 'Gárdonyi Géza', '1899', 'Történelmi regény'),
(5, 'Dűne', 'Frank Herbert', '1965', 'Sci-Fi'),
(6, 'Harry Potter és a bölcsek köve', 'J.K. Rowling', '1997', 'Fantasy'),
(6, 'Harry Potter és a bölcsek köve', 'J.K. Rowling', '1997', 'Fantasy'),
(7, 'A kis herceg', 'Antoine de Saint-Exupéry', '1943', 'Mese'),
(8, 'A Mester és Margarita', 'Mihail Bulgakov', '1967', 'Szépirodalom'),
(9, 'Bűn és bűnhődés', 'Fjodor Dosztojevszkij', '1866', 'Pszichológiai regény'),
(10, 'Háború és béke', 'Lev Tolsztoj', '1869', 'Történelmi regény'),
(11, 'A hobbit', 'J.R.R. Tolkien', '1937', 'Fantasy'),
(12, 'Fahrenheit 451', 'Ray Bradbury', '1953', 'Sci-Fi'),
(13, 'A nagy Gatsby', 'F. Scott Fitzgerald', '1925', 'Szépirodalom'),
(14, 'Pride and Prejudice', 'Jane Austen', '1813', 'Romantikus regény'),
(15, 'A három testőr', 'Alexandre Dumas', '1844', 'Kalandregény'),
(16, 'Az ember tragédiája', 'Madách Imre', '1861', 'Dráma'),
(17, 'Drakula', 'Bram Stoker', '1897', 'Horror'),
(18, 'Frankenstein', 'Mary Shelley', '1818', 'Horror'),
(19, 'A nyomorultak', 'Victor Hugo', '1862', 'Történelmi regény'),
(20, 'Monte Cristo grófja', 'Alexandre Dumas', '1844', 'Kalandregény'),
(21, 'Robinson Crusoe', 'Daniel Defoe', '1719', 'Kalandregény'),
(22, 'Gulliver utazásai', 'Jonathan Swift', '1726', 'Szatíra'),
(23, 'Don Quijote', 'Miguel de Cervantes', '1605', 'Kalandregény'),
(24, 'A vörös és a fekete', 'Stendhal', '1830', 'Szépirodalom'),
(25, 'Jane Eyre', 'Charlotte Brontë', '1847', 'Romantikus regény'),
(26, 'Üvöltő szelek', 'Emily Brontë', '1847', 'Romantikus regény'),
(27, 'A legyek ura', 'William Golding', '1954', 'Disztópia'),
(28, 'Állatfarm', 'George Orwell', '1945', 'Politikai szatíra'),
(29, 'A per', 'Franz Kafka', '1925', 'Egzisztencialista regény'),
(30, 'A metamorfózis', 'Franz Kafka', '1915', 'Szépirodalom'),
(31, 'A skarlát betű', 'Nathaniel Hawthorne', '1850', 'Történelmi regény'),
(32, 'A dzsungel könyve', 'Rudyard Kipling', '1894', 'Ifjúsági regény'),
(33, 'Micimackó', 'A. A. Milne', '1926', 'Gyermekirodalom'),
(34, 'A titkos kert', 'Frances Hodgson Burnett', '1911', 'Ifjúsági regény'),
(35, 'A Narnia krónikái: Az oroszlán, a boszorkány és a ruhásszekrény', 'C. S. Lewis', '1950', 'Fantasy'),
(36, 'Az időgép', 'H. G. Wells', '1895', 'Sci-Fi'),
(37, 'Az arany ember', 'Jókai Mór', '1872', 'Romantikus regény'),
(38, 'A kőszívű ember fiai', 'Jókai Mór', '1869', 'Történelmi regény'),
(39, 'Légy jó mindhalálig', 'Móricz Zsigmond', '1920', 'Ifjúsági regény'),
(40, 'Édes Anna', 'Kosztolányi Dezső', '1926', 'Szépirodalom'),
(41, 'Abigél', 'Szabó Magda', '1970', 'Ifjúsági regény'),
(42, 'Az ajtó', 'Szabó Magda', '1987', 'Szépirodalom'),
(43, 'Tüskevár', 'Fekete István', '1957', 'Ifjúsági regény'),
(44, 'Vuk', 'Fekete István', '1940', 'Gyermekirodalom'),
(45, 'Kincskereső kisködmön', 'Móra Ferenc', '1918', 'Ifjúsági regény'),
(46, 'A láthatatlan ember', 'Gárdonyi Géza', '1902', 'Történelmi regény'),
(47, 'A fekete város', 'Mikszáth Kálmán', '1910', 'Történelmi regény'),
(48, 'Beszterce ostroma', 'Mikszáth Kálmán', '1895', 'Szépirodalom'),
(49, 'A Pendragon legenda', 'Szerb Antal', '1934', 'Kalandregény'),
(50, 'Utas és holdvilág', 'Szerb Antal', '1937', 'Szépirodalom'),
(51, 'A 22-es csapdája', 'Joseph Heller', '1961', 'Szatíra'),
(52, 'A szolgálólány meséje', 'Margaret Atwood', '1985', 'Disztópia'),
(53, 'A marsi', 'Andy Weir', '2011', 'Sci-Fi'),
(54, 'Alapítvány', 'Isaac Asimov', '1951', 'Sci-Fi'),
(55, '2001: Űrodüsszeia', 'Arthur C. Clarke', '1968', 'Sci-Fi'),
(56, 'Neurománc', 'William Gibson', '1984', 'Cyberpunk'),
(57, 'Ender ​​játéka', 'Orson Scott Card', '1985', 'Sci-Fi'),
(58, 'A sötét torony', 'Stephen King', '1982', 'Fantasy'),
(59, 'A ragyogás', 'Stephen King', '1977', 'Horror'),
(60, 'Gyilkosság az Orient expresszen', 'Agatha Christie', '1934', 'Krimi'),
(61, 'Tíz kicsi néger', 'Agatha Christie', '1939', 'Krimi'),
(62, 'A sátán kutyája', 'Arthur Conan Doyle', '1902', 'Krimi'),
(63, 'A Da Vinci-kód', 'Dan Brown', '2003', 'Thriller'),
(64, 'Angyalok és démonok', 'Dan Brown', '2000', 'Thriller'),
(65, 'A szél neve', 'Patrick Rothfuss', '2007', 'Fantasy'),
(66, 'Trónok harca', 'George R. R. Martin', '1996', 'Fantasy');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
