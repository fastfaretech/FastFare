import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION
});

const docClient = DynamoDBDocumentClient.from(ddbClient);

const TABLE_NAME = "kyc-table";

/* ---------------- USER ---------------- */

export const submitKyc = async (
  userId: string,
  data: any
) => {
  const item = {
    userId,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item
    })
  );

  return item;
};

export const getKycStatus = async (userId: string) => {
  const res = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { userId }
    })
  );

  return res.Item;
};

/* ---------------- ADMIN ---------------- */

export const approveKyc = async (userId: string) => {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression:
        "set #s=:s, updatedAt=:u",
      ExpressionAttributeNames: {
        "#s": "status"
      },
      ExpressionAttributeValues: {
        ":s": "approved",
        ":u": new Date().toISOString()
      }
    })
  );

  return { status: "approved" };
};

export const rejectKyc = async (
  userId: string,
  reason: string
) => {
  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { userId },
      UpdateExpression:
        "set #s=:s, rejectionReason=:r, updatedAt=:u",
      ExpressionAttributeNames: {
        "#s": "status"
      },
      ExpressionAttributeValues: {
        ":s": "rejected",
        ":r": reason,
        ":u": new Date().toISOString()
      }
    })
  );

  return {
    status: "rejected",
    reason
  };
};
