const { NotFoundError, ValidationError, ForbiddenError } = require("../middleware/Error");
const UrlSchema = require("../schema/UrlSchema");
const {isValidHttpUrl} = require("../middleware/validateUrl");

const post = async (urldata) => {
    const initialUrl = urldata.origUrl;
    if (isValidHttpUrl(initialUrl) !== true) {
        throw new ForbiddenError("Invalid URL. Enter a valid URL.")
    } else {
        const createUrl = await UrlSchema.create(urldata);
        return createUrl
    }
};

const redirectLink = async (urlId, ipAddress) => {
    const getUrl = await UrlSchema.findOne({"urlId": urlId});
    if (getUrl) {
       await UrlSchema.updateOne(
        {"urlId": urlId },
       { $inc: { clicks: 1 } },
       );  
       getUrl.clicker = ipAddress;
       await getUrl.save();
        return getUrl;
    } else {
        throw new ForbiddenError("Unable to access link")
    }
   
};
module.exports = {
    post,
    redirectLink
}
