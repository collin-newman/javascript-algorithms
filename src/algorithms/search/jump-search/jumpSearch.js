import Comparator from '../../../utils/comparator/Comparator';

/**
 * Jump (block) search implementation.
 *
 * @param {*[]} sortedArray
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number}
 */
export default function jumpSearch(sortedArray, seekElement, comparatorCallback) {
  const comparator = new Comparator(comparatorCallback);
  const arraySize = sortedArray.length;

  if (!arraySize) {
    // We can't find anything in empty array.
    return -1;
  }
  // target is less than the smallest value in array
  if (comparator.greaterThan(sortedArray[0], seekElement)) return -1;
  // target is greater than largest value in array
  if (comparator.lessThan(sortedArray[arraySize - 1], seekElement)) return -1;

  let targetIndex = -1;
  let lowerBound = 0;
  let upperBound = sortedArray[arraySize - 1];
  const block = Math.floor(Math.sqrt(arraySize));

  for (let i = block; i < arraySize; i += block) {
    if (comparator.lessThan(sortedArray[i], seekElement)) {
      lowerBound = i;
    } else {
      upperBound = i;
      break;
    }
  }

  for (let i = lowerBound; i < upperBound + 1; i += 1) {
    if (comparator.equal(sortedArray[i], seekElement)) {
      targetIndex = i;
      break;
    }
  }

  return targetIndex;
}
