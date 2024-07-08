import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// シークレットマネージャーのクライアントを生成
const client = new AWS.SecretsManager({ apiVersion: "2017-10-17" });

export const getSecret = async (secretName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.getSecretValue({ SecretId: secretName }, function (err, data) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        if ("SecretString" in data) {
          resolve(data.SecretString || "");
        } else {
          reject("SecretString not found");
        }
      }
    });
  });
};

// 使用方法
// getSecret("ts-pj-seacret")
//   .then((secret) => {
//     console.log("secret: ", secret);
//   })
//   .catch((e) => {
//     console.error(e);
//   });
