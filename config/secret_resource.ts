const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();

const getDataDeployDB = async () => {
    const secretVersion = "1"
    const dbUserData = `projects/${process.env.GCP_PROJECT_ID}/secrets/${process.env.DB_USER}/versions/${secretVersion}`;
    const dbPassData = `projects/${process.env.GCP_PROJECT_ID}/secrets/${process.env.DB_PASSWORD}/versions/${secretVersion}`;
    const dbSchemaData = `projects/${process.env.GCP_PROJECT_ID}/secrets/${process.env.DB_SCHEMA}/versions/${secretVersion}`;
    try {
        // Akses secret dari Secret Manager
        const [versionUser] = await client.accessSecretVersion({ name:dbUserData });
        const [versionPass] = await client.accessSecretVersion({ name:dbPassData });
        const [versionSchema] = await client.accessSecretVersion({ name:dbSchemaData });
        
        // Data secret tersimpan dalam payload
        const payloadUser = versionUser?.payload.data.toString();
        const payloadPass = versionPass?.payload.data.toString();
        const payloadSchema = versionSchema?.payload.data.toString();

        console.log(`Plaintext User:${payloadUser}`);
        console.log(`Plaintext Pasword:${payloadPass}`);
        console.log(`Plaintext Schema:${payloadSchema}`);

        return {payloadUser, payloadPass, payloadSchema}
    } catch (e:any) {
        console.error(`Error accessing secret: ${e.message}`);
    }
}

module.exports = {
    getDataDeployDB
}