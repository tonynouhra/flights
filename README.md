# Flight Search Application

This is a React-based flight search application that allows users to search for flights, view results, and see detailed information about each flight.

## Features

- Search for flights based on origin, destination, date, and other criteria.
- View detailed information about each flight.
- Pagination for search results.
- Autocomplete input for airport search.
- Responsive design.

## Technologies Used

- React
- Axios
- Styled-components
- React Router

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/tonynouhra/flight-search-app.git
    cd flight-search-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your RapidAPI credentials:
    ```dotenv
    REACT_APP_RAPID_API_KEY=your_api_key_here
    REACT_APP_RAPID_API_HOST=sky-scrapper.p.rapidapi.com
    ```

### Running the Application

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `src/`: Contains the source code of the application.
    - `components/`: Contains React components.
    - `services/`: Contains API service functions.
    - `styles/`: Contains styled-components for styling.
    - `App.js`: Main application component.
    - `index.js`: Entry point of the application.

## Available Scripts

- `npm start`: Starts the development server.
- `npm test`: Runs the test suite.
- `npm run build`: Builds the application for production.
- `npm run eject`: Ejects the Create React App configuration.

## License

This project is licensed under the MIT License.