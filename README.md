# OrganisationHub

OrganisationHub is a workplace task management app that allow user to post and join multiple organisations

## Prerequisites

Before you begin, ensure you have the following installed:
*   Ruby
*   npm

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/OrganisationHub.git
    cd OrganisationHub
    ```

2.  **Install Ruby dependencies:**
    ```bash
    bundle install
    ```

3.  **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

4.  **Set up the database:**
    ```bash
    rails db:create
    rails db:migrate
    rails db:seed # Load initial data for testing
    ```

## Usage

To run the application locally:

1.  **Start the Rails server and Vite development server:**

    Using a tool like `foreman` allow you to run configuration in Profile.dev which run both vite server and rails server
    ```bash
    foreman start -f Procfile.dev
    ```

2.  Open your browser and navigate to the port specified in your configuration

