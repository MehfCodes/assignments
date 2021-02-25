module.exports.multipleMongooseToObj = (arrayOfMongooseDocuments) => {
  const tempArray = [];
  if (arrayOfMongooseDocuments.length !== 0) {
    arrayOfMongooseDocuments.forEach((doc) => tempArray.push(doc.toObject()));
  }
  return tempArray;
};
