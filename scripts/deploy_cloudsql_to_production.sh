# Navigate to the script's directory
cd "$(dirname "$0")"

# Load environment variables from .env
export $(grep -v '^#' ../.env.production | xargs)

# Prepare environment variables for the gcloud command
ENV_VARS=$(grep -v '^#' ../.env.production | grep -v '^GOOGLE_APPLICATION_CREDENTIALS=' | xargs | sed 's/ /,/g')

# Deploy to Cloud Run using Docker Hub Image
gcloud run deploy $GCP_CLOUD_RUN_DEPLOY_ID \
  --image docker.io/$GCP_CLOUD_BUILD_IMAGE_TAG \
  --platform managed \
  --region $GCP_REGION \
  --add-cloudsql-instances $GCP_CLOUD_SQL_INSTANCE_CONNECTION_NAME \
  --service-account $GCP_SERVICE_ACCOUNT_EMAIL \
  --allow-unauthenticated \
  --set-env-vars $ENV_VARS