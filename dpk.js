const crypto = require("crypto");

exports.getDeterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let partitionKey = event?.partitionKey;

  if (partitionKey !== undefined && typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey === undefined) {
    partitionKey = crypto
      .createHash("sha3-512")
      .update(event?.data ?? "")
      .digest("hex");
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto
      .createHash("sha3-512")
      .update(partitionKey)
      .digest("hex");
  }

  return partitionKey || TRIVIAL_PARTITION_KEY;
};
