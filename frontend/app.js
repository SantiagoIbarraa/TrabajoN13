// Credenciales de TMDB
const TMDB_API_KEY = '800ba2f494fc09344361163e4b0d405d';
const TMDB_BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDBiYTJmNDk0ZmMwOTM0NDM2MTE2M2U0YjBkNDA1ZCIsIm5iZiI6MTc1Mjc5ODIzNi43NzcsInN1YiI6IjY4Nzk5NDFjZmI1YjljMWIzY2Y3NWEzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pdTWIR3W1N0u7KKpmVuU1eRu1GCh62RK1zxA7ZJcUCc';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const BACKEND_URL = 'http://localhost:3001'; // Cambia si tu backend está en otro puerto

// Utilidades para autenticación
function saveToken(token) {
  localStorage.setItem('jwt', token);
}
function saveUsername(username) {
  localStorage.setItem('username', username);
}
function getToken() {
  return localStorage.getItem('jwt');
}
function getUsername() {
  return localStorage.getItem('username');
}
function removeToken() {
  localStorage.removeItem('jwt');
}
function removeUsername() {
  localStorage.removeItem('username');
}

// Mostrar películas populares y filtros
async function fetchGenres() {
  const res = await fetch(`${TMDB_BASE_URL}/genre/movie/list`, {
    headers: { Authorization: `Bearer ${TMDB_BEARER}` }
  });
  const data = await res.json();
  return data.genres;
}

async function fetchPopularMovies() {
  const res = await fetch(`${TMDB_BASE_URL}/movie/popular`, {
    headers: { Authorization: `Bearer ${TMDB_BEARER}` }
  });
  const data = await res.json();
  return data.results;
}

function renderMovies(movies, genresMap) {
  const grid = document.getElementById('moviesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  movies.forEach(movie => {
    const genreNames = movie.genre_ids.map(id => genresMap[id]).join(', ');
    const card = document.createElement('div');
    card.className = 'bg-white rounded shadow p-3 flex flex-col';
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="rounded mb-2 h-64 object-cover">
      <h3 class="font-bold text-lg">${movie.title}</h3>
      <p class="text-sm text-gray-600 mb-1">${genreNames}</p>
      <p class="text-sm mb-1">${movie.overview.slice(0, 100)}...</p>
      <p class="text-yellow-500 font-bold">⭐ ${movie.vote_average.toFixed(1)}</p>
      <button class="mt-2 bg-blue-600 text-white px-2 py-1 rounded review-btn" data-movie='${JSON.stringify({id: movie.id, title: movie.title})}'>Reseñar</button>
      <button class="mt-1 bg-gray-200 text-blue-800 px-2 py-1 rounded show-reviews-btn" data-movieid="${movie.id}">Ver Reseñas</button>
    `;
    grid.appendChild(card);
  });
}

// Filtros por género y rating
function renderFilters(genres) {
  const filters = document.getElementById('filters');
  if (!filters) return;
  filters.innerHTML = '';
  // Géneros
  const genreSelect = document.createElement('select');
  genreSelect.className = 'border rounded p-1';
  genreSelect.innerHTML = `<option value="">Todos los géneros</option>` + genres.map(g => `<option value="${g.id}">${g.name}</option>`).join('');
  filters.appendChild(genreSelect);
  // Rating
  const ratingSelect = document.createElement('select');
  ratingSelect.className = 'border rounded p-1';
  ratingSelect.innerHTML = `<option value="">Todas las puntuaciones</option>` + [5,4,3,2,1].map(r => `<option value="${r}">${r} estrellas+</option>`).join('');
  filters.appendChild(ratingSelect);
  return { genreSelect, ratingSelect };
}

// Modal de reseña
function setupReviewModal() {
  const modal = document.getElementById('reviewModal');
  const closeBtn = document.getElementById('closeModal');
  closeBtn.onclick = () => modal.classList.add('hidden');
  window.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };
}

function openReviewModal(movieId) {
  const modal = document.getElementById('reviewModal');
  document.getElementById('modalMovieId').value = movieId;
  modal.classList.remove('hidden');
}

// Enviar reseña al backend
async function submitReview(e) {
  e.preventDefault();
  const movie_id = document.getElementById('modalMovieId').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;
  const token = getToken();
  if (!token) return alert('Debes iniciar sesión para reseñar.');
  const res = await fetch(`${BACKEND_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ movie_id, rating, comment })
  });
  if (res.ok) {
    alert('¡Reseña publicada!');
    document.getElementById('reviewModal').classList.add('hidden');
  } else {
    alert('Error al publicar reseña');
  }
}

// Mostrar reseñas de una película
async function showReviews(movieId) {
  const res = await fetch(`${BACKEND_URL}/reviews/${movieId}`);
  const reviews = await res.json();
  let html = '<h4 class="font-bold mb-2">Reseñas:</h4>';
  if (reviews.length === 0) html += '<p>No hay reseñas aún.</p>';
  else html += reviews.map(r => `<div class="mb-2 p-2 border rounded"><span class="font-bold">${r.username}:</span> <span class="text-yellow-500">${'★'.repeat(r.rating)}</span><br>${r.comment}</div>`).join('');
  // Mostrar en un modal simple
  alert(html.replace(/<[^>]+>/g, '')); // Puedes mejorar esto con un modal real
}

// Login y registro
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch(`${BACKEND_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok && data.token) {
    saveToken(data.token);
    // Decode JWT to get username
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    saveUsername(payload.username);
    window.location.href = 'index.html';
  } else {
    alert(data.error || 'Error al iniciar sesión');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch(`${BACKEND_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  const data = await res.json();
  if (res.ok) {
    alert('Usuario registrado, ahora puedes iniciar sesión');
    window.location.href = 'login.html';
  } else {
    alert(data.error || 'Error al registrarse');
  }
}

// Inicialización según página
window.addEventListener('DOMContentLoaded', async () => {
  // index.html
  if (document.getElementById('moviesGrid')) {
    const genres = await fetchGenres();
    const genresMap = Object.fromEntries(genres.map(g => [g.id, g.name]));
    let movies = await fetchPopularMovies();
    renderMovies(movies, genresMap);
    const { genreSelect, ratingSelect } = renderFilters(genres);
    // Filtros
    genreSelect.onchange = () => {
      let filtered = movies;
      if (genreSelect.value) filtered = filtered.filter(m => m.genre_ids.includes(Number(genreSelect.value)));
      if (ratingSelect.value) filtered = filtered.filter(m => m.vote_average >= ratingSelect.value);
      renderMovies(filtered, genresMap);
    };
    ratingSelect.onchange = genreSelect.onchange;
    // Botones de reseña y ver reseñas
    document.addEventListener('click', e => {
      if (e.target.classList.contains('review-btn')) {
        const movie = JSON.parse(e.target.getAttribute('data-movie'));
        openReviewModal(movie.id);
      }
      if (e.target.classList.contains('show-reviews-btn')) {
        const movieId = e.target.getAttribute('data-movieid');
        showReviews(movieId);
      }
    });
    setupReviewModal();
    document.getElementById('reviewForm').onsubmit = submitReview;
  }
  // login.html
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').onsubmit = handleLogin;
  }
  // register.html
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').onsubmit = handleRegister;
  }
  // Header user info logic
  const header = document.querySelector('header');
  if (header) {
    const nav = header.querySelector('nav');
    if (getToken() && getUsername()) {
      nav.innerHTML = `<span class="mr-4">👤 ${getUsername()}</span><button id="logoutBtn" class="bg-red-600 text-white px-3 py-1 rounded">Logout</button>`;
      document.getElementById('logoutBtn').onclick = () => {
        removeToken();
        removeUsername();
        window.location.href = 'index.html';
      };
    } else {
      nav.innerHTML = `<a href="login.html" class="mr-4 hover:underline">Iniciar sesión</a><a href="register.html" class="hover:underline">Registrarse</a>`;
    }
  }
}); 