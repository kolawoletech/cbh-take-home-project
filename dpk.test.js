const { getDeterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
const MAX_PARTITION_KEY_LENGTH = 256;
describe("getDeterministicPartitionKey", () => {
  it("should return a deterministic partition key when no partition key is provided", () => {
    const event = { data: "sample data" };
    const expectedKey =
      "33f101d790cd3a2b164e45f7206ff0a12b41d44153391a4ae1aaf4ec3441230a6ba0fa09f6f52310eca201779568a0a9dba4c69dc17200fe944422bb54305e18";

    const result = getDeterministicPartitionKey(event.data);

    expect(result).toBe(expectedKey);
  });

  it("should hash a stringified version of the key when partition key is not a string", () => {
    const event = { partitionKey: { key: "value" } };
    const expectedKey =
      "163696cd46674b4fdd7dce65027cc78ad9347884c556d18b814d9c53dff854c92ad25d0eb2c58c279d04215a57772236a679839092d342c41c2563fad5256ee2";

    const result = getDeterministicPartitionKey(event.partitionKey);

    expect(result).toBe(expectedKey);
  });

  it("should return a trivial partition key when event is undefined", () => {
    const result = getDeterministicPartitionKey(undefined);

    expect(result).toBe("0");
  });

  it("should hash the partition key when its length exceeds the maximum allowed length", () => {
    const longKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const hash = crypto.createHash("sha3-512").update(longKey).digest("hex");
    expect(getDeterministicPartitionKey({ partitionKey: longKey })).toEqual(
      hash
    );
  });

  it("should return the partition key when it is already a string and its length is within the maximum allowed length", () => {
    const partitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH);
    expect(getDeterministicPartitionKey({ partitionKey })).toEqual(
      partitionKey
    );
  });
});
