import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    // defines the attributes to be updated
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    // defines the value in the update expression
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
