# Book System Management

This is a Spring Boot web application developed as part of the CS 223 course at Paragon University. It provides a simple CRUD system for managing books, authors, categories, and publishers.

## Features

- **Authentication**: None (open access for demonstration).
- **Entities**
  - `Book` – title, description, author, category, publisher, price, and more.
  - `Author` – name, biography, and a list of books written.
  - `Category` – industry standard or custom categories for books.
  - `Publisher` – company information and associated books.
- **RESTful Controllers**
  - `BookController` – endpoints for creating, reading, updating and deleting books.
  - `AuthorController` – similar endpoints for authors.
  - `CategoryController` – manage book categories.
  - `PublisherController` – manage publishers.
  - `ViewController` – serves HTML templates for the browser-based UI.
- **Persistence Layer**
  - Spring Data JPA repositories (`BookRepository`, `AuthorRepository`, etc.)
  - Uses H2/embedded database in development (configured via `application.properties`).
- **Service Layer**
  - Business logic encapsulated in service classes (`BookService`, `AuthorService`, etc.).
- **Web Interface**
  - Thymeleaf templates under `src/main/resources/templates` for listing and editing entities.
  - Static assets (CSS and JS) provide basic styling and client-side behavior.

## Getting Started

### Prerequisites

- Java 17 or later
- Maven 3.6+

### Running the application

```bash
./mvnw spring-boot:run
```

Open [`http://localhost:8080`](http://localhost:8080) in a web browser to access the UI.

### Building

```bash
./mvnw clean package
```

The compiled JAR will be located in `target/`.

## Features
### Book Management

- Create, update, delete, and view books

- Assign category and publisher

- Assign multiple authors (Many-to-Many relationship)

- Display book details in a web interface

### Author Management

- Manage author information

- View associated books

### Category Management

- Create and manage book categories

- Assign categories to books

### Publisher Management

- Manage publisher records

- Associate publishers with books

## Architecture
```
Controller Layer
    ↓
Service Layer
    ↓
Repository Layer
    ↓
Database
```
## Project Structure

```
src/main/java/kh/edu/paragoniu/booksystemmanagement
├── controller   # REST and view controllers
├── entity       # JPA entities
├── repository   # Spring Data repositories
└── service      # Business services

src/main/resources
├── templates    # Thymeleaf templates (HTML UI)
├── static       # css, js, images
└── application.properties
```

`src/main/resources` contains configuration, templates and static assets.

## Configuration

All application settings live in `src/main/resources/application.properties`. The default configuration uses an in-memory H2 database. You can switch to another database by updating the datasource properties.

## Contributing

This repository is maintained for educational purposes. Contributions are welcome via pull requests, with the assumption that changes adhere to the existing code style and architecture.

## License

This project is developed for educational use under Paragon University coursework.