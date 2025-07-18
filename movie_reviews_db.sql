-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-07-2025 a las 03:48:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `movie_reviews_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Volcado de datos para la tabla `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `movie_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 550, 5, 'Un clásico. El giro final es increíble.', '2025-07-18 01:25:39'),
(2, 2, 550, 4, 'Muy buena, aunque un poco confusa al principio.', '2025-07-18 01:25:39'),
(3, 3, 680, 5, 'De mis favoritas de Tarantino. Los diálogos son geniales.', '2025-07-18 01:25:39'),
(4, 4, 680, 4, 'Gran banda sonora y actuaciones.', '2025-07-18 01:25:39'),
(5, 1, 13, 5, 'Tom Hanks es un genio. Una historia conmovedora.', '2025-07-18 01:25:39'),
(6, 5, 13, 5, 'Siempre lloro con esta película.', '2025-07-18 01:25:39'),
(7, 2, 27205, 5, 'Visualmente espectacular. La idea es muy original.', '2025-07-18 01:25:39'),
(8, 6, 27205, 5, 'Nolan nunca decepciona.', '2025-07-18 01:25:39'),
(9, 7, 155, 5, 'La mejor película de superhéroes de la historia. Heath Ledger inolvidable.', '2025-07-18 01:25:39'),
(10, 8, 155, 5, 'Una obra maestra. Oscura y profunda.', '2025-07-18 01:25:39'),
(11, 3, 496243, 5, 'Parásitos es brillante. Una crítica social perfecta.', '2025-07-18 01:25:39'),
(12, 9, 496243, 5, 'Merecidísimo Oscar. Te deja pensando días.', '2025-07-18 01:25:39'),
(13, 4, 76341, 4, 'Pura adrenalina. Tom Hardy está genial.', '2025-07-18 01:25:39'),
(14, 10, 76341, 5, 'La mejor película de acción de la década.', '2025-07-18 01:25:39'),
(15, 5, 634649, 3, 'Entretenida, pero no la mejor de Spider-Man.', '2025-07-18 01:25:39'),
(16, 1, 634649, 4, 'Mucho fan service, pero me encantó.', '2025-07-18 01:25:39'),
(17, 6, 299534, 4, 'Un final épico para una saga increíble.', '2025-07-18 01:25:39'),
(18, 7, 299534, 5, 'Lloré como nunca. El cierre perfecto.', '2025-07-18 01:25:39'),
(19, 8, 122, 5, 'La trilogía que lo cambió todo.', '2025-07-18 01:25:39'),
(20, 9, 122, 4, 'Una aventura increíble de principio a fin.', '2025-07-18 01:25:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'carlosg', 'carlos.g@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(2, 'anamartinez', 'ana.m@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(3, 'luisfer', 'luis.f@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(4, 'sofia_p', 'sofia.p@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(5, 'jorge_s', 'jorge.s@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(6, 'laurav', 'laura.v@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(7, 'dani_r', 'dani.r@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(8, 'elenac', 'elena.c@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(9, 'pablo_m', 'pablo.m@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38'),
(10, 'marta_g', 'marta.g@example.com', '$2b$10$E.p/h3.e1V3g9aH.XyBqUeW.gR6.d1R8/X.Q8.Y2oU5a1b3iC2', '2025-07-18 01:25:38');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
