#!/bin/bash

# Function to clean up background cloud sql proxy processes
cleanup() {
  echo "Stopping cloud_sql_proxy..."
  kill $CLOUD_SQL_PROXY_PID
  wait $CLOUD_SQL_PROXY_PID
}

# # Set the trap to catch SIGINT, SIGTERM and other termination signals
trap cleanup EXIT

# Navigate to the script's directory
cd "$(dirname "$0")"

# Load environment variables from .env
export $(grep -v '^#' ../.env.production | xargs)

# ./cloud-sql-proxy $GCP_CLOUD_SQL_INSTANCE_CONNECTION_NAME --port=3307

# Run the cloud_sql_proxy
./cloud-sql-proxy $GCP_CLOUD_SQL_INSTANCE_CONNECTION_NAME --port=$DB_PORT

# Function to check if cloud_sql_proxy is ready
check_proxy_ready() {
  while ! nc -z localhost $DB_PORT; do
    echo "Waiting for cloud_sql_proxy to be ready..."
    sleep 1
  done
  echo "cloud_sql_proxy is ready"
}

# Wait for the Cloud SQL Proxy to be ready 
check_proxy_ready

# Run the Node.js script
bun --env_file=.env.production run app.ts

# Wait for the Node.js application to finish, then the trap will clean up the proxy
wait $!