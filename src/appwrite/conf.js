
import config from "../configVariables/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service{
  client = new Client()
  databases;
  bucket;
  constructor (){
    this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost ({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
    } catch (error) {
      console.log("Appwrite service > createPost", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      )
    } catch (error) {
      console.log("Appwrite service > updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      )
      return true;

    } catch (error) {
      console.log("Appwrite service > deletePost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log("Appwrite service > getPost", error);
      return false;
    }
  }

  // to get all the post's we use listDocuments
  // quiries is for that if post's status is if active then return otherwise no

  async getPosts(queries = [Query.equal('status', 'active')]) { //queries is just the variable name and key:- status, value:- active
    try {
      return await this.databases.listDocuments(
        config.appwriteDataBaseId,
        config.appwriteCollectionId,
        queries
        // [
        //     Query.equal('status', 'active') // queries can be written like this as well
        // ]
      )
    } catch (error) {
      console.log("Appwrite service > getPosts", error);
      return false
    }
  }

  // file upload services 
  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite service > uploadFile", error);
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite service > deleteFile", error);
      return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service()
export default service;
