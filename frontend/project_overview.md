
# Project Overview

This document provides an overview of the folder structure and the purpose of each file in the project.

## `frontend/`

### `app/`

*   `globals.css`: This file sets up the global styling for the entire application. It imports Tailwind CSS and defines base styles.
*   `layout.jsx`: This is the main layout of the application. It wraps all other pages and includes the navigation bar, Redux store provider, and a component to check if a user is logged in.
*   `loading.jsx`: This displays a loading spinner, which is shown when pages or data are loading.
*   `page.jsx`: This is the homepage of your application. It assembles the main landing page by displaying a hero section, lists of destinations and packages, client testimonials, and the footer.
*   `StoreProvider.js`: This component makes the Redux store (for state management) and Stripe (for payments) available to the entire application.

#### `(SharedRoute)/`

This directory contains routes that are shared between regular users and admins.

*   **`Destination/`**: Contains pages related to destinations.
    *   `page.jsx`: This file displays a list of all available destinations. It includes functionality for searching, sorting, and loading more destinations. For administrators, it also shows buttons to update or delete a destination.
    *   `SearchBar.jsx`: This component provides a search bar that allows users to search for destinations by name or sort them by different criteria.
    *   **`[result]/`**: This is a dynamic route that displays the details of a specific destination.
        *   `page.jsx`: This is a dynamic page that displays the detailed information for a single destination. It fetches the destination's data based on the ID in the URL and shows its image, description, price, and available slots. It also includes a "Book Now" button.
*   **`OurTeam/`**: Contains the page that displays the team members.
    *   `page.jsx`: This file displays the "Our Team" page, which introduces the members of your team. It fetches team member data and displays their photos, names, titles, descriptions, and social media links. For administrators, it also provides buttons to delete or update team member information.
*   **`Packages/`**: Contains pages related to travel packages.
    *   `page.jsx`: This file displays a list of all available travel packages. It includes features for searching, sorting, and loading more packages. For administrators, it also provides buttons to update or delete a package.
    *   `SearchBar.jsx`: This component provides a search bar that allows users to search for packages by name or sort them by different criteria.
    *   **`[id]/`**: This is a dynamic route that displays the details of a specific package.
        *   `page.jsx`: This is a dynamic page that displays the detailed information for a single package. It fetches the package's data based on the ID in the URL and shows its image gallery, description, price, and available slots. It also includes a "Book Now" button.
*   **`PayementSuccessful/`**: Contains the page that is displayed after a successful payment.
    *   `page.jsx`: This page is displayed after a user successfully completes a payment through Stripe. It shows a "Payment Successful" message to confirm that their booking has been processed.
*   **`Reset_password/`**: Contains the pages for resetting a user's password.
    *   **`[token]/`**: This is a dynamic route that handles the password reset functionality.
        *   `page.jsx`: This is a dynamic page that handles the password reset functionality. It uses a token from the URL to verify the user's identity and provides a form for them to enter and confirm a new password.
*   **`SignUpForm/`**: Contains the sign-up page for new users.
    *   `page.jsx`: This file provides a sign-up form for new users to create an account. It includes fields for name, email, and password, along with validation to ensure the data is entered correctly.

#### `AdminDashboard/`

This directory contains all the pages and components related to the admin dashboard.

*   `CheckAdminLoginChecker.jsx`: This component acts as a security guard for the admin dashboard. It checks if a user is logged in and if they have the "Admin" role. If not, it redirects them to the homepage.
*   `layout.jsx`: This is the layout for the admin dashboard. It wraps all the admin pages and uses the `CheckAdminLoginChecker` to ensure that only authorized admins can access them.
*   `page.jsx`: This is the main page of the admin dashboard. It displays a menu of links to different admin sections, such as posting new destinations, managing bookings, and adding team members.
*   **`GetDestinationBooking/`**: Contains pages for viewing destination bookings.
    *   `page.jsx`: This page displays a list of all destination bookings. It allows admins to view booking details, see which bookings have been paid, and mark cash bookings as paid. It also includes a "See More" button to load additional bookings.
    *   `SearchBar.jsx`: This component provides a search bar that allows admins to search for destination bookings by any text or by a specific date.
    *   **`[id]/`**: This is a dynamic route that displays the details of a specific destination booking.
        *   `page.jsx`: This is a dynamic page that displays the detailed information for a single destination booking. It fetches the booking data based on the ID in the URL and shows the user's contact information, booking details (such as the destination, date, and price), and payment status.
*   **`GetPackageBookNow/`**: Contains pages for viewing package bookings.
    *   `page.jsx`: This page displays a list of all package bookings. It allows admins to view booking details, see which bookings have been paid, and mark cash bookings as paid. It also includes a "See More" button to load additional bookings.
    *   `SearchBar.jsx`: This component provides a search bar that allows admins to search for package bookings by any text or by a specific date.
    *   **`[id]/`**: This is a dynamic route that displays the details of a specific package booking.
        *   `page.jsx`: This is a dynamic page that displays the detailed information for a single package booking. It fetches the booking data based on the ID in the URL and shows the user's contact information, booking details (such as the package, date, and price), and payment status.
*   **`PostDestination/`**: Contains the page for adding new destinations.
    *   `page.jsx`: This page provides a form for administrators to add new destinations. The form includes fields for the destination's title, image, description, and travel times. It also has a dynamic section for adding different booking options, such as pricing per person or by private car, with details like price, slots, and car capacity.
*   **`PostOurTeam/`**: Contains the page for adding new team members.
    *   `page.jsx`: This page provides a form for administrators to add new team members. The form includes fields for the team member's name, title, description, and image, as well as optional fields for their Facebook, LinkedIn, and email contacts.
*   **`PostPackages/`**: Contains the page for adding new travel packages.
    *   `page.jsx`: This page provides a form for administrators to add new travel packages. The form includes fields for the package's title, multiple images, description, and travel times. It also has a dynamic section for adding different booking options, such as pricing per person or by private car, with details like price, slots, and car capacity.
