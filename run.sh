#!/bin/bash
#!/bin/bash

# Start the frontend and backend in the background
cd frontend && npm install && npm run start &
frontend_pid=$!

cd backend && npm install && npm run start &
backend_pid=$!

# Define a function to kill both processes
kill_processes() {
    kill $frontend_pid
    kill $backend_pid
}

# Catch SIGINT and kill both processes
trap kill_processes SIGINT

# Wait for both processes to finish
wait $frontend_pid
wait $backend_pid