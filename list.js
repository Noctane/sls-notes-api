import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // defines the condition for the query -> return items matching 'userId' partition key
    KeyConditionExpression: 'userId = :userId',
    // defines the value in the condition -> 'userId' to be Identity Pool identity id of the authenticated user
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
