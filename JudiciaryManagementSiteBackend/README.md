# Judiciary Management System

The **Judiciary Management System** is a comprehensive web application designed to streamline and digitize the management of judicial processes. It provides an efficient platform for managing case records, scheduling hearings, and facilitating communication between various stakeholders in the judiciary system. The system is built with a modern tech stack to ensure scalability, performance, and ease of use.

## Tech Stack

### Frontend:
- **Vite + React**: A fast and modern frontend framework for building responsive and interactive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development and consistent styling.

### Backend:
- **Spring Boot**: A robust Java-based framework for building RESTful APIs and handling business logic.

### Database:
- **PostgreSQL**: A powerful, open-source relational database for storing and managing judiciary-related data.

## Features

1. **Case Management**:
   - Add, update, and delete case records.
   - Track case statuses and history.

2. **Hearing Scheduling**:
   - Schedule hearings and notify relevant parties.
   - Manage courtroom availability.

3. **User Roles**:
   - Role-based access for judges, lawyers, and administrative staff.
   - Secure authentication and authorization.

4. **Reports and Analytics**:
   - Generate reports on case progress and system usage.
   - Visualize data for better decision-making.

5. **Notifications**:
   - Email and SMS notifications for case updates and hearing schedules.

## Database Architecture

The database is designed to handle judiciary-related data efficiently while maintaining data integrity and security. Below is a high-level overview of the database schema:

1. **Users Table**:
   - Stores user information (e.g., judges, lawyers, staff).
   - Includes role-based access control.

2. **Cases Table**:
   - Stores case details such as case ID, title, description, and status.
   - Links to users involved in the case.

3. **Hearings Table**:
   - Stores hearing schedules, courtroom assignments, and case references.

4. **Notifications Table**:
   - Tracks notifications sent to users for case updates and hearing reminders.

5. **Audit Logs Table**:
   - Maintains a history of changes and actions performed in the system for accountability.

## How to Run

### Frontend:
1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend:
1. Navigate to the backend directory.
2. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Database:
1. Ensure PostgreSQL is running.
2. Configure the database connection in `application.properties`.

## Contribution

Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.