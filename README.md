# Bus Tracking System

A complete full-stack web application for real-time bus tracking, route management, and passenger booking.

## Features

### 🚌 Core Features
- **Real-time Bus Tracking** - Live GPS tracking of buses on interactive maps
- **Route Management** - Create, edit, and manage bus routes and stops
- **Booking System** - Reserve seats and manage bookings
- **User Management** - Passengers, drivers, and admin roles
- **Live Notifications** - Real-time updates on bus arrivals and delays
- **Admin Dashboard** - Complete system management and analytics

### 👥 User Roles
1. **Passengers** - Search buses, track in real-time, make bookings
2. **Drivers** - Manage routes, update location, track trips
3. **Admins** - Manage buses, routes, drivers, and view analytics

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io
- **Authentication**: JWT
- **Validation**: Joi

### Frontend
- **Framework**: React with TypeScript
- **State Management**: Redux
- **UI Library**: Material-UI
- **Maps**: Leaflet.js
- **HTTP Client**: Axios

### DevOps
- **Containerization**: Docker
- **Package Manager**: npm/yarn

## Project Structure

```
bus-tracking-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.tsx
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```
MONGODB_URI=mongodb://localhost:27017/bus-tracking
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Docker Setup

Build and run using Docker Compose:

```bash
docker-compose up --build
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Buses
- `GET /api/buses` - Get all buses
- `GET /api/buses/:id` - Get specific bus
- `POST /api/buses` - Create bus (Admin)
- `PUT /api/buses/:id` - Update bus (Admin)
- `DELETE /api/buses/:id` - Delete bus (Admin)

### Routes
- `GET /api/routes` - Get all routes
- `GET /api/routes/:id` - Get specific route
- `POST /api/routes` - Create route (Admin)
- `PUT /api/routes/:id` - Update route (Admin)
- `DELETE /api/routes/:id` - Delete route (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Real-time Tracking
- `GET /api/buses/:id/location` - Get bus current location
- `WebSocket: bus:update` - Listen to real-time bus updates

## Features in Detail

### Real-time Tracking
- Buses emit their location every 10 seconds
- Passengers receive live updates via WebSocket
- Map updates with new bus positions

### Booking System
- Select date and time
- Choose available seats
- Make payment
- Receive confirmation and ticket

### Admin Dashboard
- Bus management (add, edit, delete)
- Route planning and management
- Driver assignment
- Analytics and reports
- System monitoring

### Driver Interface
- View assigned routes
- Update current location
- Manage boarding
- Track trip completion

### Passenger Features
- Search buses by route and date
- View available seats in real-time
- Book seats with confirmation
- Track bus in real-time
- Receive notifications
- View booking history

## WebSocket Events

### Client to Server
- `driver:location` - Driver sends GPS location
- `bus:status` - Update bus status (on-time, delayed)

### Server to Client
- `bus:location:update` - Bus location update
- `bus:arrival` - Bus arriving at stop
- `booking:confirmed` - Booking confirmation
- `notification:alert` - Alerts and notifications

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Security Features

- JWT authentication for all protected routes
- Password hashing with bcryptjs
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Role-based access control (RBAC)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details

## Support

For support, email support@bustracking.com or open an issue in the repository

## Deployment

### Heroku Deployment
1. Install Heroku CLI
2. Create Heroku app: `heroku create your-app-name`
3. Push code: `git push heroku main`
4. Set environment variables: `heroku config:set MONGODB_URI=...`

### AWS Deployment
- Use EC2 for backend
- Use S3 for frontend
- Use MongoDB Atlas for database
- Use CloudFront for CDN

## Performance Considerations

- Database indexing on frequently queried fields
- Redis caching for route data
- Lazy loading for map components
- WebSocket connection pooling
- API request throttling

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Machine learning for ETA prediction
- [ ] Multi-language support
- [ ] Offline mode support
- [ ] Voice notifications
- [ ] Social sharing features
