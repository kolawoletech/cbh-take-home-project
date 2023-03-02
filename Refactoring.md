# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I refactored the
I refactored the code to be precise and parition
This test covers the following scenarios:
**_ I renamed the function for the seek of what it does _**

1. When a partition key is provided in the event object, it should return that key
2. When a partition key is not provided in the event object, it should hash the event data and return the hash as the key
3. When the partition key is not a string, it should hash a stringified version of the key
4. When the partition key exceeds the maximum length, it should hash the key
5. When no event is provided, it should return the default partition key 0.
