const bubbleSort = arr => {
    for (let i = 0; i < arr.length - 1; i++) {
        let change = false;
        for (let j = 0; j < arr.length - (i + 1); j++) {
            if (arr[j] > arr[j + 1]) {
                change = true;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        if (!change) break;
    }
    return arr;
};

const quickSort = arr => {
    if (arr.length < 2) return arr;

    const pivot = arr[Math.floor(Math.random() * arr.length)];

    let left = [];
    let equal = [];
    let right = [];

    for (let element of arr) {
        if (element > pivot) right.push(element);
        else if (element < pivot) left.push(element);
        else equal.push(element);
    }

    return quickSort(left)
        .concat(equal)
        .concat(quickSort(right));
};

const radixSort = arr => {
    const maxNum = Math.max(...arr) * 10;
    let divisor = 10;

    while (divisor < maxNum) {
        let buckets = [...Array(10)].map(() => []);

        for (let num of arr) {
            buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
        }

        arr = [].concat.apply([], buckets);
        divisor *= 10;
    }
    return arr;
};

const binarySearch = (array, target) => {
    let firstIndex = 0;
    let lastIndex = array.length - 1;
    while (firstIndex <= lastIndex) {
        let middleIndex = Math.floor((firstIndex + lastIndex) / 2);

        if (array[middleIndex] === target) {
            return middleIndex;
        }

        if (array[middleIndex] > target) {
            lastIndex = middleIndex - 1;
        } else {
            firstIndex = middleIndex + 1;
        }
    }
    return -1;
};

function recursiveBinarySearch(n, arr) {
    let mid = Math.floor(arr.length / 2);
    if (arr.length === 1 && arr[0] != n) {
        return false;
    }
    if (n === arr[mid]) {
        return true;
    } else if (n < arr[mid]) {
        return recursiveBinarySearch(n, arr.slice(0, mid));
    } else if (n > arr[mid]) {
        return recursiveBinarySearch(n, arr.slice(mid));
    }
}

// Function to merge two sorted parts of array
function merge(arr, left, middle, right) {
    
    // Length of both sorted aub arrays
    let l1 = middle - left + 1;
    let l2 = right - middle;
    // Create new subarrays
    let arr1 = new Array(l1);
    let arr2 = new Array(l2);
    
    // Assign values in subarrays
    for (let i = 0; i < l1; ++i) {
        arr1[i] = arr[left + i];
    }
    for (let i = 0; i < l2; ++i) {
        arr2[i] = arr[middle + 1 + i];
    }

    // To travesrse and modify main array
    let i = 0,
        j = 0,
        k = left;
        
    // Assign the smaller value for sorted output
    while (i < l1 && j < l2) {
        if (arr1[i] < arr2[j]) {
            arr[k] = arr1[i];
            ++i;
        } else {
            arr[k] = arr2[j];
            j++;
        }
        k++;
    }
    // Update the remaining elements
    while (i < l1) {
        arr[k] = arr1[i];
        i++;
        k++;
    }
    while (j < l2) {
        arr[k] = arr2[j];
        j++;
        k++;
    }
}

// Function to implement merger sort in javaScript
function mergeSort(arr, left, right) {
    if (left >= right) {
        return;
    }
    
    // Middle index to create subarray halves
    let middle = left + parseInt((right - left) / 2);
    
    // Apply mergeSort to both the halves
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);
    
    // Merge both sorted parts
    merge(arr, left, middle, right);
}

// Input array
const arr =  [ 38, 27, 43, 10]

// Display input array
console.log("Original array: " + arr);

// Apply merge sort function
mergeSort(arr, 0, arr.length - 1);

// Display output
console.log("After sorting: " + arr);