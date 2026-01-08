// MongoDB initialization script for Botsmann
// This script runs when the MongoDB container starts for the first time

// Switch to the botsmann database
db = db.getSiblingDB('botsmann');

// Create collections with proper indexes for better performance
db.createCollection('consultations');
db.consultations.createIndex({ "email": 1 });
db.consultations.createIndex({ "createdAt": -1 });

db.createCollection('users');
db.users.createIndex({ "email": 1 }, { unique: true });

db.createCollection('waitlist');
db.waitlist.createIndex({ "email": 1 }, { unique: true });
db.waitlist.createIndex({ "timestamp": -1 });

print("Botsmann database initialized successfully");
