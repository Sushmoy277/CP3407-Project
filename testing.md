## Overview

Testing is used to ensure that the FeedMe system works correctly and meets user requirements.  
It helps identify bugs, improve system reliability, and ensure the application performs as expected.


## Testing Strategy

The system follows a structured testing approach including:

- Unit Testing
- Integration Testing
- System Testing


## Unit Testing

Unit testing focuses on testing individual components.

Examples:
- Testing login function
- Testing cart calculation
- Testing API responses


## Integration Testing

Integration testing checks how different parts of the system work together.

Examples:
- Frontend communicating with backend
- Backend retrieving data from database
- Order placement flow



## System Testing

System testing tests the complete system in real-world scenarios.

Examples:
- User placing an order from start to finish
- Restaurant receiving and updating order
- Rider delivering the order



## Justification

Using multiple testing levels ensures:
- Early bug detection
- Proper system integration
- Real-world system validation



## Overview

Test cases are used to verify that system features work correctly.


## Test Case 1 – User Registration

- Input: Valid user details
- Expected Output: Account created successfully



## Test Case 2 – User Login

- Input: Correct email and password
- Expected Output: User logged in successfully



## Test Case 3 – Add to Cart

- Input: Select food item and add to cart
- Expected Output: Item appears in cart with correct price



## Test Case 4 – Place Order

- Input: Confirm cart and checkout
- Expected Output: Order is successfully created



## Test Case 5 – Order Tracking

- Input: View order status
- Expected Output: Correct delivery status is displayed



## Test Case 6 – Restaurant Order Update

- Input: Restaurant updates order status
- Expected Output: Status changes correctly for customer



## Test Case 7 – Delivery Completion

- Input: Rider marks order as delivered
- Expected Output: Order marked as completed



## Justification

Test cases ensure:
- Features work correctly
- System behaves as expected
- Errors are identified early
