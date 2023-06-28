import { Client, Databases, Account } from 'appwrite';
 
 
export const DATABASE_ID = '649a974c04d83d0810b0'
export const PROJECT_ID = '6499e0d8caa8a5f70a77'
export const COLLECTION_ID_MESSAGE = '649a97fa3220b76986ab'
// export const DATABASE_ID = process.env.DATABASE_ID
// export const PROJECT_ID = process.env.PROJECT_ID
// export const COLLECTION_ID_MESSAGE = process.env.COLLECTION_ID_MESSAGE

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('6499e0d8caa8a5f70a77');
export const databases = new Databases(client);
export const account = new Account(client);
export default client;