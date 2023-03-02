# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I refactored the code to be precise and add a check for the partition key's type and stringifies it if it's not a string. This should ensure that the test case for "should hash a stringified version of the key when partition key is not a string" passes.
This test covers the following scenarios:

1. It should return a deterministic partition key when no partition key is provided
2. It should hash a stringified version of the key when partition key is not a string.
3. it should return a trivial partition key when event is undefined
4. It should hash the partition key when its length exceeds the maximum allowed length
5. it should return the partition key when it is already a string and its length is within the maximum allowed length.
