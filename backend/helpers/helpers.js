const path = require('path')
const serviceKey = path.join(__dirname, './keys.json')
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: serviceKey.project_id
});

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */
const uploadImage = async (file) => {
    const { originalname, path } = file

    await storage.bucket('grdn-app').upload(path, {
        destination: originalname,
    }).catch(err => {
        console.err(err);
    });

    return `https://storage.googleapis.com/grdn-app/${originalname}`;
}


module.exports = uploadImage;