body {
  font-family: 'Sarabun', sans-serif;
  padding: 20px;
  background-color: #f0f8ff;
}

h1, h2 {
  text-align: center;
  color: #003366;
}

#table-container, #menu-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.table-button, .menu-button, .back-button {
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: #3399ff;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-button:hover, .menu-button:hover, .back-button:hover {
  background-color: #007acc;
}
