# Landora

Landora is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It serves as an interactive country information platform, fetching comprehensive country data from the [CountriesAPI](https://restcountries.com/).

## Features

- Browse and search for countries from around the world
- View detailed information for each country (e.g., population, region, capital, languages, currencies, and more)
- Responsive and modern UI built with React
- Fast backend powered by Express and Node.js
- Data is dynamically fetched from CountriesAPI

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** [CountriesAPI](https://restcountries.com/)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tilandunu/Landora.git
   cd Landora
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   # Configure your environment variables (e.g., MongoDB URI) in a `.env` file
   npm start
   ```

3. **Frontend setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Visit the app**

   Open your browser and go to `http://localhost:3000` (or the port specified in your frontend).

## Usage

- Use the search bar to find countries by name.
- Click on a country card to view detailed information.
- Explore data like population, capital, region, languages, and more.

## Project Structure

```
Landora/
├── backend/    # Express.js backend server
├── frontend/   # React app frontend
```

## Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

Created by [tilandunu](https://github.com/tilandunu)  
For questions, please open an issue in the repository.
