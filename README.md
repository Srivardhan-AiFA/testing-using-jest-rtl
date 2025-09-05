# Deep Dive Into Component Testing Learnings

This repository contains tests for several React components using **React Testing Library**, **Jest**, and **user-event**. Below is a summary of key learnings from writing and running these tests.

---

## What I Learned

### 1. Basic Rendering and Querying Elements

- Use `render()` to mount components in a virtual DOM for testing.
- Query elements by roles (`getByRole`, `queryByRole`) and text (`getByText`).
- Use assertions like `toBeInTheDocument()` to verify element presence.
- Understand the difference between `getBy*` (throws error if not found) and `queryBy*` (returns null if not found).

### 2. Testing Conditional Rendering

- Verify UI elements appear or disappear based on props or component state.
  - Example: The "See More/Less" button in `ExpandableText` shows only if the text length exceeds a limit.
  - Show "Edit" button in `UserAccount` only if the user is an admin.
  - Render login button in `Greet` if no name is provided.
  - Display images or empty state in `ProductImageGallery` depending on input.

### 3. Simulating User Interactions

- Use `userEvent.setup()` to simulate realistic user actions such as clicks.
- Verify UI updates after interactions, like expanding text or enabling buttons.

### 4. Testing Component Behavior with Props and State

- Pass different props to test dynamic UI behavior and component responses.
- For instance:
  - Text length determines button visibility in `ExpandableText`.
  - User role controls UI elements in `UserAccount`.
  - Empty arrays test empty states in image galleries and user lists.

### 5. Assertions on Element Attributes and Content

- Check element attributes (`toHaveAttribute`) like `src` or `href`.
- Verify text content with regex (`toHaveTextContent(/text/i)`) for flexible matching.

### 6. Accessibility Considerations

- Use semantic roles (`button`, `checkbox`, `heading`, `link`, `article`, `img`) to query elements.
- Write tests that encourage building accessible, role-compliant components.

---

## Summary

These tests helped me understand how to:

- Render components and query their elements effectively.
- Test conditional rendering and user interaction effects.
- Simulate user actions realistically.
- Assert presence, absence, content, and attributes of UI elements.
- Promote accessibility through role-based queries.

This hands-on testing experience improves the reliability and maintainability of React components.

---

Feel free to explore the tests to see these concepts in action!
