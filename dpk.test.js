const { getDeterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("getDeterministicPartitionKey", () => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  it("should hash the event data and return the hash as the key when no partition key is provided", () => {
    const event = { data: "sample data" };
    const expectedKey =
      "163696cd46674b4fdd7dce65027cc78ad9347884c556d18b814d9c53dff854c92ad25d0eb2c58c279d04215a57772236a679839092d342c41c2563fad5256ee2";

    expect(getDeterministicPartitionKey(event)).toBe(expectedKey);
  });

  it("should hash a stringified version of the key when partition key is not a string", () => {
    const event = { partitionKey: { key: "value" } };
    const expectedKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event.partitionKey))
      .digest("hex");

    expect(getDeterministicPartitionKey(event)).toBe(expectedKey);
  });

  it("should return the partition key when it is provided", () => {
    const event = { partitionKey: "test-key" };

    expect(getDeterministicPartitionKey(event)).toBe("test-key");
  });

  it("should hash a stringified version of the key when partition key exceeds the maximum length", () => {
    const event = {
      partitionKey: "a".repeat(MAX_PARTITION_KEY_LENGTH + 1),
    };
    const expectedKey = crypto
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");

    expect(getDeterministicPartitionKey(event)).toBe(expectedKey);
  });

  it("should hash a stringified version of the key when partition key is not a string", () => {
    const event = { partitionKey: { key: "value" } };
    const expectedKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event.partitionKey))
      .digest("hex");

    expect(getDeterministicPartitionKey(event)).toBe(expectedKey);
  });

  it("should return the default partition key when no event is provided", () => {
    expect(getDeterministicPartitionKey(null)).toBe("0");
  });
});
